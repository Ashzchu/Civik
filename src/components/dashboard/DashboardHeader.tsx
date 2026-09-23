"use client";

import React from "react";
import { CivikUser } from "@/context/AuthContext";

export interface CompanionInfo {
  id: string;
  name: string;
  species: string;
  avatar: string;
  role: string;
  buff: string;
  description: string;
}

interface DashboardHeaderProps {
  user: CivikUser | null;
  cpBalance: number;
  activeCompanion: CompanionInfo;
  onExploreQuests: () => void;
  onOpenCompanions: () => void;
}

export default function DashboardHeader({
  user,
  cpBalance,
  activeCompanion,
  onExploreQuests,
  onOpenCompanions,
}: DashboardHeaderProps) {
  const firstName = user?.name ? user.name.split(" ")[0] : "Guardian";

  // Calculate level based on CP
  const level = Math.floor(cpBalance / 300) + 1;
  const currentLevelCP = cpBalance % 300;
  const progressPercent = Math.min(100, Math.round((currentLevelCP / 300) * 100));

  const levelTitles: Record<number, string> = {
    1: "Stream Scout",
    2: "Current Keeper",
    3: "Rain Garden Ranger",
    4: "River Guardian",
    5: "Sanctuary Architect",
    6: "Flow Master",
  };

  const title = levelTitles[level] || "Flow Pioneer";

  return (
    <section className="flow-hero-sanctuary">
      <div className="flow-hero-left">
        <div className="flow-hero-badge">
          <span>🛶</span>
          <span>The Flooded Haven • Sector 07</span>
        </div>

        <h1 className="flow-hero-title">
          Welcome aboard, <span>{firstName}</span>
        </h1>

        <p className="flow-hero-desc">
          The waters are rising, but your community sanctuary thrives. Embark on
          everyday civic quests, nurture urban ecosystems, and keep the stream pure.
        </p>

        {/* Level Progression Wave Bar */}
        <div className="flow-progress-box">
          <div className="flow-progress-meta">
            <span>
              Level {level}: <strong className="flow-level-name">{title}</strong>
            </span>
            <span style={{ color: "#fbbf24" }}>
              {currentLevelCP} / 300 CP ({progressPercent}%)
            </span>
          </div>

          <div className="flow-progress-bar-bg">
            <div
              className="flow-progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <span style={{ fontSize: 11.5, color: "#64748b" }}>
              Next tier: {levelTitles[level + 1] || "Flow Elder"} (+{300 - currentLevelCP} CP)
            </span>
            <button
              type="button"
              onClick={onExploreQuests}
              style={{
                background: "transparent",
                border: "none",
                color: "#38bdf8",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Start New Quest →
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: The Sanctuary Mascot Card */}
      <div className="flow-hero-right">
        <div className="flow-boat-mascot-card">
          <div className="flow-companion-avatar-wrap" title={activeCompanion.description}>
            {activeCompanion.avatar}
          </div>

          <h3 className="flow-companion-name">{activeCompanion.name}</h3>
          <div className="flow-companion-role">{activeCompanion.role}</div>

          <div className="flow-companion-buff">
            ⚡ {activeCompanion.buff}
          </div>

          <button
            type="button"
            onClick={onOpenCompanions}
            style={{
              marginTop: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#cbd5e1",
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Switch Companion 🔄
          </button>
        </div>
      </div>
    </section>
  );
}
