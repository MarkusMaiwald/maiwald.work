import type { PagesFunction } from '@cloudflare/workers-types';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { queryFirst, execute } from '../../utils/db';

// Validation schema
const registerSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
  email: z.string().email().optional(),
});

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    // Parse and validate request body
    const body = await request.json();
    const { username, password, email } = registerSchema.parse(body);
    
    // Check if username already exists
    const existingUser = await queryFirst(
      env.DB,
      'SELECT id FROM users WHERE username = ?',
      [username]
    );
    
    if (existingUser) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Username already exists' 
        }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert user into D1
    const result = await execute(
      env.DB,
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, hashedPassword, email || null]
    );
    
    if (!result.success) {
      throw new Error('Failed to create user');
    }
    
    // Return success (without exposing password)
    return new Response(
      JSON.stringify({
        success: true,
        message: 'User registered successfully',
        user: {
          username,
          email: email || null,
        },
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
    console.error('Registration error:', error);
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
