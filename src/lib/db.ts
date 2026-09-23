import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

export interface UserRecord {
  s_no: number;
  email: string;
  password: string;
  name: string;
}

export type SafeUser = Omit<UserRecord, "password">;

const DB_PATH = path.join(process.cwd(), "civik.db");

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    
    // Create users table with exact columns requested:
    // (S no.), (Email), Password, Name
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS users (
        s_no INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL COLLATE NOCASE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `);
  }
  return dbInstance;
}

export function findUserByEmail(email: string): UserRecord | null {
  const db = getDb();
  const stmt = db.prepare("SELECT s_no, email, password, name FROM users WHERE email = ?");
  const result = stmt.get(email.trim().toLowerCase()) as UserRecord | undefined;
  return result || null;
}

export function findUserBySNo(sNo: number): UserRecord | null {
  const db = getDb();
  const stmt = db.prepare("SELECT s_no, email, password, name FROM users WHERE s_no = ?");
  const result = stmt.get(sNo) as UserRecord | undefined;
  return result || null;
}

export function insertUser(email: string, passwordHash: string, name: string): SafeUser {
  const db = getDb();
  const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();
  
  const result = stmt.run(trimmedEmail, passwordHash, trimmedName);
  const s_no = Number(result.lastInsertRowid);

  return {
    s_no,
    email: trimmedEmail,
    name: trimmedName,
  };
}
