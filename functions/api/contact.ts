import type { PagesFunction } from '@cloudflare/workers-types';
import { z } from 'zod';
import { execute, queryFirst } from '../../utils/db';

// Validation schema matching shared/schema.ts
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: number;
}

/**
 * Send email notification via Resend
 */
async function sendEmailNotification(
  contactData: { name: string; email: string; message: string },
  apiKey: string,
  toEmail: string,
  fromEmail: string
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(contactData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contactData.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(contactData.message).replace(/\n/g, '<br>')}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
      reply_to: contactData.email,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  // Fallback for server-side
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Save to D1 database
    const result = await execute(
      env.DB,
      'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)',
      [validatedData.name, validatedData.email, validatedData.message, Date.now()]
    );

    if (!result.success) {
      throw new Error('Failed to save contact to database');
    }

    // Get the inserted record ID
    const inserted = await queryFirst<{ id: number }>(
      env.DB,
      'SELECT last_insert_rowid() as id'
    );

    // Send email notification (non-blocking, don't fail if email fails)
    if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
      sendEmailNotification(
        validatedData,
        env.RESEND_API_KEY,
        env.NOTIFICATION_EMAIL,
        'contact@maiwald.work'
      ).catch(error => {
        console.error('Email notification failed:', error);
      });
    }

    // Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        id: inserted?.id,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
