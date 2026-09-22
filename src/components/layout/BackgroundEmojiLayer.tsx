"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundEmojiLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isGenerating = false;
    const emojis = [
      "🍃", "🌱", "🐦", "🦋", "🌿", "🐾", "🌸", "⭐", "🐝", "🍂", "🌻", "🐿️",
      "⚡", "🏆", "💎", "🎨", "🚲", "🌳", "🌟", "✨", "🍀", "🌼", "🕊️",
    ];

    function generateBackgroundEmojis() {
      if (isGenerating || !container) return;
      isGenerating = true;
      container.innerHTML = "";

      const obstacleElements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, p, span, strong, a, button, input, label, img, .clay-card, .floating-badge, .phone-screen img, .step-box, .screen-card, .simulator-counter-card, .cta-banner, .hero-badge, .btn, .navbar, .footer-inner, .avatar-stack, .hero-proof, .card-icon-pill, .step-number, footer, .modal-card"
      );

      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const padding = 22;
      const obstacles: Array<{ left: number; right: number; top: number; bottom: number }> = [];

      obstacleElements.forEach((el) => {
        if (
          el.classList.contains("bg-decor-wrap") ||
          el.classList.contains("bg-decor-inner") ||
          el.id === "bg-emoji-layer"
        )
          return;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0")
          return;

        obstacles.push({
          left: rect.left + scrollX - padding,
          right: rect.right + scrollX + padding,
          top: rect.top + scrollY - padding,
          bottom: rect.bottom + scrollY + padding,
        });
      });

      const docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      const placedEmojis: Array<{ x: number; y: number }> = [];
      const emojiRadius = 22;
      const minEmojiDist = 95;
      const stepX = 60;
      const stepY = 68;

      let emojiIdx = 0;
      const fragment = document.createDocumentFragment();

      for (let y = 40; y < docHeight - 40; y += stepY) {
        for (let x = 15; x < docWidth - 25; x += stepX) {
          const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const jitterX = (hash - Math.floor(hash) - 0.5) * 24;
          const jitterY = Math.cos(x + y) * 0.5 * 24;

          const posX = x + jitterX;
          const posY = y + jitterY;

          if (posX < 10 || posX > docWidth - 25) continue;

          const emojiBox = {
            left: posX - emojiRadius,
            right: posX + emojiRadius,
            top: posY - emojiRadius,
            bottom: posY + emojiRadius,
          };

          let collides = false;
          for (let i = 0; i < obstacles.length; i++) {
            const obs = obstacles[i];
            if (
              !(
                emojiBox.right < obs.left ||
                emojiBox.left > obs.right ||
                emojiBox.bottom < obs.top ||
                emojiBox.top > obs.bottom
              )
            ) {
              collides = true;
              break;
            }
          }
          if (collides) continue;

          for (let i = 0; i < placedEmojis.length; i++) {
            const pe = placedEmojis[i];
            const dx = posX - pe.x;
            const dy = posY - pe.y;
            if (Math.sqrt(dx * dx + dy * dy) < minEmojiDist) {
              collides = true;
              break;
            }
          }
          if (collides) continue;

          placedEmojis.push({ x: posX, y: posY });

          const wrap = document.createElement("div");
          wrap.className = "bg-decor-wrap";
          wrap.style.left = `${posX}px`;
          wrap.style.top = `${posY}px`;

          const speed = (((emojiIdx * 17) % 25 - 12) * 0.0012).toFixed(4);
          wrap.dataset.speed = speed;

          const inner = document.createElement("div");
          const animClass = `float-anim-${(emojiIdx % 4) + 1}`;
          inner.className = `bg-decor-inner ${animClass}`;
          inner.innerText = emojis[emojiIdx % emojis.length];

          const size = 32 + ((emojiIdx * 7) % 14);
          const opacity = (0.35 + ((emojiIdx * 11) % 12) * 0.01).toFixed(2);

          inner.style.fontSize = `${size}px`;
          inner.style.opacity = opacity;
          inner.style.animationDelay = `${((emojiIdx * 0.4) % 3.5).toFixed(2)}s`;

          wrap.appendChild(inner);
          fragment.appendChild(wrap);

          emojiIdx++;
        }
      }

      container.appendChild(fragment);
      isGenerating = false;
    }

    const timer = setTimeout(generateBackgroundEmojis, 250);

    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const decors = container?.querySelectorAll<HTMLElement>(".bg-decor-wrap");
          decors?.forEach((el) => {
            const speed = parseFloat(el.dataset.speed || "0");
            const yOffset = scrollY * speed;
            el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    let lastWidth = window.innerWidth;
    let resizeTimer: NodeJS.Timeout;
    function handleResize() {
      const newWidth = window.innerWidth;
      if (Math.abs(newWidth - lastWidth) > 40) {
        lastWidth = newWidth;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(generateBackgroundEmojis, 300);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div id="bg-emoji-layer" ref={containerRef} aria-hidden="true" />;
}
