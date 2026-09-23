"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CivikUser {
  s_no: number;
  email: string;
  name: string;
}

export interface AuthError {
  message: string;
}

interface AuthContextType {
  user: CivikUser | null;
  loading: boolean;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ user: CivikUser | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CivikUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function checkAuthSession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setUser(data.user || null);
          }
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkAuthSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function signInWithPassword(email: string, password: string) {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: { message: data.error || "Failed to sign in." } };
      }

      setUser(data.user);
      return { error: null };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "Network error during sign-in.",
        },
      };
    }
  }

  async function signUp(email: string, password: string, fullName: string) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: fullName }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { user: null, error: { message: data.error || "Failed to register." } };
      }

      setUser(data.user);
      return { user: data.user, error: null };
    } catch (err) {
      return {
        user: null,
        error: {
          message: err instanceof Error ? err.message : "Network error during registration.",
        },
      };
    }
  }

  async function signOut() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      return { error: null };
    } catch (err) {
      return {
        error: {
          message: err instanceof Error ? err.message : "Failed to sign out.",
        },
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithPassword,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
