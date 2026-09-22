"use client";

import React, { useRef, useEffect } from "react";

export default function HeroSection() {
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroVisual = heroVisualRef.current;
    const phoneWrapper = phoneWrapperRef.current;
    if (!heroVisual || !phoneWrapper) return;

    const defaultRotateY = -6;
    const defaultRotateX = 3;
    const maxTilt = 15;

    let isHovered = false;
    let targetRotateX = defaultRotateX;
    let targetRotateY = defaultRotateY;
    let currentRotateX = defaultRotateX;
    let currentRotateY = defaultRotateY;
    let animFrameId: number | null = null;

    let cachedCenterX = 0;
    let cachedCenterY = 0;
    let boundWidth = 200;
    let boundHeight = 300;

    function updateBounds() {
      if (!phoneWrapper) return;
      const rect = phoneWrapper.getBoundingClientRect();
      cachedCenterX = rect.left + rect.width / 2;
      cachedCenterY = rect.top + rect.height / 2;
      boundWidth = Math.max(rect.width * 0.9, 180);
      boundHeight = Math.max(rect.height * 0.9, 260);
    }

    function updateCameraTilt() {
      if (!phoneWrapper) return;
      const ease = 0.12;
      currentRotateX += (targetRotateX - currentRotateX) * ease;
      currentRotateY += (targetRotateY - currentRotateY) * ease;

      phoneWrapper.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

      const diffX = Math.abs(targetRotateX - currentRotateX);
      const diffY = Math.abs(targetRotateY - currentRotateY);

      if (isHovered || diffX > 0.02 || diffY > 0.02) {
        animFrameId = requestAnimationFrame(updateCameraTilt);
      } else {
        currentRotateX = targetRotateX;
        currentRotateY = targetRotateY;
        phoneWrapper.style.transform = `perspective(1000px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg)`;
        animFrameId = null;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      const deltaX = e.clientX - cachedCenterX;
      const deltaY = e.clientY - cachedCenterY;

      const normX = Math.max(-1, Math.min(1, deltaX / boundWidth));
      const normY = Math.max(-1, Math.min(1, deltaY / boundHeight));

      targetRotateX = -normY * maxTilt;
      targetRotateY = normX * maxTilt;

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(updateCameraTilt);
      }
    }

    function handleMouseEnter(e: MouseEvent) {
      isHovered = true;
      updateBounds();
      handleMouseMove(e);
    }

    function handleMouseLeave() {
      isHovered = false;
      targetRotateX = defaultRotateX;
      targetRotateY = defaultRotateY;
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(updateCameraTilt);
      }
    }

    heroVisual.addEventListener("mouseenter", handleMouseEnter);
    heroVisual.addEventListener("mousemove", handleMouseMove);
    heroVisual.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateBounds);

    updateBounds();

    return () => {
      heroVisual.removeEventListener("mouseenter", handleMouseEnter);
      heroVisual.removeEventListener("mousemove", handleMouseMove);
      heroVisual.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateBounds);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="sparkle">✨</span>Gamified Civic Platform for Gen-Z
        </div>

        <h1 className="hero-title">
          Your City. <br />
          <span className="highlight-blue">Your Quest.</span> <br />
          <span className="highlight-coral">Level Up</span> Your World.
        </h1>

        <p className="hero-subtitle">
          Turn everyday civic deeds into real missions. Snap proof of street cleanup, pothole reporting, or any
          community care - get it verified instantly by computer vision. Earn Civik points and lead a healthy community.
        </p>

        <div className="hero-ctas">
          <a
            href="#download"
            className="btn btn-coral"
            style={{ fontSize: "18px", padding: "15px 32px" }}
          >
            🚀 Start Missions
          </a>
          <a
            href="#how-it-works"
            className="btn btn-secondary"
            style={{ fontSize: "16px", padding: "15px 26px" }}
          >
            ▶️ Watch 1-Min Tour
          </a>
        </div>

        <div className="hero-proof">
          <div className="avatar-stack">
            <div className="mini-avatar" style={{ backgroundColor: "#3B82F6" }}>👦</div>
            <div className="mini-avatar" style={{ backgroundColor: "#F43F5E" }}>👩</div>
            <div className="mini-avatar" style={{ backgroundColor: "#10B981" }}>🧑</div>
            <div className="mini-avatar" style={{ backgroundColor: "#F59E0B" }}>👧</div>
          </div>
          <div className="proof-text">
            <strong>Complete a quest now!</strong>
            Join the movement to make your city a better place.
          </div>
        </div>
      </div>

      <div className="hero-visual" ref={heroVisualRef}>
        <div className="phone-mockup-wrapper" ref={phoneWrapperRef}>
          {/* Floating Badge 1 */}
          <div className="floating-badge badge-ai">
            <div className="badge-icon bg-green-clay">✓</div>
            <div className="badge-content">
              <h4>Litter Cleaned!</h4>
              <p>Gemini AI Verified · +100 CP</p>
            </div>
          </div>

          {/* Floating Badge 2 */}
          <div className="floating-badge badge-streak">
            <div className="badge-icon bg-orange-clay">🔥</div>
            <div className="badge-content">
              <h4>7-Day Streak!</h4>
              <p>2.5x CP Multiplier Active</p>
            </div>
          </div>

          {/* Floating Badge 3 */}
          <div className="floating-badge badge-cp">
            <div className="badge-icon bg-gold-clay">🪙</div>
            <div className="badge-content">
              <h4>Civic Level 12</h4>
              <p style={{ color: "#D97706" }}>Top 3% Citizen</p>
            </div>
          </div>

          <div className="phone-screen">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Landing%20Page/home_screen.svg" alt="Civik Home Screen UI" />
          </div>
        </div>
      </div>
    </section>
  );
}
