"use client";

import React, { useState } from "react";

export interface QuestItem {
  id: string;
  title: string;
  category: "Waterways" | "Sanctuary" | "Wildlife" | "Greenery" | "Community";
  difficulty: "Gentle" | "Moderate" | "Epic";
  cpReward: number;
  icon: string;
  description: string;
  location: string;
  completed?: boolean;
}

interface ProofModalProps {
  quest: QuestItem | null;
  onClose: () => void;
  onVerified: (questId: string, cpReward: number) => void;
}

export default function ProofModal({ quest, onClose, onVerified }: ProofModalProps) {
  const [photoSelected, setPhotoSelected] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  if (!quest) return null;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoSelected(true);
    }
  }

  function handleUseSampleProof() {
    setPhotoSelected(true);
  }

  function handleStartScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 2400);
  }

  function handleClaim() {
    if (quest) {
      onVerified(quest.id, quest.cpReward);
    }
    onClose();
  }

  return (
    <div
      className="flow-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flow-modal-card">
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.08)",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close"
        >
          ✕
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div
            style={{
              fontSize: 32,
              background: "rgba(20, 184, 166, 0.2)",
              padding: 10,
              borderRadius: 16,
              border: "1px solid rgba(45, 212, 191, 0.3)",
            }}
          >
            {quest.icon}
          </div>
          <div>
            <span
              style={{
                fontSize: 11,
                color: "#38bdf8",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Verify Quest Proof • {quest.category}
            </span>
            <h3 style={{ fontFamily: "Chelsea Market, cursive", fontSize: 20, color: "#fff" }}>
              {quest.title}
            </h3>
          </div>
        </div>

        {/* Proof Preview / Scanner Box */}
        <div className="flow-scanner-box">
          {scanning && <div className="flow-scan-beam" />}

          {verified ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              <div
                style={{
                  fontSize: 52,
                  marginBottom: 8,
                  animation: "bounce 0.6s ease-in-out",
                }}
              >
                ✨🌿✨
              </div>
              <div
                style={{
                  fontFamily: "Chelsea Market, cursive",
                  fontSize: 20,
                  color: "#34d399",
                  marginBottom: 4,
                }}
              >
                AI Verification Succeeded!
              </div>
              <p style={{ fontSize: 13, color: "#94a3b8" }}>
                Confidence: <strong style={{ color: "#2dd4bf" }}>99.2% Valid Civic Action</strong>
              </p>
              <div
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  background: "rgba(245, 158, 11, 0.2)",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  padding: "4px 14px",
                  borderRadius: 999,
                  color: "#fbbf24",
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                +{quest.cpReward} Civic Points Earned!
              </div>
            </div>
          ) : scanning ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 38, marginBottom: 8, animation: "spin 3s linear infinite" }}>
                🧭
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#38bdf8" }}>
                Analyzing Civic Proof...
              </div>
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                Verifying geolocation & photo authenticity via Civik AI
              </p>
            </div>
          ) : photoSelected ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 44, marginBottom: 6 }}>📸</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9" }}>
                Proof Snapshot Ready
              </div>
              <p style={{ fontSize: 12, color: "#38bdf8", marginTop: 4 }}>
                Sector {quest.location} • Timestamp: Just Now
              </p>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "0 20px" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 6 }}>
                Snap or Upload Proof Photo
              </div>
              <p style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
                Show the cleaned riverbank, planted sapling, or community care in action
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <label
                  style={{
                    background: "rgba(45, 212, 191, 0.2)",
                    border: "1px solid rgba(45, 212, 191, 0.4)",
                    color: "#2dd4bf",
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleUseSampleProof}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#cbd5e1",
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Use Demo Camera
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#94a3b8",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          {verified ? (
            <button
              type="button"
              onClick={handleClaim}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                border: "none",
                color: "#ffffff",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
              }}
            >
              Collect +{quest.cpReward} CP 🏆
            </button>
          ) : (
            <button
              type="button"
              disabled={!photoSelected || scanning}
              onClick={handleStartScan}
              style={{
                background:
                  !photoSelected || scanning
                    ? "rgba(255, 255, 255, 0.1)"
                    : "linear-gradient(135deg, #14b8a6, #0284c7)",
                border: "none",
                color: !photoSelected || scanning ? "#64748b" : "#ffffff",
                padding: "10px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 800,
                cursor: !photoSelected || scanning ? "not-allowed" : "pointer",
                boxShadow:
                  !photoSelected || scanning
                    ? "none"
                    : "0 4px 18px rgba(45, 212, 191, 0.35)",
              }}
            >
              {scanning ? "Scanning Proof..." : "Verify with AI 🔍"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
