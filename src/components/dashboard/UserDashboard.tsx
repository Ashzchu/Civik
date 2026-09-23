"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import FlowWaterCanvas from "./FlowWaterCanvas";
import DashboardHeader, { CompanionInfo } from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import QuestBoard from "./QuestBoard";
import CompanionSanctuary, { COMPANIONS_LIST } from "./CompanionSanctuary";
import HavenLeaderboard from "./HavenLeaderboard";
import ProofModal, { QuestItem } from "./ProofModal";

const INITIAL_QUESTS: QuestItem[] = [
  {
    id: "q-1",
    title: "Clear Riverbank Debris & Driftwood",
    category: "Waterways",
    difficulty: "Gentle",
    cpReward: 120,
    icon: "🌊",
    description:
      "Remove plastic bottles, snagged nets, and non-natural debris along the flooded canal path.",
    location: "Canal Walkway 4",
    completed: false,
  },
  {
    id: "q-2",
    title: "Nurture Community Rain Garden",
    category: "Sanctuary",
    difficulty: "Moderate",
    cpReward: 95,
    icon: "🌿",
    description:
      "Weed around native water-iris and ensure the bio-retention soil swale is absorbing runoff cleanly.",
    location: "Sector 7 Meadow",
    completed: true,
  },
  {
    id: "q-3",
    title: "Log Pollinator & Urban Wildlife Sightings",
    category: "Wildlife",
    difficulty: "Gentle",
    cpReward: 80,
    icon: "🐾",
    description:
      "Spot and photograph urban waterbirds, amphibians, or native bees in the floating flower beds.",
    location: "Willow Marsh",
    completed: false,
  },
  {
    id: "q-4",
    title: "Storm Drain Leaf & Plastic Clearing",
    category: "Waterways",
    difficulty: "Moderate",
    cpReward: 110,
    icon: "💧",
    description:
      "Clear blocked culverts and street drains to prevent stagnant flooding before the evening rain.",
    location: "Market Basin",
    completed: false,
  },
  {
    id: "q-5",
    title: "Urban Composting Drop-Off",
    category: "Greenery",
    difficulty: "Gentle",
    cpReward: 75,
    icon: "🍃",
    description:
      "Deliver sorted kitchen organics to the community aerobic compost tumblers.",
    location: "Civic Eco Hub",
    completed: false,
  },
  {
    id: "q-6",
    title: "Ancient Stone Basin Restoration",
    category: "Sanctuary",
    difficulty: "Epic",
    cpReward: 150,
    icon: "🏛️",
    description:
      "Clear moss overgrowth around the public freshwater fountain and test water clarity.",
    location: "Old Plaza",
    completed: false,
  },
];

interface UserDashboardProps {
  onToggleViewLanding: () => void;
}

export default function UserDashboard({ onToggleViewLanding }: UserDashboardProps) {
  const { user, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<"sanctuary" | "quests" | "companions" | "leaderboard">("sanctuary");
  const [cpBalance, setCpBalance] = useState<number>(1280);
  const [streakDays] = useState<number>(5);
  const [quests, setQuests] = useState<QuestItem[]>(INITIAL_QUESTS);
  const [activeCompanion, setActiveCompanion] = useState<CompanionInfo>(COMPANIONS_LIST[0]); // Default: The Black Cat
  const [activeQuestForProof, setActiveQuestForProof] = useState<QuestItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const completedCount = quests.filter((q) => q.completed).length;
  const activeCount = quests.length - completedCount;

  function handleVerifiedQuest(questId: string, cpReward: number) {
    setQuests((prev) =>
      prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
    );
    setCpBalance((prev) => prev + cpReward);
    setNotification(`🎉 Quest Verified! +${cpReward} CP added to your Sanctuary`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }

  const effectiveUser = user || {
    s_no: 1,
    email: "megatasticgaming@gmail.com",
    name: "Dante",
  };

  const userInitial = (effectiveUser.name?.[0] || effectiveUser.email?.[0] || "D").toUpperCase();
  const displayName = effectiveUser.name || effectiveUser.email?.split("@")[0] || "Dante";

  return (
    <div className="flow-dashboard-root">
      {/* Serene Ambient Water & Motes Canvas */}
      <FlowWaterCanvas />

      {/* Floating Notification */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            background: "linear-gradient(135deg, rgba(20, 184, 166, 0.95), rgba(2, 132, 199, 0.95))",
            color: "#ffffff",
            padding: "12px 24px",
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 14,
            boxShadow: "0 10px 30px rgba(4, 18, 26, 0.5), 0 0 20px rgba(45, 212, 191, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            animation: "bounce 0.4s ease-out",
          }}
        >
          {notification}
        </div>
      )}

      {/* Navigation Topbar */}
      <div className="flow-topbar-wrapper">
        <header className="flow-topbar">
          <div className="flow-logo-group">
            <div className="flow-logo-badge">🛶</div>
            <div>
              <div className="flow-logo-title">Civik</div>
              <div className="flow-logo-subtitle">Flow Sanctuary</div>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className="flow-nav-tabs" aria-label="Dashboard Tabs">
            <button
              type="button"
              className={`flow-tab-btn ${activeTab === "sanctuary" ? "active" : ""}`}
              onClick={() => setActiveTab("sanctuary")}
            >
              <span>🌊</span>
              <span>Sanctuary</span>
            </button>
            <button
              type="button"
              className={`flow-tab-btn ${activeTab === "quests" ? "active" : ""}`}
              onClick={() => setActiveTab("quests")}
            >
              <span>📜</span>
              <span>Quests</span>
            </button>
            <button
              type="button"
              className={`flow-tab-btn ${activeTab === "companions" ? "active" : ""}`}
              onClick={() => setActiveTab("companions")}
            >
              <span>🐾</span>
              <span>Companions</span>
            </button>
            <button
              type="button"
              className={`flow-tab-btn ${activeTab === "leaderboard" ? "active" : ""}`}
              onClick={() => setActiveTab("leaderboard")}
            >
              <span>🏆</span>
              <span>Leaderboard</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flow-topbar-actions">
            {/* CP Badge */}
            <div className="flow-cp-pill" title="Your Civic Points">
              <span>🪷</span>
              <span>{cpBalance.toLocaleString()} CP</span>
            </div>

            {/* User Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "4px 10px 4px 6px",
                borderRadius: 999,
              }}
              title={user?.email || ""}
            >
              <div className="flow-user-avatar-badge">{userInitial}</div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#f1f5f9",
                  maxWidth: 110,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {displayName}
              </span>
            </div>

            {/* Toggle View Landing Button */}
            <button
              type="button"
              className="flow-btn-view-toggle"
              onClick={onToggleViewLanding}
              title="Explore the public landing page"
            >
              <span>🌐</span>
              <span>Landing Page</span>
            </button>

            {/* Sign Out */}
            <button
              type="button"
              className="flow-btn-signout"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="flow-content-container">
        {activeTab === "sanctuary" && (
          <>
            {/* Sanctuary Hero Banner */}
            <DashboardHeader
              user={effectiveUser}
              cpBalance={cpBalance}
              activeCompanion={activeCompanion}
              onExploreQuests={() => setActiveTab("quests")}
              onOpenCompanions={() => setActiveTab("companions")}
            />

            {/* 4 Stat Widgets */}
            <DashboardStats
              cpBalance={cpBalance}
              streakDays={streakDays}
              completedCount={completedCount}
              activeCount={activeCount}
            />

            {/* 2-Column Layout: Quests & Live Activity Feed */}
            <div className="flow-dashboard-layout">
              {/* Left Column: Active Quests */}
              <div>
                <QuestBoard
                  quests={quests}
                  onOpenProofModal={(q) => setActiveQuestForProof(q)}
                />
              </div>

              {/* Right Column: Flow Community Pulse */}
              <aside>
                <div className="flow-sidebar-card">
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
                    <span>🕊️</span>
                    <span>Sanctuary Activity Pulse</span>
                  </h3>

                  <div className="flow-activity-list">
                    <div className="flow-activity-item">
                      <div className="flow-activity-avatar">🐈‍⬛</div>
                      <div>
                        <div className="flow-activity-text">
                          <strong>Kaelen V.</strong> verified +120 CP in Canal Walkway 4
                        </div>
                        <div className="flow-activity-time">4 mins ago • Sector 07</div>
                      </div>
                    </div>

                    <div className="flow-activity-item">
                      <div className="flow-activity-avatar">🐾</div>
                      <div>
                        <div className="flow-activity-text">
                          <strong>Elena S.</strong> watered 12 rainwater saplings
                        </div>
                        <div className="flow-activity-time">18 mins ago • Sector 04</div>
                      </div>
                    </div>

                    <div className="flow-activity-item">
                      <div className="flow-activity-avatar">🪶</div>
                      <div>
                        <div className="flow-activity-text">
                          <strong>Mira L.</strong> logged 4 endangered blue dragonflies
                        </div>
                        <div className="flow-activity-time">42 mins ago • Sector 09</div>
                      </div>
                    </div>

                    <div className="flow-activity-item">
                      <div className="flow-activity-avatar">🐕</div>
                      <div>
                        <div className="flow-activity-text">
                          <strong>Devon R.</strong> cleared 3.5kg storm drain plastics
                        </div>
                        <div className="flow-activity-time">1 hour ago • Sector 07</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Companion Perk Widget */}
                <div
                  className="flow-sidebar-card"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(2, 132, 199, 0.1) 100%)",
                    border: "1px solid rgba(45, 212, 191, 0.35)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{activeCompanion.avatar}</span>
                    <div>
                      <h4 style={{ fontFamily: "Chelsea Market, cursive", fontSize: 16, color: "#fff" }}>
                        {activeCompanion.name}&apos;s Guidance
                      </h4>
                      <span style={{ fontSize: 11.5, color: "#38bdf8", fontWeight: 700 }}>
                        {activeCompanion.species}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5, marginBottom: 12 }}>
                    &ldquo;{activeCompanion.description}&rdquo;
                  </p>

                  <div
                    style={{
                      background: "rgba(5, 18, 24, 0.6)",
                      border: "1px solid rgba(245, 158, 11, 0.4)",
                      padding: "8px 12px",
                      borderRadius: 12,
                      color: "#fbbf24",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    ⚡ Active Buff: {activeCompanion.buff}
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}

        {activeTab === "quests" && (
          <QuestBoard
            quests={quests}
            onOpenProofModal={(q) => setActiveQuestForProof(q)}
          />
        )}

        {activeTab === "companions" && (
          <CompanionSanctuary
            activeCompanionId={activeCompanion.id}
            onSelectCompanion={(comp) => {
              setActiveCompanion(comp);
              setNotification(`🐾 ${comp.name} is now your active spirit guide!`);
              setTimeout(() => setNotification(null), 3000);
            }}
          />
        )}

        {activeTab === "leaderboard" && <HavenLeaderboard />}
      </main>

      {/* Proof Submission AI Scanner Modal */}
      <ProofModal
        quest={activeQuestForProof}
        onClose={() => setActiveQuestForProof(null)}
        onVerified={handleVerifiedQuest}
      />
    </div>
  );
}
