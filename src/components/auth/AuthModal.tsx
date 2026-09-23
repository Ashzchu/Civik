"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  mode: "signin" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "signin" | "signup") => void;
}

export default function AuthModal({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
}: AuthModalProps) {
  const { signInWithPassword, signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear feedback when mode changes or modal is closed
  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [mode, isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSignInSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const { error } = await signInWithPassword(email, password);
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Signed in successfully! Welcome back.");
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignUpSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const { user, error } = await signUp(email, password, fullName);
      if (error) {
        setErrorMessage(error.message);
      } else if (user) {
        setSuccessMessage(`Account created for ${user.name}! Welcome to Civik.`);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="auth-header">
          <div className="auth-logo-badge">🏛️</div>
          <h3>{mode === "signup" ? "Join Civik Today" : "Welcome Back"}</h3>
          <p>
            {mode === "signup"
              ? "Create an account to start quests, earn CP & level up your city"
              : "Sign in to track quests, earn CP & level up your city"}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === "signin" ? "active" : ""}`}
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              onSwitchMode("signin");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => {
              setErrorMessage(null);
              setSuccessMessage(null);
              onSwitchMode("signup");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="auth-alert auth-alert-error" role="alert">
            <span>⚠️</span>
            <div>{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success" role="status">
            <span>🎉</span>
            <div>{successMessage}</div>
          </div>
        )}

        {/* Sign In Form */}
        {mode === "signin" ? (
          <form className="auth-form" onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <label htmlFor="signin-email">Email Address</label>
              <input
                type="email"
                id="signin-email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signin-password">Password</label>
              <input
                type="password"
                id="signin-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Signing In..." : "Sign In ⚡"}
            </button>

            <p className="auth-footer-note">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  onSwitchMode("signup");
                }}
              >
                Sign Up
              </button>
            </p>
          </form>
        ) : (
          /* Sign Up Form */
          <form className="auth-form" onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                placeholder="Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                type="email"
                id="signup-email"
                placeholder="alex@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Create Password</label>
              <input
                type="password"
                id="signup-password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={submitting}
              />
            </div>

            <button
              type="submit"
              className="btn btn-coral auth-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Creating Account..." : "Create Account 🚀"}
            </button>

            <p className="auth-footer-note">
              Already have an account?{" "}
              <button
                type="button"
                className="auth-link"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  onSwitchMode("signin");
                }}
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
