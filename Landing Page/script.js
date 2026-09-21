let currentCP = 2450;

function simulateQuest(name, reward) {
  currentCP += reward;
  const cpEl = document.getElementById('cpCount');
  const statusEl = document.getElementById('simStatus');
  const card = document.getElementById('simCard');

  // Bouncy animation
  if (cpEl) {
    cpEl.style.transform = 'scale(1.25)';
    cpEl.style.color = '#10B981';
    cpEl.innerText = currentCP.toLocaleString();

    setTimeout(() => {
      cpEl.style.transform = 'scale(1)';
      cpEl.style.color = '#F59E0B';
    }, 300);
  }

  if (statusEl) {
    statusEl.innerHTML = `🎉 Verified: <strong>${name}</strong>! +${reward} CP`;
  }

  // Pop confetti
  if (card) {
    const rect = card.getBoundingClientRect();
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      const colors = ['#2563EB', '#F43F5E', '#10B981', '#FFD700', '#60A5FA'];
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = (rect.width / 2) + 'px';
      p.style.top = (rect.height / 2) + 'px';
      const dx = (Math.random() - 0.5) * 260 + 'px';
      const dy = (Math.random() - 0.5) * 200 + 'px';
      p.style.setProperty('--dx', dx);
      p.style.setProperty('--dy', dy);
      card.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }
}

// ===== Smooth Collision-Free Background Emoji Engine =====
let isGenerating = false;
let lastWidth = window.innerWidth;

function generateBackgroundEmojis() {
  if (isGenerating) return;
  const container = document.getElementById('bg-emoji-layer');
  if (!container) return;

  isGenerating = true;
  container.innerHTML = '';

  const emojis = ['🍃', '🌱', '🐦', '🦋', '🌿', '🐾', '🌸', '⭐', '🐝', '🍂', '🌻', '🐿️', '⚡', '🏆', '💎', '🎨', '🚲', '🌳', '🌟', '✨', '🍀', '🌼', '🕊️'];

  // Target visual obstacle elements (text nodes, cards, buttons, images, badges, section blocks)
  const obstacleElements = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, span, strong, a, button, input, label, img, .clay-card, .floating-badge, .phone-screen img, .step-box, .screen-card, .simulator-counter-card, .cta-banner, .hero-badge, .btn, .navbar, .footer-inner, .avatar-stack, .hero-proof, .card-icon-pill, .step-number, footer'
  );

  const scrollX = window.scrollX || window.pageXOffset || 0;
  const scrollY = window.scrollY || window.pageYOffset || 0;

  const obstacles = [];
  const padding = 22; // Generous 22px safety clearance around all text and cards

  obstacleElements.forEach(el => {
    if (el.classList.contains('bg-decor-wrap') || el.classList.contains('bg-decor-inner') || el.id === 'bg-emoji-layer') return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

    obstacles.push({
      left: rect.left + scrollX - padding,
      right: rect.right + scrollX + padding,
      top: rect.top + scrollY - padding,
      bottom: rect.bottom + scrollY + padding
    });
  });

  const docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

  const placedEmojis = [];
  const emojiRadius = 22;
  const minEmojiDist = 95; // Sparser spacing to drastically reduce density below

  const stepX = 60;
  const stepY = 68;

  let emojiIdx = 0;
  const fragment = document.createDocumentFragment();

  for (let y = 40; y < docHeight - 40; y += stepY) {
    for (let x = 15; x < docWidth - 25; x += stepX) {
      // Organic grid jitter
      const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const jitterX = (hash - Math.floor(hash) - 0.5) * 24;
      const jitterY = (Math.cos(x + y) * 0.5) * 24;

      const posX = x + jitterX;
      const posY = y + jitterY;

      if (posX < 10 || posX > docWidth - 25) continue;

      const emojiBox = {
        left: posX - emojiRadius,
        right: posX + emojiRadius,
        top: posY - emojiRadius,
        bottom: posY + emojiRadius
      };

      // Check collision with text or box obstacles
      let collides = false;
      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        if (!(emojiBox.right < obs.left ||
          emojiBox.left > obs.right ||
          emojiBox.bottom < obs.top ||
          emojiBox.top > obs.bottom)) {
          collides = true;
          break;
        }
      }
      if (collides) continue;

      // Check collision with other placed emojis
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

      // Outer position & subtle parallax wrapper
      const wrap = document.createElement('div');
      wrap.className = 'bg-decor-wrap';
      wrap.style.left = `${posX}px`;
      wrap.style.top = `${posY}px`;

      // Ultra-subtle speed (-0.015 to +0.015) to prevent vertical drift overlaps when scrolling down
      const speed = (((emojiIdx * 17) % 25 - 12) * 0.0012).toFixed(4);
      wrap.dataset.speed = speed;

      // Inner continuous CSS float element
      const inner = document.createElement('div');
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

let hasLoaded = false;
function initOnce() {
  if (hasLoaded) return;
  hasLoaded = true;
  generateBackgroundEmojis();
}

// ===== Camera 3D Tilt Tracking for Phone Mockup =====
function initCameraTilt() {
  const heroVisual = document.querySelector('.hero-visual');
  const phoneWrapper = document.querySelector('.phone-mockup-wrapper');
  if (!heroVisual || !phoneWrapper) return;

  const defaultRotateY = -6;
  const defaultRotateX = 3;
  const maxTilt = 15; // Maximum angle of rotation

  let isHovered = false;
  let targetRotateX = defaultRotateX;
  let targetRotateY = defaultRotateY;
  let currentRotateX = defaultRotateX;
  let currentRotateY = defaultRotateY;
  let animFrameId = null;

  let cachedCenterX = 0;
  let cachedCenterY = 0;
  let boundWidth = 200;
  let boundHeight = 300;

  function updateBounds() {
    const rect = phoneWrapper.getBoundingClientRect();
    cachedCenterX = rect.left + rect.width / 2;
    cachedCenterY = rect.top + rect.height / 2;
    boundWidth = Math.max(rect.width * 0.9, 180);
    boundHeight = Math.max(rect.height * 0.9, 260);
  }

  function updateCameraTilt() {
    // Smooth camera gimbal lerp for fluid tracking
    const ease = 0.12;
    currentRotateX += (targetRotateX - currentRotateX) * ease;
    currentRotateY += (targetRotateY - currentRotateY) * ease;

    phoneWrapper.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;

    const diffX = Math.abs(targetRotateX - currentRotateX);
    const diffY = Math.abs(targetRotateY - currentRotateY);

    if (isHovered || diffX > 0.02 || diffY > 0.02) {
      animFrameId = requestAnimationFrame(updateCameraTilt);
    } else {
      currentRotateX = targetRotateX;
      currentRotateY = targetRotateY;
      phoneWrapper.style.transform = `perspective(1000px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg)`;
      animFrameId = null;
    }
  }

  function handleMouseMove(e) {
    const deltaX = e.clientX - cachedCenterX;
    const deltaY = e.clientY - cachedCenterY;

    const normX = Math.max(-1, Math.min(1, deltaX / boundWidth));
    const normY = Math.max(-1, Math.min(1, deltaY / boundHeight));

    // Camera tilt towards cursor:
    // Cursor to right (normX > 0) -> pan right (rotateY > 0)
    // Cursor to left (normX < 0) -> pan left (rotateY < 0)
    // Cursor above (normY < 0) -> tilt up (rotateX > 0)
    // Cursor below (normY > 0) -> tilt down (rotateX < 0)
    targetRotateX = -normY * maxTilt;
    targetRotateY = normX * maxTilt;

    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateCameraTilt);
    }
  }

  heroVisual.addEventListener('mouseenter', (e) => {
    isHovered = true;
    updateBounds();
    handleMouseMove(e);
  });

  heroVisual.addEventListener('mousemove', handleMouseMove);

  heroVisual.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotateX = defaultRotateX;
    targetRotateY = defaultRotateY;
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(updateCameraTilt);
    }
  });

  window.addEventListener('scroll', () => {
    if (isHovered) updateBounds();
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateBounds();
  });

  updateBounds();
  window.addEventListener('load', updateBounds);
}

// ===== Smooth Anchor Scrolling =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

// ===== Auth Modal Handler =====
function initAuthModal() {
  const modal = document.getElementById('auth-modal');
  const closeBtn = document.getElementById('closeAuthModal');
  const signInBtns = document.querySelectorAll('a, button');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  signInBtns.forEach(btn => {
    const text = btn.innerText ? btn.innerText.trim().toLowerCase() : '';
    if (text === 'sign in' || text === 'signin') {
      btn.addEventListener('click', openModal);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initOnce, 150);
  window.addEventListener('load', initOnce);
  initCameraTilt();
  initSmoothScroll();
  initAuthModal();

  // Smooth RequestAnimationFrame Parallax Scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const decors = document.querySelectorAll('.bg-decor-wrap');
        decors.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0;
          const yOffset = scrollY * speed;
          el.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Debounced window resize (only on width change)
  let resizeTimeout;
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    if (Math.abs(newWidth - lastWidth) > 40) {
      lastWidth = newWidth;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateBackgroundEmojis, 300);
    }
  });
});
