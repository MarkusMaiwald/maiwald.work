import { jwtVerify } from 'jose';

export interface JWTPayload {
  userId: number;
  username: string;
  email: string | null;
  sub?: string;
  iat?: number;
  exp?: number;
}

/**
 * Verify JWT token from request
 * @param request - The incoming request
 * @param secret - JWT secret from env
 * @returns Decoded JWT payload
 * @throws Error if token is invalid or missing
 */
export async function verifyAuth(
  request: Request,
  secret: string
): Promise<JWTPayload> {
  // Get token from Authorization header or Cookie
  const authHeader = request.headers.get('Authorization');
  const cookieHeader = request.headers.get('Cookie');
  
  let token: string | undefined;
  
  // Check Authorization header (Bearer token)
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  // Check Cookie
  else if (cookieHeader) {
    const match = cookieHeader.match(/token=([^;]+)/);
    if (match) {
      token = match[1];
    }
  }
  
  if (!token) {
    throw new Error('No authentication token provided');
  }
  
  // Verify token
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    
    return {
      userId: payload.userId as number,
      username: payload.username as string,
      email: payload.email as string | null,
      sub: payload.sub,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Middleware wrapper for protected routes
 * Usage: export const onRequestGet = withAuth(async (context, user) => { ... })
 */
export function withAuth(
  handler: (context: any, user: JWTPayload) => Promise<Response>
) {
  return async (context: any): Promise<Response> => {
    try {
      const user = await verifyAuth(context.request, context.env.JWT_SECRET);
      return handler(context, user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unauthorized';
      return new Response(
        JSON.stringify({ success: false, error: message }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  };
}
