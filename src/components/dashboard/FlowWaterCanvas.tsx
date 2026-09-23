"use client";

import React, { useEffect, useRef } from "react";

export default function FlowWaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);

    // Floating water motes / bioluminescent pollen
    interface Mote {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      phase: number;
    }

    const motes: Mote[] = [];
    const colors = [
      "rgba(45, 212, 191, ",   // Teal
      "rgba(56, 189, 248, ",   // Sky/water blue
      "rgba(254, 240, 138, ",  // Golden sunlight
      "rgba(16, 185, 129, ",   // Emerald leaf
    ];

    for (let i = 0; i < 40; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // gently drift upwards like in the movie
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Water caustics wave lines
    let time = 0;

    function render() {
      if (!ctx) return;
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle wave caustic bands
      ctx.save();
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const yOffset = height * (0.2 + j * 0.3);
        ctx.moveTo(0, yOffset);

        for (let x = 0; x <= width; x += 30) {
          const wave =
            Math.sin(x * 0.003 + time + j) * 20 +
            Math.cos(x * 0.006 - time * 0.8) * 12;
          ctx.lineTo(x, yOffset + wave);
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${0.035 - j * 0.008})`;
        ctx.lineWidth = 18 + j * 12;
        ctx.filter = "blur(8px)";
        ctx.stroke();
      }
      ctx.restore();

      // Draw floating firefly motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.phase += 0.02;

        if (m.y < -10) m.y = height + 10;
        if (m.y > height + 10) m.y = -10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const currentAlpha = m.alpha * (0.6 + 0.4 * Math.sin(m.phase));

        ctx.save();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${m.color}${currentAlpha})`;
        ctx.shadowColor = m.color.includes("254") ? "#fef08a" : "#2dd4bf";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flow-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
