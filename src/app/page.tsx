"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PillarsSection from "@/components/landing/PillarsSection";
import QuestSimulator from "@/components/landing/QuestSimulator";
import HowItWorks from "@/components/landing/HowItWorks";
import RanksSection from "@/components/landing/RanksSection";
import AppGallery from "@/components/landing/AppGallery";
import DownloadCta from "@/components/landing/DownloadCta";
import Footer from "@/components/layout/Footer";
import AuthModal from "@/components/auth/AuthModal";
import BackgroundEmojiLayer from "@/components/layout/BackgroundEmojiLayer";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  function handleOpenAuth(mode: "signin" | "signup") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function handleCloseAuth() {
    setAuthOpen(false);
  }

  function handleSwitchAuthMode(mode: "signin" | "signup") {
    setAuthMode(mode);
  }

  return (
    <main>
      {/* Background Emoji Ambient Layer */}
      <BackgroundEmojiLayer />

      <div className="container">
        {/* Navbar */}
        <Navbar onOpenAuth={handleOpenAuth} />

        {/* Hero Section */}
        <HeroSection />

        {/* 3 Core Pillars */}
        <PillarsSection />

        {/* Interactive Live Quest Simulator */}
        <QuestSimulator />

        {/* 3-Step Walkthrough */}
        <HowItWorks />

        {/* 10-Tier Civic Ranks Ascending Bar Graph */}
        <RanksSection />

        {/* App Screens Carousel */}
        <AppGallery />

        {/* Download App CTA Banner */}
        <DownloadCta />
      </div>

      {/* Footer */}
      <Footer />

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={handleCloseAuth}
        onSwitchMode={handleSwitchAuthMode}
      />
    </main>
  );
}
