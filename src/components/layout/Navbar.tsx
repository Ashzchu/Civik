"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  onOpenAuth: (mode: "signin" | "signup") => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, loading, signOut } = useAuth();

  const displayName = user?.name || user?.email?.split("@")[0] || "Citizen";

  const userInitial = (user?.name?.[0] || user?.email?.[0] || "C").toUpperCase();

  return (
    <header>
      <nav className="navbar" aria-label="Main Navigation">
        <a href="#" className="logo-group">
          <div className="logo-badge" aria-hidden="true">
            🏛️
          </div>
          <div className="logo-text">
            Civik<span>.</span>
          </div>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#quests">Quests</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#screens">App Experience</a>
          </li>
        </ul>

        <div className="nav-actions">
          {!loading && user ? (
            <>
              <div className="nav-user-pill" title={user.email || ""}>
                <div className="nav-user-avatar">{userInitial}</div>
                <span className="nav-user-name">{displayName}</span>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: "10px 18px", fontSize: "14px" }}
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: "10px 20px", fontSize: "14px" }}
                onClick={() => onOpenAuth("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                className="btn btn-coral btn-signup"
                style={{ padding: "10px 20px", fontSize: "14px" }}
                onClick={() => onOpenAuth("signup")}
              >
                Sign Up
              </button>
            </>
          )}

          <a
            href="#download"
            className="btn btn-primary"
            style={{ padding: "10px 22px", fontSize: "14px" }}
          >
            Get Civik App
          </a>
        </div>
      </nav>
    </header>
  );
}
