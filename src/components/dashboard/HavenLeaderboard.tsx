"use client";

import React from "react";

export default function HavenLeaderboard() {
  const topKeepers = [
    { rank: 1, name: "Aria Thorne", companion: "🐈‍⬛", cp: 3840, sector: "Sector 07 • Lagoon", badge: "🥇 Flow Legend" },
    { rank: 2, name: "Kaelen Voss", companion: "🐾", cp: 3410, sector: "Sector 04 • Harbor", badge: "🥈 Haven Elder" },
    { rank: 3, name: "Mira Lin", companion: "🪶", cp: 2980, sector: "Sector 09 • Wetland", badge: "🥉 River Ranger" },
    { rank: 4, name: "Devon Reed", companion: "🐒", cp: 2650, sector: "Sector 02 • Canopy", badge: "Lotus Tier" },
    { rank: 5, name: "Sofia Chen", companion: "🐕", cp: 2420, sector: "Sector 07 • Lagoon", badge: "Lotus Tier" },
  ];

  const sectorRanks = [
    { name: "Sector 07 — The Flooded Haven", cp: 42100, guardians: 348, rank: "1st" },
    { name: "Sector 04 — Emerald Marsh", cp: 38900, guardians: 312, rank: "2nd" },
    { name: "Sector 09 — Misty Basin", cp: 34200, guardians: 280, rank: "3rd" },
    { name: "Sector 02 — High Woodland", cp: 29500, guardians: 245, rank: "4th" },
  ];

  return (
    <div>
      <div className="flow-section-header">
        <div className="flow-section-title-wrap">
          <span style={{ fontSize: 24 }}>🏆</span>
          <h2 className="flow-section-title">The Haven Keepers Leaderboard</h2>
        </div>

        <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 700 }}>
          ⚡ Weekly Sanctuary Reset in 3 Days
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        {/* Top Individual Citizens */}
        <div className="flow-sidebar-card" style={{ marginBottom: 0 }}>
          <h3
            style={{
              fontFamily: "Chelsea Market, cursive",
              fontSize: 18,
              color: "#fff",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🪷</span>
            <span>Top Guardians This Tide</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topKeepers.map((k) => (
              <div
                key={k.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background:
                    k.rank === 1
                      ? "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(254, 240, 138, 0.05))"
                      : "rgba(255, 255, 255, 0.04)",
                  border:
                    k.rank === 1
                      ? "1px solid rgba(245, 158, 11, 0.35)"
                      : "1px solid rgba(255, 255, 255, 0.07)",
                  borderRadius: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      fontFamily: "Chelsea Market, cursive",
                      fontSize: 18,
                      color: k.rank === 1 ? "#fbbf24" : k.rank === 2 ? "#e2e8f0" : k.rank === 3 ? "#d97706" : "#64748b",
                      width: 22,
                      textAlign: "center",
                    }}
                  >
                    #{k.rank}
                  </div>

                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(45, 212, 191, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                  >
                    {k.companion}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800, color: "#fff", fontSize: 14.5 }}>
                      {k.name}
                    </div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8" }}>
                      {k.sector}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Chelsea Market, cursive",
                      fontSize: 16,
                      color: "#fbbf24",
                    }}
                  >
                    {k.cp.toLocaleString()} CP
                  </div>
                  <div style={{ fontSize: 11, color: "#38bdf8", fontWeight: 700 }}>
                    {k.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Rankings */}
        <div className="flow-sidebar-card" style={{ marginBottom: 0 }}>
          <h3
            style={{
              fontFamily: "Chelsea Market, cursive",
              fontSize: 18,
              color: "#fff",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🗺️</span>
            <span>Sector Collective Impact</span>
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sectorRanks.map((s, idx) => (
              <div
                key={idx}
                style={{
                  padding: "14px 16px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontWeight: 800, color: "#fff", fontSize: 13.5 }}>
                    {s.name}
                  </span>
                  <span
                    style={{
                      background: idx === 0 ? "rgba(45, 212, 191, 0.2)" : "rgba(255,255,255,0.08)",
                      border: idx === 0 ? "1px solid #2dd4bf" : "1px solid rgba(255,255,255,0.15)",
                      color: idx === 0 ? "#2dd4bf" : "#94a3b8",
                      fontSize: 11,
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 999,
                    }}
                  >
                    {s.rank}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#94a3b8",
                  }}
                >
                  <span>{s.guardians} Active Guardians</span>
                  <strong style={{ color: "#38bdf8" }}>{s.cp.toLocaleString()} CP</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
