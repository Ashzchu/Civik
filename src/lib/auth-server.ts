import crypto from "node:crypto";
import { cookies } from "next/headers";
import { findUserBySNo, SafeUser } from "./db";

const AUTH_SECRET = process.env.AUTH_SECRET || "civik-super-secret-local-sqlite-key-2025";
export const SESSION_COOKIE_NAME = "civik_session";

// Password Hashing
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

// Session Token Generation & Verification (HMAC-SHA256)
interface SessionPayload {
  s_no: number;
  email: string;
  exp: number;
}

export function createSessionToken(s_no: number, email: string, daysValid = 7): string {
  const exp = Date.now() + daysValid * 24 * 60 * 60 * 1000;
  const payload: SessionPayload = { s_no, email, exp };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const [encodedPayload, signature] = token.split(".");
    if (!encodedPayload || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(): Promise<SafeUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const payload = verifySessionToken(sessionCookie.value);
    if (!payload) return null;

    const user = await findUserBySNo(payload.s_no);
    if (!user) return null;

    return {
      s_no: user.s_no,
      email: user.email,
      name: user.name,
    };
  } catch (error) {
    console.error("Error authenticating user from session:", error);
    return null;
  }
}
