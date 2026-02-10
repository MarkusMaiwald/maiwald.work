import type { PagesFunction } from '@cloudflare/workers-types';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { queryFirst } from '../../utils/db';

// Validation schema
const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
});

// User type from D1
interface User {
  id: number;
  username: string;
  password: string;
  email: string | null;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    // Parse and validate request body
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);
    
    // Find user in D1 database
    const user = await queryFirst<User>(
      env.DB,
      'SELECT id, username, password, email FROM users WHERE username = ?',
      [username]
    );
    
    // Check if user exists
    if (!user) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid credentials' 
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Verify password with bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid credentials' 
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Create JWT token
    const encoder = new TextEncoder();
    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .setSubject(user.id.toString())
      .sign(encoder.encode(env.JWT_SECRET));
    
    // Return success with token
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        token,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Set HTTP-only cookie with token
          'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
        },
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
    console.error('Login error:', error);
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
