import React from "react";

export default function DownloadCta() {
  return (
    <section className="cta-banner" id="download">
      <h2>Ready to Make Your City Epic?</h2>
      <p>
        Download Civik today, team up with your community, and turn everyday positive actions into a thrilling
        competition.
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-coral" style={{ fontSize: "18px", padding: "16px 36px" }}>
          📲 Download for iOS
        </button>
        <button type="button" className="btn btn-primary" style={{ fontSize: "18px", padding: "16px 36px" }}>
          🤖 Download for Android
        </button>
      </div>
    </section>
  );
}
