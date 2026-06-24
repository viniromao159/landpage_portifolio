/* ================================================================
   GRID-EFFECT.JS - Grid magnético + Ripple (apenas no Hero)
   ================================================================ */

(function initGridEffect() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'gridCanvas';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  let dots = [];
  let mouse = { x: -9999, y: -9999 };
  let ripples = [];

  const CFG = {
    spacing: 44,
    jitter: 16,
    dotRadius: 2.5,
    repelRadius: 120,
    repelStrength: 16,
    returnSpeed: 0.05,
    damping: 0.82,
    rippleSpeed: 2.5,
    rippleOpacity: 0.25,
    dotOpacity: 0.25,
    dotNearOpacity: 0.5,
    nearRadius: 70,
  };

  function seededRandom(seed) {
    return ((seed * 9301 + 49297) % 233280) / 233280;
  }

  function getHeroRect() {
    return hero.getBoundingClientRect();
  }

  function resize() {
    const rect = getHeroRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    generateDots(rect);
  }

  function generateDots(rect) {
    dots = [];
    const cols = Math.ceil(rect.width / CFG.spacing) + 2;
    const rows = Math.ceil(rect.height / CFG.spacing) + 2;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const seed = y * cols + x;
        const ox = x * CFG.spacing + (seededRandom(seed * 2) - 0.5) * CFG.jitter * 2;
        const oy = y * CFG.spacing + (seededRandom(seed * 2 + 1) - 0.5) * CFG.jitter * 2;
        dots.push({ ox, oy, cx: ox, cy: oy, vx: 0, vy: 0 });
      }
    }
  }

  function getColor() {
    const s = getComputedStyle(document.documentElement);
    return (s.getPropertyValue('--grid-dot-color') || '#4a5578').trim();
  }

  function hexToRgba(hex, a) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function addRipple(x, y) {
    const rect = getHeroRect();
    const rx = x - rect.left;
    const ry = y - rect.top;
    ripples.push({ x: rx, y: ry, radius: 0, opacity: 1 });
    for (const dot of dots) {
      const dx = dot.cx - rx;
      const dy = dot.cy - ry;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160 && dist > 0) {
        const force = (1 - dist / 160) * 22;
        dot.vx += (dx / dist) * force;
        dot.vy += (dy / dist) * force;
      }
    }
  }

  function animate() {
    const rect = getHeroRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    const color = getColor();

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += CFG.rippleSpeed;
      r.opacity -= 0.012;
      if (r.opacity <= 0) { ripples.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRgba(color, r.opacity * CFG.rippleOpacity);
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    for (const dot of dots) {
      const dx = dot.cx - mouse.x;
      const dy = dot.cy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CFG.repelRadius && dist > 0) {
        const force = (1 - dist / CFG.repelRadius) * CFG.repelStrength;
        dot.vx += (dx / dist) * force;
        dot.vy += (dy / dist) * force;
      }

      dot.vx += (dot.ox - dot.cx) * CFG.returnSpeed;
      dot.vy += (dot.oy - dot.cy) * CFG.returnSpeed;
      dot.vx *= CFG.damping;
      dot.vy *= CFG.damping;
      dot.cx += dot.vx;
      dot.cy += dot.vy;

      const opacity = dist < CFG.nearRadius
        ? CFG.dotOpacity + (1 - dist / CFG.nearRadius) * (CFG.dotNearOpacity - CFG.dotOpacity)
        : CFG.dotOpacity;

      ctx.beginPath();
      ctx.arc(dot.cx, dot.cy, CFG.dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(color, opacity);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  document.addEventListener('mousemove', (e) => {
    const rect = getHeroRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.addEventListener('click', (e) => addRipple(e.clientX, e.clientY));
  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      const rect = getHeroRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });
  document.addEventListener('touchstart', (e) => {
    if (e.touches[0]) addRipple(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  resize();
  animate();
})();
