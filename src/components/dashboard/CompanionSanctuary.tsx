"use client";

import React from "react";
import { CompanionInfo } from "./DashboardHeader";

export const COMPANIONS_LIST: CompanionInfo[] = [
  {
    id: "cat",
    name: "Shadow",
    species: "The Solitary Black Cat",
    avatar: "🐈‍⬛",
    role: "Vigilant Scout",
    buff: "+15% CP on River & Waterway Quests",
    description:
      "Resourceful and observant. Guides you through flooded alleys and hidden city streams.",
  },
  {
    id: "capybara",
    name: "Baro",
    species: "The Zen Capybara",
    avatar: "🐾",
    role: "Sanctuary Anchor",
    buff: "+20% CP on Community & Group Care",
    description:
      "Unshakable calm and harmony. Brings neighbors together in quiet solidarity.",
  },
  {
    id: "lemur",
    name: "Milo",
    species: "The Curious Ring-Tailed Lemur",
    avatar: "🐒",
    role: "Trinket & Eco Collector",
    buff: "+25% CP on Recycling & Cleanup Quests",
    description:
      "Playful scavenger who sees value in what others cast away. Master of zero-waste.",
  },
  {
    id: "crane",
    name: "Astra",
    species: "The Soaring White Crane",
    avatar: "🪶",
    role: "Highland Visionary",
    buff: "+15% CP on Urban Flora & Trees",
    description:
      "Graceful sentinel surveying the canopy. Spotting rooftop gardens and clean air havens.",
  },
  {
    id: "dog",
    name: "Kona",
    species: "The Spirited Retriever",
    avatar: "🐕",
    role: "Heart of the Sanctuary",
    buff: "+10% Boost to Flow Streaks",
    description:
      "Boundless loyalty and energy. Reminds us that saving the city is a joyful adventure.",
  },
];

interface CompanionSanctuaryProps {
  activeCompanionId: string;
  onSelectCompanion: (companion: CompanionInfo) => void;
}

export default function CompanionSanctuary({
  activeCompanionId,
  onSelectCompanion,
}: CompanionSanctuaryProps) {
  return (
    <div>
      <div className="flow-section-header">
        <div className="flow-section-title-wrap">
          <span style={{ fontSize: 24 }}>🛶</span>
          <h2 className="flow-section-title">The Sanctuary Boat Companions</h2>
        </div>

        <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
          Inspired by the animal crew of Flow (2024)
        </span>
      </div>

      <p style={{ fontSize: 14.5, color: "#94a3b8", marginBottom: 24, maxWidth: 800 }}>
        Every citizen journeys with an animal companion on their civic boat. Each
        companion bestows specialized civic bonuses and guides your actions through
        the rising tides.
      </p>

      <div className="flow-companion-grid">
        {COMPANIONS_LIST.map((comp) => {
          const isSelected = comp.id === activeCompanionId;

          return (
            <div
              key={comp.id}
              className={`flow-companion-card ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectCompanion(comp)}
            >
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(56, 189, 248, 0.25)",
                    border: "1px solid #38bdf8",
                    color: "#38bdf8",
                    fontSize: 11,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 999,
                    textTransform: "uppercase",
                  }}
                >
                  Active Guide
                </div>
              )}

              <div className="flow-companion-icon-wrap">{comp.avatar}</div>

              <h3
                style={{
                  fontFamily: "Chelsea Market, cursive",
                  fontSize: 20,
                  color: "#ffffff",
                  marginBottom: 2,
                }}
              >
                {comp.name}
              </h3>

              <div
                style={{
                  fontSize: 12,
                  color: "#38bdf8",
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {comp.species} • {comp.role}
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  lineHeight: 1.5,
                  marginBottom: 16,
                  minHeight: 58,
                }}
              >
                {comp.description}
              </p>

              <div
                style={{
                  background: "rgba(5, 18, 24, 0.65)",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  borderRadius: 14,
                  padding: "8px 12px",
                  fontSize: 12,
                  color: "#fbbf24",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                ⚡ {comp.buff}
              </div>

              <button
                type="button"
                style={{
                  width: "100%",
                  background: isSelected
                    ? "linear-gradient(135deg, #0284c7, #14b8a6)"
                    : "rgba(255, 255, 255, 0.08)",
                  border: isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  padding: "9px 0",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {isSelected ? "Current Guide ✓" : "Embark with " + comp.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
