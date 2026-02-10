import type { PagesFunction } from '@cloudflare/workers-types';

// Environment interface
interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const origin = request.headers.get('Origin');
  
  // Allowed origins - same origin doesn't need CORS, but for safety
  const allowedOrigins = [
    'https://maiwald.work',
    'https://www.maiwald.work',
    'http://localhost:8788',
    'http://localhost:5173', // Vite dev server
  ];
  
  const corsOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  // CORS Headers
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
  };
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    });
  }
  
  // Process the request
  try {
    const response = await context.next();
    
    // Add CORS headers to all responses
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    throw error;
  }
};
