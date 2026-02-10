import type { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

// Typed D1 Helper for querying
export async function query<T>(
  db: D1Database,
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const stmt = db.prepare(sql);
  const result = params ? stmt.bind(...params) : stmt;
  return (await result.all()).results as T[];
}

export async function queryFirst<T>(
  db: D1Database,
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const stmt = db.prepare(sql);
  const result = params ? stmt.bind(...params) : stmt;
  return (await result.first()) as T | null;
}

// Execute a write query (INSERT, UPDATE, DELETE)
export async function execute(
  db: D1Database,
  sql: string,
  params?: unknown[]
): Promise<{ success: boolean; meta: unknown }> {
  const stmt = db.prepare(sql);
  const result = params ? await stmt.bind(...params).run() : await stmt.run();
  return { success: result.success, meta: result.meta };
}
