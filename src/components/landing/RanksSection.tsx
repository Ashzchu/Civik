"use client";

import React, { useState, useRef } from "react";

export interface RankTier {
  id: string;
  name: string;
  tierNumber: number;
  icon: string;
  cpRequired: string;
  cpNum: number;
  heightPx: number;
  primaryColor: string;
  gradient: string;
  badgeBg: string;
  shadowColor: string;
  title: string;
  tagline: string;
  bracket: "Grassroots" | "Guardian" | "Legend";
  multiplier: string;
  multiplierVal: number;
  perk: string;
  typicalQuest: string;
  realWorldImpact: string;
  authorityUnlocks: string[];
  prestigeUnlocks: string[];
  gameplayUnlocks: string[];
}

export const RANKS: RankTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    tierNumber: 1,
    icon: "🥉",
    cpRequired: "0 CP",
    cpNum: 0,
    heightPx: 180,
    primaryColor: "#CD7F32",
    gradient: "linear-gradient(180deg, #F0A868 0%, #A0521C 100%)",
    badgeBg: "rgba(205, 127, 50, 0.15)",
    shadowColor: "rgba(205, 127, 50, 0.35)",
    title: "Civic Rookie",
    tagline: "Your journey to revitalizing your city begins here.",
    bracket: "Grassroots",
    multiplier: "1.0x CP",
    multiplierVal: 1.0,
    perk: "Access to all daily neighborhood cleanup & beautification quests",
    typicalQuest: "Clean 1 block of litter or geo-tag a damaged public bench",
    realWorldImpact: "Builds daily civic habits and keeps your neighborhood tidy",
    authorityUnlocks: ["Daily Quest Board", "Basic GPS Geo-Tagging"],
    prestigeUnlocks: ["Civik Citizen ID", "Bronze Profile Badge"],
    gameplayUnlocks: ["3 Daily Active Quests", "Standard Community Feed"],
  },
  {
    id: "silver",
    name: "Silver",
    tierNumber: 2,
    icon: "🥈",
    cpRequired: "500 CP",
    cpNum: 500,
    heightPx: 215,
    primaryColor: "#94A3B8",
    gradient: "linear-gradient(180deg, #E2E8F0 0%, #64748B 100%)",
    badgeBg: "rgba(148, 163, 184, 0.2)",
    shadowColor: "rgba(100, 116, 139, 0.35)",
    title: "Active Scout",
    tagline: "A proven neighborhood regular who steps up when needed.",
    bracket: "Grassroots",
    multiplier: "1.1x CP",
    multiplierVal: 1.1,
    perk: "Unlock weekly civic milestone challenges & local team sweeps",
    typicalQuest: "Report 3 broken streetlights or clean a public bus stop",
    realWorldImpact: "Accelerates hazard resolution across your neighborhood block",
    authorityUnlocks: ["Weekly Milestones", "Priority Hazard Tagging"],
    prestigeUnlocks: ["Silver Citizen Ring", "Public Contributor Pin"],
    gameplayUnlocks: ["+10% CP Multiplier", "+5 Daily Quest Limit"],
  },
  {
    id: "gold",
    name: "Gold",
    tierNumber: 3,
    icon: "🥇",
    cpRequired: "1,500 CP",
    cpNum: 1500,
    heightPx: 250,
    primaryColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #FDE68A 0%, #D97706 100%)",
    badgeBg: "rgba(245, 158, 11, 0.2)",
    shadowColor: "rgba(245, 158, 11, 0.4)",
    title: "Neighborhood Guardian",
    tagline: "Inspiring peers and organizing grassroots squad cleanups.",
    bracket: "Grassroots",
    multiplier: "1.25x CP",
    multiplierVal: 1.25,
    perk: "Create, recruit, and lead your own community squad missions",
    typicalQuest: "Organize a 5-person park cleanup or paint community mural wall",
    realWorldImpact: "Galvanizes small squads to tackle large public space restorations",
    authorityUnlocks: ["Squad Leader Status", "Fast AI Verification Queue"],
    prestigeUnlocks: ["Civik Gold Pin", "Neighborhood Spotlight"],
    gameplayUnlocks: ["+25% CP Multiplier", "Squad Chat & Team Quests"],
  },
  {
    id: "platinum",
    name: "Platinum",
    tierNumber: 4,
    icon: "💠",
    cpRequired: "3,500 CP",
    cpNum: 3500,
    heightPx: 285,
    primaryColor: "#06B6D4",
    gradient: "linear-gradient(180deg, #67E8F9 0%, #0891B2 100%)",
    badgeBg: "rgba(6, 182, 212, 0.2)",
    shadowColor: "rgba(6, 182, 212, 0.4)",
    title: "District Sentinel",
    tagline: "Recognized by municipal teams as a trusted local scout.",
    bracket: "Guardian",
    multiplier: "1.4x CP",
    multiplierVal: 1.4,
    perk: "Direct municipality alert priority for all urgent civil hazards",
    typicalQuest: "Audit municipal storm drains or organize district recycling drive",
    realWorldImpact: "Directly bridges citizens with city department work orders",
    authorityUnlocks: ["Direct Municipality Ping", "District Hazard Flagging"],
    prestigeUnlocks: ["Platinum Glowing Frame", "Civik District Emissary"],
    gameplayUnlocks: ["+40% CP Multiplier", "Leaderboard District Banner"],
  },
  {
    id: "diamond",
    name: "Diamond",
    tierNumber: 5,
    icon: "💎",
    cpRequired: "7,500 CP",
    cpNum: 7500,
    heightPx: 320,
    primaryColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #93C5FD 0%, #1D4ED8 100%)",
    badgeBg: "rgba(59, 130, 246, 0.2)",
    shadowColor: "rgba(59, 130, 246, 0.4)",
    title: "Urban Inspector",
    tagline: "Elite civic contributor entrusted with high-bounty municipal quests.",
    bracket: "Guardian",
    multiplier: "1.6x CP",
    multiplierVal: 1.6,
    perk: "Early access to high-bounty municipal quests & doubled voting power",
    typicalQuest: "Conduct accessibility audits for subway stations or bike corridors",
    realWorldImpact: "Ensures urban infrastructure accessibility and pedestrian safety",
    authorityUnlocks: ["High-Bounty Access", "Double Voting Power in Civic Polls"],
    prestigeUnlocks: ["Diamond Sparkle Badge", "Exclusive Diamond Citizen Card"],
    gameplayUnlocks: ["+60% CP Multiplier", "2x Daily Quest Capacity"],
  },
  {
    id: "elite",
    name: "Elite",
    tierNumber: 6,
    icon: "⚡",
    cpRequired: "15,000 CP",
    cpNum: 15000,
    heightPx: 360,
    primaryColor: "#8B5CF6",
    gradient: "linear-gradient(180deg, #C4B5FD 0%, #6D28D9 100%)",
    badgeBg: "rgba(139, 92, 246, 0.2)",
    shadowColor: "rgba(139, 92, 246, 0.45)",
    title: "Civic Vanguard",
    tagline: "A respected arbiter of civic integrity and community proof submissions.",
    bracket: "Guardian",
    multiplier: "1.8x CP",
    multiplierVal: 1.8,
    perk: "Peer-review community AI proof submissions & validate civic audits",
    typicalQuest: "Review 10 community proof photos for computer vision accuracy",
    realWorldImpact: "Guarantees zero fraud and maintains trust in all verified civic work",
    authorityUnlocks: ["AI Proof Arbiter Rights", "Dispute Resolution Authority"],
    prestigeUnlocks: ["Elite Holographic Card", "Custom Civic Hero Title"],
    gameplayUnlocks: ["+80% CP Multiplier", "Reviewer CP Bonuses (+25 CP/rev)"],
  },
  {
    id: "master",
    name: "Master",
    tierNumber: 7,
    icon: "🔥",
    cpRequired: "30,000 CP",
    cpNum: 30000,
    heightPx: 400,
    primaryColor: "#F43F5E",
    gradient: "linear-gradient(180deg, #FDA4AF 0%, #BE123C 100%)",
    badgeBg: "rgba(244, 63, 94, 0.2)",
    shadowColor: "rgba(244, 63, 94, 0.45)",
    title: "Metro Mastermind",
    tagline: "Architect of city-wide campaigns that mobilize thousands of citizens.",
    bracket: "Legend",
    multiplier: "2.1x CP",
    multiplierVal: 2.1,
    perk: "Host city-wide multi-district civic campaigns & unlock civic council seat",
    typicalQuest: "Launch a 500-person riverbank restoration and tree planting drive",
    realWorldImpact: "Transforms entire urban sectors through coordinated collective action",
    authorityUnlocks: ["Campaign Creator Access", "Civic Advisory Council Seat"],
    prestigeUnlocks: ["Master Flame Aura", "Civik Master Embroidered Jacket"],
    gameplayUnlocks: ["+110% CP Multiplier", "Unlimited Squad Capacity"],
  },
  {
    id: "grandmaster",
    name: "Grandmaster",
    tierNumber: 8,
    icon: "🌟",
    cpRequired: "60,000 CP",
    cpNum: 60000,
    heightPx: 440,
    primaryColor: "#EC4899",
    gradient: "linear-gradient(180deg, #F472B6 0%, #9D174D 100%)",
    badgeBg: "rgba(236, 72, 153, 0.2)",
    shadowColor: "rgba(236, 72, 153, 0.45)",
    title: "Grand Overseer",
    tagline: "Direct liaison between citizen movements, municipal halls, and NGOs.",
    bracket: "Legend",
    multiplier: "2.5x CP",
    multiplierVal: 2.5,
    perk: "Direct sponsorship grants with city hall & NGOs for community projects",
    typicalQuest: "Direct allocation of a $10,000 municipal micro-grant for public parks",
    realWorldImpact: "Directs civic funding straight to the neighborhoods that need it most",
    authorityUnlocks: ["NGO Direct Grants Portal", "City Council Voting Privileges"],
    prestigeUnlocks: ["Grandmaster Star Halo", "Global Civik Hall of Honor"],
    gameplayUnlocks: ["+150% CP Multiplier", "VIP Beta Features Access"],
  },
  {
    id: "champion",
    name: "Champion",
    tierNumber: 9,
    icon: "🏆",
    cpRequired: "120,000 CP",
    cpNum: 120000,
    heightPx: 480,
    primaryColor: "#EA580C",
    gradient: "linear-gradient(180deg, #FB923C 0%, #C2410C 100%)",
    badgeBg: "rgba(234, 88, 12, 0.2)",
    shadowColor: "rgba(234, 88, 12, 0.5)",
    title: "National Champion",
    tagline: "Among the top 0.5% most impactful civic changemakers nationwide.",
    bracket: "Legend",
    multiplier: "3.0x CP",
    multiplierVal: 3.0,
    perk: "Top 0.5% leaderboard honors, real physical brass trophy, and summit keynotes",
    typicalQuest: "Keynote national civic technology summit & pioneer city cleanliness AI",
    realWorldImpact: "Sets the national standard for modern, gamified civic leadership",
    authorityUnlocks: ["National Civic Steering Board", "Direct Mayor Briefings"],
    prestigeUnlocks: ["Real Hand-Crafted Brass Trophy", "National Hall of Fame Plaque"],
    gameplayUnlocks: ["+200% CP Multiplier", "Permanent Lifetime Champion Flair"],
  },
  {
    id: "legendary",
    name: "Legendary",
    tierNumber: 10,
    icon: "👑",
    cpRequired: "250,000+ CP",
    cpNum: 250000,
    heightPx: 520,
    primaryColor: "#7C3AED",
    gradient: "linear-gradient(180deg, #F43F5E 0%, #8B5CF6 50%, #FFD700 100%)",
    badgeBg: "rgba(255, 215, 0, 0.25)",
    shadowColor: "rgba(139, 92, 246, 0.6)",
    title: "Immortal Civic Legend",
    tagline: "A titan whose name is permanently etched into the city's civic history.",
    bracket: "Legend",
    multiplier: "4.0x CP",
    multiplierVal: 4.0,
    perk: "Permanent digital monument on City Hall's public media wall & lifetime patron",
    typicalQuest: "Pioneer a lasting municipal preservation policy or regional civic network",
    realWorldImpact: "Leaves a multi-generational legacy of clean, safe, vibrant urban life",
    authorityUnlocks: ["Permanent City Hall Inscription", "Lifetime Citizen Council Chair"],
    prestigeUnlocks: ["Prismatic Rainbow Aura", "Immortal Gold Crest & Museum Entry"],
    gameplayUnlocks: ["+300% CP Multiplier (4.0x)", "Godfather Status on Civik"],
  },
];

type ViewMode = "podium" | "calculator" | "matrix";

export default function RanksSection() {
  const [selectedRank, setSelectedRank] = useState<RankTier>(RANKS[2]); // Default to Gold (Tier 3)
  const [viewMode, setViewMode] = useState<ViewMode>("podium");
  const [activePerkTab, setActivePerkTab] = useState<"authority" | "prestige" | "gameplay">("authority");
  const [unlockedCelebration, setUnlockedCelebration] = useState(false);

  // Calculator State
  const [calcCleanups, setCalcCleanups] = useState(4);
  const [calcPotholes, setCalcPotholes] = useState(2);
  const [calcAnimals, setCalcAnimals] = useState(1);
  const [calcSquads, setCalcSquads] = useState(1);
  const [calcStreakMultiplier, setCalcStreakMultiplier] = useState(1.5);

  const spotlightRef = useRef<HTMLDivElement>(null);

  // Calculator Formulas
  const weeklyBaseCP =
    calcCleanups * 50 + calcPotholes * 100 + calcAnimals * 200 + calcSquads * 400;
  const weeklyTotalCP = Math.round(weeklyBaseCP * calcStreakMultiplier);
  const monthlyTotalCP = weeklyTotalCP * 4;
  const sixMonthsTotalCP = weeklyTotalCP * 26;

  // Find projected tier based on 6 months
  const projectedRank =
    [...RANKS].reverse().find((r) => sixMonthsTotalCP >= r.cpNum) || RANKS[0];

  function handleSelectRank(rank: RankTier) {
    setSelectedRank(rank);
  }

  function handleSimulateUnlock() {
    setUnlockedCelebration(true);

    const card = spotlightRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 28; i++) {
        const p = document.createElement("div");
        p.className = "ranks-confetti-particle";
        const colors = [
          selectedRank.primaryColor,
          "#FFD700",
          "#2563EB",
          "#F43F5E",
          "#10B981",
          "#8B5CF6",
        ];
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `${rect.width / 2}px`;
        p.style.top = `${rect.height / 3}px`;
        const dx = `${(Math.random() - 0.5) * 360}px`;
        const dy = `${(Math.random() - 0.6) * 320}px`;
        p.style.setProperty("--dx", dx);
        p.style.setProperty("--dy", dy);
        card.appendChild(p);
        setTimeout(() => p.remove(), 1100);
      }
    }

    setTimeout(() => {
      setUnlockedCelebration(false);
    }, 2400);
  }

  // Next rank logic
  const currentIndex = RANKS.findIndex((r) => r.id === selectedRank.id);
  const nextRank = currentIndex < RANKS.length - 1 ? RANKS[currentIndex + 1] : null;
  const cpDiffToNext = nextRank ? nextRank.cpNum - selectedRank.cpNum : 0;
  const approxQuestsToNext = nextRank ? Math.ceil(cpDiffToNext / 100) : 0;

  return (
    <section className="ranks-section" id="ranks">
      {/* Header with Theme Badges */}
      <div className="section-header">
        <div className="ranks-badge-hero">
          <span className="ranks-sparkle-dot" />
          <span className="ranks-badge-icon">🏆</span>
          <span>10-Tier Civic Honor System</span>
        </div>
        <h2 className="section-title">
          Climb the Ranks. <span className="highlight-blue">Shape Your City.</span>
        </h2>
        <p className="section-desc">
          Every verified street sweep, pothole fix, and community rescue turns into Civic Points (CP).
          Rise through 10 prestigious tiers to unlock real municipal voting power, custom badges,
          and permanent digital monuments!
        </p>
      </div>

      {/* Mode View Switcher Bar */}
      <div className="ranks-nav-switch-row">
        <div className="ranks-view-switcher" role="tablist" aria-label="Ranks View Modes">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "podium"}
            className={`ranks-tab-btn ${viewMode === "podium" ? "active" : ""}`}
            onClick={() => setViewMode("podium")}
          >
            <span className="ranks-tab-icon">🏟️</span>
            <span>Ascent Podium</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "calculator"}
            className={`ranks-tab-btn ${viewMode === "calculator" ? "active" : ""}`}
            onClick={() => setViewMode("calculator")}
          >
            <span className="ranks-tab-icon">🧮</span>
            <span>Civic Calculator</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={viewMode === "matrix"}
            className={`ranks-tab-btn ${viewMode === "matrix" ? "active" : ""}`}
            onClick={() => setViewMode("matrix")}
          >
            <span className="ranks-tab-icon">📋</span>
            <span>All 10 Tiers Matrix</span>
          </button>
        </div>

        <div className="ranks-current-level-chip">
          <span className="chip-badge" style={{ backgroundColor: selectedRank.badgeBg, color: selectedRank.primaryColor }}>
            Active Tier
          </span>
          <span className="chip-name">
            {selectedRank.icon} {selectedRank.name} (T{selectedRank.tierNumber})
          </span>
          <span className="chip-mult">{selectedRank.multiplier}</span>
        </div>
      </div>

      {/* Horizontal Tier Quick-Selector Strip */}
      <div className="ranks-quick-strip-wrapper">
        <div className="ranks-quick-strip" role="group" aria-label="Quick Tier Selection">
          {RANKS.map((rank) => {
            const isSelected = selectedRank.id === rank.id;
            return (
              <button
                key={rank.id}
                type="button"
                className={`ranks-quick-chip ${isSelected ? "selected" : ""}`}
                style={{
                  borderColor: isSelected ? rank.primaryColor : undefined,
                  boxShadow: isSelected ? `0 6px 16px ${rank.shadowColor}` : undefined,
                }}
                onClick={() => handleSelectRank(rank)}
                aria-label={`Select ${rank.name} Tier`}
              >
                <span className="quick-chip-icon">{rank.icon}</span>
                <span className="quick-chip-name">{rank.name}</span>
                <span className="quick-chip-cp">{rank.cpRequired}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: ASCENT PODIUM (3D BAR GRAPH SKYLINE) */}
      {viewMode === "podium" && (
        <div className="ranks-graph-wrapper">
          <div className="ranks-graph-helper">
            <div className="helper-left">
              <span className="pulse-indicator" />
              <span>Click or tap any tier column to inspect perks &amp; municipal authority</span>
            </div>
            <div className="helper-right">
              <span>Ascending Ladder: <strong>0 CP &rarr; 250,000+ CP</strong></span>
            </div>
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
                    onClick={() => handleSelectRank(rank)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSelectRank(rank);
                      }
                    }}
                    aria-label={`${rank.name} rank, requires ${rank.cpRequired}`}
                  >
                    {/* Active Floating Arrow Marker */}
                    {isSelected && (
                      <div className="rank-active-marker" style={{ borderColor: rank.primaryColor }}>
                        <span>SELECTED</span>
                        <div className="marker-arrow" style={{ borderTopColor: rank.primaryColor }} />
                      </div>
                    )}

                    {/* Floating Tier Emblem Cap */}
                    <div
                      className="rank-top-badge"
                      style={{
                        borderColor: rank.primaryColor,
                        boxShadow: isSelected
                          ? `0 0 24px ${rank.shadowColor}, 0 6px 14px rgba(0,0,0,0.18)`
                          : `0 4px 12px ${rank.shadowColor}`,
                      }}
                    >
                      <span className="rank-emoji">{rank.icon}</span>
                      <span className="rank-tier-num">T{rank.tierNumber}</span>
                    </div>

                    {/* 3D Pillar Body */}
                    <div
                      className="rank-bar-pillar"
                      style={{
                        background: rank.gradient,
                        boxShadow: isSelected
                          ? `0 16px 36px ${rank.shadowColor}, inset 0 2px 5px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(0,0,0,0.2)`
                          : `0 8px 20px ${rank.shadowColor}, inset 0 1px 3px rgba(255,255,255,0.5)`,
                      }}
                    >
                      {/* Top gloss cap highlight */}
                      <div className="pillar-glass-gloss" />

                      {/* Continuous Shimmer on top tiers */}
                      {rank.tierNumber >= 6 && <div className="rank-shimmer" />}

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

            {/* Stepped Axis Roadmap Line */}
            <div className="ranks-graph-baseline">
              <div className="baseline-step start">
                <span className="step-dot" style={{ backgroundColor: "#CD7F32" }} />
                <span>Tier 1: Bronze (Entry)</span>
              </div>
              <div className="baseline-trail">
                <span className="trail-line" />
                <span className="trail-tag">Civic Impact Progression Ladder</span>
                <span className="trail-line" />
              </div>
              <div className="baseline-step end">
                <span className="step-dot" style={{ backgroundColor: "#7C3AED" }} />
                <span>Tier 10: Legendary (Pinnacle)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE CIVIC CALCULATOR */}
      {viewMode === "calculator" && (
        <div className="ranks-calc-wrapper">
          <div className="calc-header-box">
            <div className="calc-badge">🧮 Interactive CP &amp; Tier Projector</div>
            <h3>How Fast Can You Level Up In Civik?</h3>
            <p>
              Estimate your weekly civic deeds. Watch your projected Civic Points multiply
              with your active streak, and see what prestigious rank you’ll reach in 6 months!
            </p>
          </div>

          <div className="calc-body-grid">
            {/* Quest Sliders & Controls */}
            <div className="calc-inputs-card">
              <h4 className="calc-card-title">1. Your Weekly Civic Activities</h4>

              <div className="calc-slider-group">
                <div className="calc-slider-label">
                  <span>🧹 Litter Cleanups (50 CP)</span>
                  <strong>{calcCleanups} / week (+{calcCleanups * 50} CP)</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={calcCleanups}
                  onChange={(e) => setCalcCleanups(Number(e.target.value))}
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-slider-group">
                <div className="calc-slider-label">
                  <span>🕳️ Pothole &amp; Hazard Reports (100 CP)</span>
                  <strong>{calcPotholes} / week (+{calcPotholes * 100} CP)</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={calcPotholes}
                  onChange={(e) => setCalcPotholes(Number(e.target.value))}
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-slider-group">
                <div className="calc-slider-label">
                  <span>🐾 Stray Animal / Tree Planting (200 CP)</span>
                  <strong>{calcAnimals} / week (+{calcAnimals * 200} CP)</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={calcAnimals}
                  onChange={(e) => setCalcAnimals(Number(e.target.value))}
                  className="calc-range-slider"
                />
              </div>

              <div className="calc-slider-group">
                <div className="calc-slider-label">
                  <span>👥 Squad Cleanups Led (400 CP)</span>
                  <strong>{calcSquads} / week (+{calcSquads * 400} CP)</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={calcSquads}
                  onChange={(e) => setCalcSquads(Number(e.target.value))}
                  className="calc-range-slider"
                />
              </div>

              {/* Streak Multiplier Buttons */}
              <div className="calc-streak-picker">
                <span className="streak-picker-label">🔥 Your Active Daily Streak:</span>
                <div className="streak-buttons-row">
                  {[
                    { label: "1.0x (Casual)", val: 1.0 },
                    { label: "1.5x (3-Day Streak)", val: 1.5 },
                    { label: "2.0x (7-Day Streak)", val: 2.0 },
                    { label: "2.5x (Civic Hero)", val: 2.5 },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      className={`streak-btn ${calcStreakMultiplier === s.val ? "active" : ""}`}
                      onClick={() => setCalcStreakMultiplier(s.val)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projected Results Card */}
            <div className="calc-results-card">
              <h4 className="calc-card-title">2. Projected Civic Ascent</h4>

              <div className="calc-stat-hero">
                <div className="calc-big-stat">
                  <span className="stat-num">{weeklyTotalCP.toLocaleString()}</span>
                  <span className="stat-unit">CP / week</span>
                </div>
                <div className="calc-sub-stat">
                  <span>Base: {weeklyBaseCP} CP &bull; Streak Boost: {calcStreakMultiplier}x</span>
                </div>
              </div>

              <div className="calc-projections-row">
                <div className="proj-box">
                  <span className="proj-label">1 Month Est.</span>
                  <span className="proj-val">~{monthlyTotalCP.toLocaleString()} CP</span>
                </div>
                <div className="proj-divider" />
                <div className="proj-box">
                  <span className="proj-label">6 Months Est.</span>
                  <span className="proj-val">~{sixMonthsTotalCP.toLocaleString()} CP</span>
                </div>
              </div>

              {/* Projected Rank Trophy Box */}
              <div
                className="calc-projected-rank-banner"
                style={{
                  borderColor: projectedRank.primaryColor,
                  background: `linear-gradient(135deg, ${projectedRank.badgeBg} 0%, rgba(255,255,255,0.9) 100%)`,
                }}
              >
                <div
                  className="projected-rank-emblem"
                  style={{
                    background: projectedRank.gradient,
                    boxShadow: `0 8px 20px ${projectedRank.shadowColor}`,
                  }}
                >
                  <span>{projectedRank.icon}</span>
                </div>
                <div className="projected-rank-info">
                  <span className="proj-rank-tag" style={{ color: projectedRank.primaryColor }}>
                    Projected Rank in 6 Months
                  </span>
                  <h5>{projectedRank.name} (Tier {projectedRank.tierNumber})</h5>
                  <p>{projectedRank.title} &bull; {projectedRank.multiplier} Multiplier</p>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-coral calc-inspect-btn"
                onClick={() => {
                  setSelectedRank(projectedRank);
                  setViewMode("podium");
                }}
              >
                🔍 Inspect {projectedRank.name} Perks Below
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: COMPREHENSIVE 10-TIER MATRIX */}
      {viewMode === "matrix" && (
        <div className="ranks-matrix-wrapper">
          <div className="matrix-bracket-group">
            <div className="bracket-header">
              <span className="bracket-tag">🌱 Tiers 1 &ndash; 3</span>
              <h4>Grassroots Citizens &bull; Community Scouts</h4>
              <p>Establishing daily neighborhood habits and starting grassroots cleanups.</p>
            </div>
            <div className="matrix-cards-grid">
              {RANKS.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className={`matrix-card ${selectedRank.id === r.id ? "active-card" : ""}`}
                  style={{ borderColor: selectedRank.id === r.id ? r.primaryColor : undefined }}
                  onClick={() => handleSelectRank(r)}
                >
                  <div className="m-card-top">
                    <span className="m-icon">{r.icon}</span>
                    <span className="m-tier">Tier {r.tierNumber}</span>
                  </div>
                  <h5 className="m-name">{r.name}</h5>
                  <span className="m-title">{r.title}</span>
                  <div className="m-stats">
                    <span className="m-cp">{r.cpRequired}</span>
                    <span className="m-mult">{r.multiplier}</span>
                  </div>
                  <p className="m-perk">{r.perk}</p>
                  <button
                    type="button"
                    className="m-btn"
                    style={{
                      background: selectedRank.id === r.id ? r.gradient : undefined,
                      color: selectedRank.id === r.id ? "#fff" : undefined,
                    }}
                  >
                    {selectedRank.id === r.id ? "Selected Tier" : "Inspect Tier"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="matrix-bracket-group">
            <div className="bracket-header">
              <span className="bracket-tag">🛡️ Tiers 4 &ndash; 6</span>
              <h4>Municipal Guardians &bull; Arbiters of Quality</h4>
              <p>Direct communication with city infrastructure departments and peer-reviewing civic proof.</p>
            </div>
            <div className="matrix-cards-grid">
              {RANKS.slice(3, 6).map((r) => (
                <div
                  key={r.id}
                  className={`matrix-card ${selectedRank.id === r.id ? "active-card" : ""}`}
                  style={{ borderColor: selectedRank.id === r.id ? r.primaryColor : undefined }}
                  onClick={() => handleSelectRank(r)}
                >
                  <div className="m-card-top">
                    <span className="m-icon">{r.icon}</span>
                    <span className="m-tier">Tier {r.tierNumber}</span>
                  </div>
                  <h5 className="m-name">{r.name}</h5>
                  <span className="m-title">{r.title}</span>
                  <div className="m-stats">
                    <span className="m-cp">{r.cpRequired}</span>
                    <span className="m-mult">{r.multiplier}</span>
                  </div>
                  <p className="m-perk">{r.perk}</p>
                  <button
                    type="button"
                    className="m-btn"
                    style={{
                      background: selectedRank.id === r.id ? r.gradient : undefined,
                      color: selectedRank.id === r.id ? "#fff" : undefined,
                    }}
                  >
                    {selectedRank.id === r.id ? "Selected Tier" : "Inspect Tier"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="matrix-bracket-group">
            <div className="bracket-header">
              <span className="bracket-tag">👑 Tiers 7 &ndash; 10</span>
              <h4>Civic Masters &bull; Immortal Legends</h4>
              <p>City council steering, national summits, NGO grants, and permanent digital monuments.</p>
            </div>
            <div className="matrix-cards-grid four-col">
              {RANKS.slice(6, 10).map((r) => (
                <div
                  key={r.id}
                  className={`matrix-card ${selectedRank.id === r.id ? "active-card" : ""}`}
                  style={{ borderColor: selectedRank.id === r.id ? r.primaryColor : undefined }}
                  onClick={() => handleSelectRank(r)}
                >
                  <div className="m-card-top">
                    <span className="m-icon">{r.icon}</span>
                    <span className="m-tier">Tier {r.tierNumber}</span>
                  </div>
                  <h5 className="m-name">{r.name}</h5>
                  <span className="m-title">{r.title}</span>
                  <div className="m-stats">
                    <span className="m-cp">{r.cpRequired}</span>
                    <span className="m-mult">{r.multiplier}</span>
                  </div>
                  <p className="m-perk">{r.perk}</p>
                  <button
                    type="button"
                    className="m-btn"
                    style={{
                      background: selectedRank.id === r.id ? r.gradient : undefined,
                      color: selectedRank.id === r.id ? "#fff" : undefined,
                    }}
                  >
                    {selectedRank.id === r.id ? "Selected Tier" : "Inspect Tier"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MASTER SPOTLIGHT CARD (THE EPIC 3D ARENA SHOWCASE) */}
      <div className="rank-spotlight-card" ref={spotlightRef}>
        {/* Top Floating Glow Ambient Accent */}
        <div
          className="spotlight-ambient-glow"
          style={{
            background: `radial-gradient(circle, ${selectedRank.shadowColor} 0%, transparent 70%)`,
          }}
        />

        <div className="spotlight-header">
          {/* Animated 3D Crest Display */}
          <div
            className="spotlight-icon-circle"
            style={{
              background: selectedRank.gradient,
              boxShadow: `0 12px 32px ${selectedRank.shadowColor}`,
            }}
          >
            <div className="crest-ring-pulse" />
            <span className="crest-emoji">{selectedRank.icon}</span>
            <span className="crest-tier-badge">T{selectedRank.tierNumber}</span>
          </div>

          {/* Title & Tagline */}
          <div className="spotlight-title-group">
            <div className="spotlight-tier-tag" style={{ color: selectedRank.primaryColor }}>
              ⭐ TIER {selectedRank.tierNumber} CIVIC STATURE &bull; {selectedRank.bracket.toUpperCase()} BRACKET
            </div>
            <h3 className="spotlight-rank-name">
              {selectedRank.name} &mdash; <em>{selectedRank.title}</em>
            </h3>
            <p className="spotlight-tagline">&ldquo;{selectedRank.tagline}&rdquo;</p>
            <p className="spotlight-perk-desc">{selectedRank.perk}</p>
          </div>

          {/* Stats Badges */}
          <div className="spotlight-stats-pill">
            <div className="stat-item">
              <span className="stat-label">Requirement</span>
              <span className="stat-value" style={{ color: selectedRank.primaryColor }}>
                {selectedRank.cpRequired}
              </span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-label">CP Multiplier</span>
              <span className="stat-value" style={{ color: "#10B981" }}>
                {selectedRank.multiplier}
              </span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-label">Civic Power</span>
              <span className="stat-value" style={{ color: "#F59E0B" }}>
                Level {selectedRank.tierNumber * 3}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Progression Bar to Next Tier */}
        {nextRank && (
          <div className="spotlight-progression-bar-box">
            <div className="prog-bar-header">
              <span className="prog-label">
                Pathway to <strong>{nextRank.icon} {nextRank.name} (Tier {nextRank.tierNumber})</strong>:
              </span>
              <span className="prog-requirement">
                Needs <strong>+{cpDiffToNext.toLocaleString()} CP</strong> (~{approxQuestsToNext} standard quests)
              </span>
            </div>
            <div className="prog-track">
              <div
                className="prog-fill"
                style={{
                  width: `${Math.min(95, Math.max(15, (selectedRank.tierNumber / 10) * 100))}%`,
                  background: selectedRank.gradient,
                }}
              />
            </div>
          </div>
        )}

        {/* Categorized Perks Tabs */}
        <div className="spotlight-perks-section">
          <div className="perks-tab-bar">
            <button
              type="button"
              className={`perk-tab-btn ${activePerkTab === "authority" ? "active" : ""}`}
              onClick={() => setActivePerkTab("authority")}
            >
              🏛️ Municipal Authority ({selectedRank.authorityUnlocks.length})
            </button>
            <button
              type="button"
              className={`perk-tab-btn ${activePerkTab === "prestige" ? "active" : ""}`}
              onClick={() => setActivePerkTab("prestige")}
            >
              💎 Prestige &amp; Collectibles ({selectedRank.prestigeUnlocks.length})
            </button>
            <button
              type="button"
              className={`perk-tab-btn ${activePerkTab === "gameplay" ? "active" : ""}`}
              onClick={() => setActivePerkTab("gameplay")}
            >
              ⚡ Squad &amp; Quest Powers ({selectedRank.gameplayUnlocks.length})
            </button>
          </div>

          <div className="spotlight-unlocks-grid">
            {activePerkTab === "authority" &&
              selectedRank.authorityUnlocks.map((unlock, i) => (
                <div key={i} className="unlock-pill">
                  <span className="unlock-check">🏛️</span>
                  <span>{unlock}</span>
                </div>
              ))}

            {activePerkTab === "prestige" &&
              selectedRank.prestigeUnlocks.map((unlock, i) => (
                <div key={i} className="unlock-pill">
                  <span className="unlock-check">💎</span>
                  <span>{unlock}</span>
                </div>
              ))}

            {activePerkTab === "gameplay" &&
              selectedRank.gameplayUnlocks.map((unlock, i) => (
                <div key={i} className="unlock-pill">
                  <span className="unlock-check">⚡</span>
                  <span>{unlock}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Real Civic Mission Example & Action Footer */}
        <div className="spotlight-footer">
          <div className="spotlight-quest-preview">
            <div className="preview-label">🎯 Typical Mission At This Tier:</div>
            <div className="preview-text">
              &ldquo;{selectedRank.typicalQuest}&rdquo;
            </div>
            <div className="preview-impact">
              🌱 <em>Impact: {selectedRank.realWorldImpact}</em>
            </div>
          </div>

          <div className="spotlight-action-box">
            <button
              type="button"
              className="btn btn-coral simulate-unlock-btn"
              onClick={handleSimulateUnlock}
            >
              {unlockedCelebration ? "🎉 Tier Unlocked!" : `✨ Simulate Tier ${selectedRank.tierNumber} Unlock`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
