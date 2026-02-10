import { Router } from './router';
import { serveStatic } from './static';

// Import API handlers
import { onRequestPost as contactHandler } from './api/contact';
import { onRequestPost as loginHandler } from './api/auth/login';
import { onRequestPost as registerHandler } from './api/auth/register';
import { onRequestGet as healthHandler } from './api/health';

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  RESEND_API_KEY: string;
  NOTIFICATION_EMAIL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS Headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    let response: Response;

    // API Routes
    if (pathname === '/api/health' && request.method === 'GET') {
      response = await healthHandler({ request, env, ctx } as any);
    } else if (pathname === '/api/contact' && request.method === 'POST') {
      response = await contactHandler({ request, env, ctx } as any);
    } else if (pathname === '/api/auth/login' && request.method === 'POST') {
      response = await loginHandler({ request, env, ctx } as any);
    } else if (pathname === '/api/auth/register' && request.method === 'POST') {
      response = await registerHandler({ request, env, ctx } as any);
    } else {
      // Static files
      response = await serveStatic(request);
    }

    // Add CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  },
};
