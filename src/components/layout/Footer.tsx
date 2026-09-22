import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="logo-group">
          <div className="logo-badge" style={{ width: "36px", height: "36px", fontSize: "18px" }}>
            🏛️
          </div>
          <div className="logo-text" style={{ fontSize: "20px" }}>
            Civik<span>.</span>
          </div>
        </div>

        <div className="footer-copy">
          © 2026 Civik Inc. All rights reserved. Built with love for clean cities and vibrant communities.
        </div>

        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Cities</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </footer>
  );
}
