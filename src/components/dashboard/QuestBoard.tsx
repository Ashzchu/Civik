"use client";

import React, { useState } from "react";
import { QuestItem } from "./ProofModal";

interface QuestBoardProps {
  quests: QuestItem[];
  onOpenProofModal: (quest: QuestItem) => void;
}

export default function QuestBoard({ quests, onOpenProofModal }: QuestBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Waterways", "Sanctuary", "Wildlife", "Greenery"];

  const filteredQuests =
    selectedCategory === "All"
      ? quests
      : quests.filter((q) => q.category === selectedCategory);

  return (
    <div>
      <div className="flow-section-header">
        <div className="flow-section-title-wrap">
          <span style={{ fontSize: 24 }}>🌊</span>
          <h2 className="flow-section-title">Active Civic Streams</h2>
        </div>

        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
          {filteredQuests.length} Quests Available
        </span>
      </div>

      {/* Category Pills */}
      <div className="flow-category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`flow-category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "All"
              ? "🌐 All Streams"
              : cat === "Waterways"
              ? "💧 Waterways"
              : cat === "Sanctuary"
              ? "🏛️ Sanctuary"
              : cat === "Wildlife"
              ? "🐾 Wildlife"
              : "🌿 Greenery"}
          </button>
        ))}
      </div>

      {/* Quest Cards Stream */}
      <div className="flow-quests-list">
        {filteredQuests.map((quest) => (
          <div key={quest.id} className="flow-quest-card">
            <div className="flow-quest-icon-badge">{quest.icon}</div>

            <div className="flow-quest-content">
              <div className="flow-quest-meta-row">
                <span className="flow-quest-cat-tag">{quest.category}</span>
                <span className="flow-quest-diff">⭐ {quest.difficulty}</span>
                <span style={{ fontSize: 11.5, color: "#64748b" }}>
                  📍 {quest.location}
                </span>
              </div>

              <h3 className="flow-quest-title">{quest.title}</h3>
              <p className="flow-quest-desc">{quest.description}</p>
            </div>

            <div className="flow-quest-actions">
              <div className="flow-quest-reward-pill">
                <span>+{quest.cpReward} CP</span>
              </div>

              {quest.completed ? (
                <div className="flow-btn-quest-completed">
                  <span>✓ Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="flow-btn-quest-action"
                  onClick={() => onOpenProofModal(quest)}
                >
                  <span>Submit Proof</span>
                  <span>📸</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
