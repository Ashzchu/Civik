import React from "react";

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <span className="section-tag">Simple &amp; Engaging</span>
        <h2 className="section-title">How Civik Works in 3 Easy Steps</h2>
        <p className="section-desc">
          We reimagined civic responsibility as an exhilarating mobile adventure that rewards you
          for making your community shine.
        </p>
      </div>

      <div className="steps-container">
        {/* Step 1 */}
        <div className="step-box">
          <div className="step-number">1</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/map_screen.jpg" className="step-img-preview" alt="Find Quests on Map" />
          <h3>1. Discover Quests</h3>
          <p>
            Open the interactive GPS quest map to find nearby cleanups, broken streetlights, or community
            tree-plantings in need of attention.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <div className="step-number">2</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/camera_screen.jpg" className="step-img-preview" alt="AI Camera Verification" />
          <h3>2. Snap &amp; Verify</h3>
          <p>
            Use the live Civik camera. Gemini AI analyzes the scene in real time with geo-fencing to confirm the civic
            task was genuinely done.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-box">
          <div className="step-number">3</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/Landing%20Page/success_screen.jpg" className="step-img-preview" alt="Earn CP & Celebrate" />
          <h3>3. Claim &amp; Celebrate</h3>
          <p>
            Trigger the satisfying dopamine celebration, earn your CP coins, keep your flame streak burning, and push
            your city to #1.
          </p>
        </div>
      </div>
    </section>
  );
}
