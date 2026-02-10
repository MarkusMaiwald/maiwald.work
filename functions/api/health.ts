import type { PagesFunction } from '@cloudflare/workers-types';
import { Env } from '../utils/db';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  
  try {
    // Test database connection
    const result = await env.DB.prepare('SELECT 1 as test').first();
    
    return new Response(
      JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: result ? 'connected' : 'error',
        version: '1.0.0',
        environment: 'cloudflare-pages'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
