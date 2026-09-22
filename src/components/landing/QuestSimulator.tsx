"use client";

import React, { useState, useRef } from "react";

export default function QuestSimulator() {
  const [currentCP, setCurrentCP] = useState(2450);
  const [statusMessage, setStatusMessage] = useState("Click any quest on the left to simulate!");
  const [isBouncing, setIsBouncing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function simulateQuest(name: string, reward: number) {
    setCurrentCP((prev) => prev + reward);
    setStatusMessage(`🎉 Verified: ${name}! +${reward} CP`);
    setIsBouncing(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 350);

    // Pop confetti particles
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div");
        p.className = "confetti-particle";
        const colors = ["#2563EB", "#F43F5E", "#10B981", "#FFD700", "#60A5FA"];
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${rect.width / 2}px`;
        p.style.top = `${rect.height / 2}px`;
        const dx = `${(Math.random() - 0.5) * 260}px`;
        const dy = `${(Math.random() - 0.5) * 200}px`;
        p.style.setProperty("--dx", dx);
        p.style.setProperty("--dy", dy);
        card.appendChild(p);
        setTimeout(() => p.remove(), 900);
      }
    }
  }

  return (
    <div className="interactive-simulator">
      <div className="simulator-text">
        <h2>Try a Civic Quest Right Now!</h2>
        <p>
          Click any action below to test the instant verification loop and watch your Civic Points &amp; streak level up:
        </p>
        <div className="quest-pill-buttons">
          <button
            type="button"
            className="quest-clickable"
            onClick={() => simulateQuest("🧹 Park Cleanup", 50)}
          >
            🧹 Pick up Litter (+50 CP)
          </button>
          <button
            type="button"
            className="quest-clickable"
            onClick={() => simulateQuest("🕳️ Pothole Reported", 100)}
          >
            🕳️ Report Pothole (+100 CP)
          </button>
          <button
            type="button"
            className="quest-clickable"
            onClick={() => simulateQuest("🐾 Stray Animal Care", 200)}
          >
            🐾 Help Stray (+200 CP)
          </button>
        </div>
      </div>

      <div className="simulator-counter-card" ref={cardRef}>
        <span className="sim-streak-tag">🔥 7-DAY STREAK ACTIVE</span>
        <div
          className="sim-cp-val"
          style={{
            transform: isBouncing ? "scale(1.25)" : "scale(1)",
            color: isBouncing ? "#10B981" : "#F59E0B",
          }}
        >
          <span>🪙</span>
          <span>{currentCP.toLocaleString()}</span>
          <span style={{ fontSize: "20px", color: "#64748B" }}>CP</span>
        </div>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#10B981" }}>
          {statusMessage}
        </div>
      </div>
    </div>
  );
}
