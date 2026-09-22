import React from "react";

export default function AppGallery() {
  return (
    <section className="app-screens-section" id="screens">
      <div className="section-header">
        <span className="section-tag">Product Tour</span>
        <h2 className="section-title">Crafted for Pure Delight</h2>
        <p className="section-desc">
          Tactile claymorphic design, instant gratification, and social motivation in every pixel.
        </p>
      </div>

      <div className="screens-scroll">
        <div className="screen-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/home_screen.svg" alt="Home Dashboard" />
          <h4>🏠 Daily Quest Hub</h4>
          <p>Fresh missions, streaks, and neighborhood highlights every morning.</p>
        </div>

        <div className="screen-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/map_screen.jpg" alt="Quest Map" />
          <h4>📍 Live GPS Map</h4>
          <p>Explore hot zones, city pins, and filter by your favorite causes.</p>
        </div>

        <div className="screen-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/camera_screen.jpg" alt="AI Verification" />
          <h4>📷 Gemini AI Vision</h4>
          <p>Fraud-proof real-time object detection directly from live camera.</p>
        </div>

        <div className="screen-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/leaderboard_screen.jpg" alt="Leaderboard" />
          <h4>🏆 Leaderboard</h4>
          <p>Weekly podium rankings, tier badges, and inter-city showdowns.</p>
        </div>
      </div>
    </section>
  );
}
