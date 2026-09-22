import React from "react";

export default function PillarsSection() {
  return (
    <section className="metrics-section" id="quests">
      <div className="clay-grid-3">
        <div className="clay-card">
          <div className="card-icon-pill" style={{ background: "#DBEAFE", color: "#2563EB" }}>
            📷
          </div>
          <h3>Snap & AI Verify</h3>
          <p>
            No tedious forms or waiting for bureaucrats. Simply snap a live photo of your civic action and our instant
            AI vision validates your impact in seconds.
          </p>
        </div>

        <div className="clay-card">
          <div className="card-icon-pill" style={{ background: "#FEE2E2", color: "#F43F5E" }}>
            🏆
          </div>
          <h3>Community Battles</h3>
          <p>
            Compete with friends, neighbors, or your entire district. Climb weekly tier leagues from Bronze to
            Legendary and earn bragging rights.
          </p>
        </div>

        <div className="clay-card">
          <div className="card-icon-pill" style={{ background: "#FEF3C7", color: "#D97706" }}>
            🎁
          </div>
          <h3>Real Community Perks</h3>
          <p>
            Convert your Civic Points (CP) into exclusive badges, verified civic service hours, and certificates.
          </p>
        </div>
      </div>
    </section>
  );
}
