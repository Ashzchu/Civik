"use client";

import React from "react";

interface DashboardStatsProps {
  cpBalance: number;
  streakDays: number;
  completedCount: number;
  activeCount: number;
}

export default function DashboardStats({
  cpBalance,
  streakDays,
  completedCount,
  activeCount,
}: DashboardStatsProps) {
  return (
    <div className="flow-stats-grid">
      {/* 1. Civic Points */}
      <div className="flow-stat-card">
        <div className="flow-stat-header">
          <span className="flow-stat-label">Civic Points (CP)</span>
          <div className="flow-stat-icon-wrap icon-water">🪷</div>
        </div>
        <div className="flow-stat-value">{cpBalance.toLocaleString()}</div>
        <div className="flow-stat-subtext">
          <span>↑ +180 CP earned this week</span>
        </div>
      </div>

      {/* 2. Flow Streak */}
      <div className="flow-stat-card">
        <div className="flow-stat-header">
          <span className="flow-stat-label">Flow Streak</span>
          <div className="flow-stat-icon-wrap icon-fire">🌊</div>
        </div>
        <div className="flow-stat-value">{streakDays} Days</div>
        <div className="flow-stat-subtext" style={{ color: "#fbbf24" }}>
          <span>⚡ 1.2x Companion XP multiplier</span>
        </div>
      </div>

      {/* 3. Completed Quests */}
      <div className="flow-stat-card">
        <div className="flow-stat-header">
          <span className="flow-stat-label">Sanctuary Quests</span>
          <div className="flow-stat-icon-wrap icon-leaf">📜</div>
        </div>
        <div className="flow-stat-value">
          {completedCount} <span style={{ fontSize: 18, color: "#64748b" }}>/ {completedCount + activeCount}</span>
        </div>
        <div className="flow-stat-subtext" style={{ color: "#34d399" }}>
          <span>✓ {completedCount} AI verified actions</span>
        </div>
      </div>

      {/* 4. Eco Impact */}
      <div className="flow-stat-card">
        <div className="flow-stat-header">
          <span className="flow-stat-label">Eco Footprint</span>
          <div className="flow-stat-icon-wrap icon-gem">🌱</div>
        </div>
        <div className="flow-stat-value">24.5 kg</div>
        <div className="flow-stat-subtext" style={{ color: "#38bdf8" }}>
          <span>💧 620L runoff filtered</span>
        </div>
      </div>
    </div>
  );
}
