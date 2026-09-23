import { createClient, Client } from "@libsql/client";
import path from "node:path";
import os from "node:os";

export interface UserRecord {
  s_no: number;
  email: string;
  password: string;
  name: string;
}

export type SafeUser = Omit<UserRecord, "password">;

let clientInstance: Client | null = null;
let initPromise: Promise<void> | null = null;

export function getDb(): Client {
  if (!clientInstance) {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (tursoUrl) {
      // Connect to Turso Cloud SQLite (production on Vercel)
      clientInstance = createClient({
        url: tursoUrl,
        authToken: tursoToken,
      });
    } else {
      // Local SQLite file fallback
      // On Vercel without Turso, fallback to /tmp/civik.db to prevent read-only filesystem crash
      const isVercel = process.env.VERCEL === "1" || !!process.env.NEXT_PUBLIC_VERCEL_ENV;
      const dbPath = isVercel
        ? path.join(os.tmpdir(), "civik.db")
        : path.join(process.cwd(), "civik.db");

      clientInstance = createClient({
        url: `file:${dbPath}`,
      });
    }
  }
  return clientInstance;
}

export async function initDb(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const db = getDb();
        await db.execute(`
          CREATE TABLE IF NOT EXISTS users (
            s_no INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL
          );
        `);
      } catch (err) {
        console.error("Database initialization error:", err);
      }
    })();
  }
  return initPromise;
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  await initDb();
  const db = getDb();
  const res = await db.execute({
    sql: "SELECT s_no, email, password, name FROM users WHERE LOWER(email) = LOWER(?)",
    args: [email.trim()],
  });

  if (res.rows.length === 0) return null;

  const row = res.rows[0];
  return {
    s_no: Number(row.s_no),
    email: String(row.email),
    password: String(row.password),
    name: String(row.name),
  };
}

export async function findUserBySNo(sNo: number): Promise<UserRecord | null> {
  await initDb();
  const db = getDb();
  const res = await db.execute({
    sql: "SELECT s_no, email, password, name FROM users WHERE s_no = ?",
    args: [sNo],
  });

  if (res.rows.length === 0) return null;

  const row = res.rows[0];
  return {
    s_no: Number(row.s_no),
    email: String(row.email),
    password: String(row.password),
    name: String(row.name),
  };
}

export async function insertUser(
  email: string,
  passwordHash: string,
  name: string
): Promise<SafeUser> {
  await initDb();
  const db = getDb();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  const res = await db.execute({
    sql: "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    args: [trimmedEmail, passwordHash, trimmedName],
  });

  const s_no = Number(res.lastInsertRowid);

  return {
    s_no,
    email: trimmedEmail,
    name: trimmedName,
  };
}
