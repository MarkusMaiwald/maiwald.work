import type { D1Database } from '@cloudflare/workers-types';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  NOTIFICATION_EMAIL: string;
}

// Typed D1 Helper
async function queryFirst<T>(db: D1Database, sql: string, params?: unknown[]): Promise<T | null> {
  const stmt = db.prepare(sql);
  const result = params ? stmt.bind(...params) : stmt;
  return (await result.first()) as T | null;
}

async function execute(db: D1Database, sql: string, params?: unknown[]): Promise<{ success: boolean }> {
  const stmt = db.prepare(sql);
  const result = params ? await stmt.bind(...params).run() : await stmt.run();
  return { success: result.success };
}

// Health Handler
async function handleHealth(env: Env): Promise<Response> {
  try {
    const result = await env.DB.prepare('SELECT 1 as test').first();
    return jsonResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: result ? 'connected' : 'error',
      version: '1.0.0',
      environment: 'cloudflare-workers'
    });
  } catch (error) {
    return jsonResponse({ status: 'unhealthy', error: String(error) }, 500);
  }
}

// Contact Handler
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

async function handleContact(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Save to D1
    await execute(
      env.DB,
      'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, ?)',
      [data.name, data.email, data.message, Date.now()]
    );

    // Send email via Resend (non-blocking)
    if (env.RESEND_API_KEY && env.NOTIFICATION_EMAIL) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@maiwald.work',
          to: env.NOTIFICATION_EMAIL,
          subject: `New Contact from ${data.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
          `,
          reply_to: data.email,
        }),
      }).catch(console.error);
    }

    return jsonResponse({ success: true, message: 'Contact form submitted successfully' }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ success: false, error: 'Validation failed', details: error.errors }, 400);
    }
    console.error('Contact error:', error);
    return jsonResponse({ success: false, error: 'Internal server error' }, 500);
  }
}

// Auth Handlers
const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    const user = await queryFirst<{ id: number; username: string; password: string; email: string | null }>(
      env.DB,
      'SELECT id, username, password, email FROM users WHERE username = ?',
      [username]
    );

    if (!user || !await bcrypt.compare(password, user.password)) {
      return jsonResponse({ success: false, error: 'Invalid credentials' }, 401);
    }

    const encoder = new TextEncoder();
    const token = await new SignJWT({ userId: user.id, username: user.username, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(encoder.encode(env.JWT_SECRET));

    return jsonResponse({
      success: true,
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token,
    }, 200, {
      'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ success: false, error: 'Validation failed', details: error.errors }, 400);
    }
    return jsonResponse({ success: false, error: 'Internal server error' }, 500);
  }
}

async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json();
    const { username, password, email } = loginSchema.extend({ email: z.string().email().optional() }).parse(body);

    const existing = await queryFirst(env.DB, 'SELECT id FROM users WHERE username = ?', [username]);
    if (existing) {
      return jsonResponse({ success: false, error: 'Username already exists' }, 409);
    }

    const hashed = await bcrypt.hash(password, 10);
    await execute(env.DB, 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashed, email || null]);

    return jsonResponse({ success: true, message: 'User registered successfully' }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonResponse({ success: false, error: 'Validation failed', details: error.errors }, 400);
    }
    return jsonResponse({ success: false, error: 'Internal server error' }, 500);
  }
}

// Static file serving
async function serveStatic(request: Request): Promise<Response> {
  const url = new URL(request.url);
  let path = url.pathname;
  
  if (path === '/') path = '/index.html';
  
  // Try to fetch from static assets
  const response = await fetch(new URL(path, 'https://static.maiwald.work'));
  
  if (response.ok) return response;
  
  // Fallback to index.html for SPA routing
  return fetch(new URL('/index.html', 'https://static.maiwald.work'));
}

// Helper functions
function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Main Worker
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    let response: Response;

    // Route handlers
    if (pathname === '/api/health' && request.method === 'GET') {
      response = await handleHealth(env);
    } else if (pathname === '/api/contact' && request.method === 'POST') {
      response = await handleContact(request, env);
    } else if (pathname === '/api/auth/login' && request.method === 'POST') {
      response = await handleLogin(request, env);
    } else if (pathname === '/api/auth/register' && request.method === 'POST') {
      response = await handleRegister(request, env);
    } else {
      // For now, return 404 for static files (need KV or R2 for assets)
      return new Response('Not Found - Static files require KV/R2 setup', { status: 404 });
    }

    // Add CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  },
};
