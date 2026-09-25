"use client";

import React, { useState } from "react";

interface RankTier {
  id: string;
  name: string;
  tierNumber: number;
  icon: string;
  cpRequired: string;
  heightPx: number;
  primaryColor: string;
  gradient: string;
  badgeBg: string;
  shadowColor: string;
  title: string;
  perk: string;
  multiplier: string;
  unlocks: string[];
}

const RANKS: RankTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    tierNumber: 1,
    icon: "🥉",
    cpRequired: "0 CP",
    heightPx: 170,
    primaryColor: "#CD7F32",
    gradient: "linear-gradient(180deg, #E69A56 0%, #A0521C 100%)",
    badgeBg: "rgba(205, 127, 50, 0.15)",
    shadowColor: "rgba(205, 127, 50, 0.35)",
    title: "Civic Rookie",
    perk: "Access to all daily neighborhood cleanup quests",
    multiplier: "1.0x CP",
    unlocks: ["Daily Quest Board", "Basic GPS Geo-tagging", "Civik Citizen ID"],
  },
  {
    id: "silver",
    name: "Silver",
    tierNumber: 2,
    icon: "🥈",
    cpRequired: "500 CP",
    heightPx: 205,
    primaryColor: "#94A3B8",
    gradient: "linear-gradient(180deg, #CBD5E1 0%, #64748B 100%)",
    badgeBg: "rgba(148, 163, 184, 0.2)",
    shadowColor: "rgba(100, 116, 139, 0.35)",
    title: "Active Scout",
    perk: "Unlock weekly civic milestone challenges",
    multiplier: "1.1x CP",
    unlocks: ["Weekly Milestones", "Silver Profile Ring", "+5 Daily Quest Limit"],
  },
  {
    id: "gold",
    name: "Gold",
    tierNumber: 3,
    icon: "🥇",
    cpRequired: "1,500 CP",
    heightPx: 240,
    primaryColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #FDE68A 0%, #D97706 100%)",
    badgeBg: "rgba(245, 158, 11, 0.2)",
    shadowColor: "rgba(245, 158, 11, 0.4)",
    title: "Neighborhood Guardian",
    perk: "Create and lead community squad quests",
    multiplier: "1.25x CP",
    unlocks: ["Squad Leader Status", "Fast AI Verification", "Civik Gold Pin"],
  },
  {
    id: "platinum",
    name: "Platinum",
    tierNumber: 4,
    icon: "💠",
    cpRequired: "3,500 CP",
    heightPx: 275,
    primaryColor: "#06B6D4",
    gradient: "linear-gradient(180deg, #67E8F9 0%, #0891B2 100%)",
    badgeBg: "rgba(6, 182, 212, 0.2)",
    shadowColor: "rgba(6, 182, 212, 0.4)",
    title: "District Sentinel",
    perk: "Direct municipality alert priority for reports",
    multiplier: "1.4x CP",
    unlocks: ["Direct City Ping", "Leaderboard Highlight", "Platinum Frame"],
  },
  {
    id: "diamond",
    name: "Diamond",
    tierNumber: 5,
    icon: "💎",
    cpRequired: "7,500 CP",
    heightPx: 310,
    primaryColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #93C5FD 0%, #1D4ED8 100%)",
    badgeBg: "rgba(59, 130, 246, 0.2)",
    shadowColor: "rgba(59, 130, 246, 0.4)",
    title: "Urban Inspector",
    perk: "Early access to high-bounty municipal quests",
    multiplier: "1.6x CP",
    unlocks: ["High-Bounty Access", "Diamond Sparkle Badge", "Voting Power x2"],
  },
  {
    id: "elite",
    name: "Elite",
    tierNumber: 6,
    icon: "⚡",
    cpRequired: "15,000 CP",
    heightPx: 350,
    primaryColor: "#8B5CF6",
    gradient: "linear-gradient(180deg, #C4B5FD 0%, #6D28D9 100%)",
    badgeBg: "rgba(139, 92, 246, 0.2)",
    shadowColor: "rgba(139, 92, 246, 0.45)",
    title: "Civic Vanguard",
    perk: "Peer-review community AI proof submissions",
    multiplier: "1.8x CP",
    unlocks: ["AI Proof Arbiter", "Elite Holographic Card", "Custom Civic Title"],
  },
  {
    id: "master",
    name: "Master",
    tierNumber: 7,
    icon: "🔥",
    cpRequired: "30,000 CP",
    heightPx: 390,
    primaryColor: "#F43F5E",
    gradient: "linear-gradient(180deg, #FDA4AF 0%, #BE123C 100%)",
    badgeBg: "rgba(244, 63, 94, 0.2)",
    shadowColor: "rgba(244, 63, 94, 0.45)",
    title: "Metro Mastermind",
    perk: "Host city-wide multi-district civic campaigns",
    multiplier: "2.1x CP",
    unlocks: ["Campaign Creator", "Master Flame Aura", "Civic Council Seat"],
  },
  {
    id: "grandmaster",
    name: "Grandmaster",
    tierNumber: 8,
    icon: "🌟",
    cpRequired: "60,000 CP",
    heightPx: 430,
    primaryColor: "#EC4899",
    gradient: "linear-gradient(180deg, #F472B6 0%, #9D174D 100%)",
    badgeBg: "rgba(236, 72, 153, 0.2)",
    shadowColor: "rgba(236, 72, 153, 0.45)",
    title: "Grand Overseer",
    perk: "Direct partnership with city hall & NGOs",
    multiplier: "2.5x CP",
    unlocks: ["NGO Direct Grants", "Grandmaster Star Ring", "Global Spotlight"],
  },
  {
    id: "champion",
    name: "Champion",
    tierNumber: 9,
    icon: "🏆",
    cpRequired: "120,000 CP",
    heightPx: 475,
    primaryColor: "#EA580C",
    gradient: "linear-gradient(180deg, #FB923C 0%, #C2410C 100%)",
    badgeBg: "rgba(234, 88, 12, 0.2)",
    shadowColor: "rgba(234, 88, 12, 0.5)",
    title: "National Champion",
    perk: "Top 0.5% leaderboard honors & real physical trophy",
    multiplier: "3.0x CP",
    unlocks: ["Physical Golden Trophy", "National Hall of Fame", "VIP Civic Summits"],
  },
  {
    id: "legendary",
    name: "Legendary",
    tierNumber: 10,
    icon: "👑",
    cpRequired: "250,000+ CP",
    heightPx: 520,
    primaryColor: "#8B5CF6",
    gradient: "linear-gradient(180deg, #FF6FD8 0%, #3813C2 50%, #FFD700 100%)",
    badgeBg: "rgba(255, 215, 0, 0.25)",
    shadowColor: "rgba(255, 111, 216, 0.6)",
    title: "Immortal Civic Legend",
    perk: "Permanent monument on the city hall digital wall",
    multiplier: "4.0x CP",
    unlocks: ["City Monument Inscription", "Prismatic Rainbow Aura", "Lifetime Civik Patron"],
  },
];

export default function RanksSection() {
  const [selectedRank, setSelectedRank] = useState<RankTier>(RANKS[0]);

  return (
    <section className="ranks-section" id="ranks">
      <div className="section-header">
        <span className="section-tag">🏆 Civic Progression</span>
        <h2 className="section-title">Climb the 10 Civic Ranks</h2>
        <p className="section-desc">
          Every verified cleanup, repair report, and local quest earns you Civic Points (CP).
          Watch your stature climb from Bronze rookie to Legendary immortal guardian!
        </p>
      </div>

      {/* Bar Graph Container */}
      <div className="ranks-graph-wrapper">
        <div className="ranks-graph-helper">
          <span>Scroll horizontally or click any rank to view perks &amp; multipliers &rarr;</span>
          <span className="ranks-level-indicator">
            Active: <strong>{selectedRank.name} (Tier {selectedRank.tierNumber})</strong>
          </span>
        </div>

        <div className="ranks-graph-container">
          <div className="ranks-graph-track">
            {RANKS.map((rank) => {
              const isSelected = selectedRank.id === rank.id;
              return (
                <div
                  key={rank.id}
                  className={`rank-column ${isSelected ? "selected" : ""}`}
                  style={{ height: `${rank.heightPx}px` }}
                  onClick={() => setSelectedRank(rank)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedRank(rank);
                    }
                  }}
                  aria-label={`${rank.name} rank, requires ${rank.cpRequired}`}
                >
                  {/* Floating Cap / Header */}
                  <div
                    className="rank-top-badge"
                    style={{
                      borderColor: rank.primaryColor,
                      boxShadow: isSelected
                        ? `0 0 20px ${rank.shadowColor}`
                        : `0 4px 12px ${rank.shadowColor}`,
                    }}
                  >
                    <span className="rank-emoji">{rank.icon}</span>
                    <span className="rank-tier-num">T{rank.tierNumber}</span>
                  </div>

                  {/* Main Rising Pillar Bar */}
                  <div
                    className="rank-bar-pillar"
                    style={{
                      background: rank.gradient,
                      boxShadow: isSelected
                        ? `0 12px 30px ${rank.shadowColor}, inset 0 2px 4px rgba(255,255,255,0.6)`
                        : `0 6px 18px ${rank.shadowColor}, inset 0 1px 2px rgba(255,255,255,0.4)`,
                    }}
                  >
                    {/* Shimmer effect for top tiers */}
                    {rank.tierNumber >= 8 && <div className="rank-shimmer" />}

                    <div className="rank-bar-content">
                      <span className="rank-name-text">{rank.name}</span>
                      <span className="rank-cp-pill">{rank.cpRequired}</span>
                      <span className="rank-mult-badge">{rank.multiplier}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Graph Base Axis Line */}
          <div className="ranks-graph-baseline">
            <span className="baseline-label start">🥉 Tier 1: Bronze (Entry Level)</span>
            <span className="baseline-arrow">&rarr; Ascending Civic Stature &rarr;</span>
            <span className="baseline-label end">👑 Tier 10: Legendary (Pinnacle)</span>
          </div>
        </div>
      </div>

      {/* Selected Tier Spotlight Card */}
      <div className="rank-spotlight-card">
        <div className="spotlight-header">
          <div
            className="spotlight-icon-circle"
            style={{
              background: selectedRank.gradient,
              boxShadow: `0 8px 24px ${selectedRank.shadowColor}`,
            }}
          >
            <span>{selectedRank.icon}</span>
          </div>
          <div className="spotlight-title-group">
            <div className="spotlight-tier-tag" style={{ color: selectedRank.primaryColor }}>
              TIER {selectedRank.tierNumber} PROGRESSION
            </div>
            <h3 className="spotlight-rank-name">
              {selectedRank.name} — <em>{selectedRank.title}</em>
            </h3>
            <p className="spotlight-perk-desc">{selectedRank.perk}</p>
          </div>
          <div className="spotlight-stats-pill">
            <div className="stat-item">
              <span className="stat-label">Requirement</span>
              <span className="stat-value" style={{ color: selectedRank.primaryColor }}>
                {selectedRank.cpRequired}
              </span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-label">Multiplier</span>
              <span className="stat-value">{selectedRank.multiplier}</span>
            </div>
          </div>
        </div>

        <div className="spotlight-unlocks-grid">
          {selectedRank.unlocks.map((unlock, i) => (
            <div key={i} className="unlock-pill">
              <span className="unlock-check">✓</span>
              <span>{unlock}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
