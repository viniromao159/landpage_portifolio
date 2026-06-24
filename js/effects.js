/* ================================================================
   EFFECTS.JS - Efeitos visuais interativos
   ================================================================
   Spotlight do mouse | 3D Tilt nos cards | Botões magnéticos | Parallax
   ================================================================
   NÃO PRECISA EDITAR NADA AQUI
   ================================================================ */

/* ========================== */
/* SPOTLIGHT - glow seguindo o mouse */
/* ========================== */
(function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function updateSpotlight() {
    spotlight.style.transform = `translate(${mouseX - 350}px, ${mouseY - 350}px)`;
    requestAnimationFrame(updateSpotlight);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  requestAnimationFrame(updateSpotlight);
})();

/* ========================== */
/* 3D TILT - inclinação nos cards ao passar o mouse */
/* ========================== */
function initTilt() {
  const cards = document.querySelectorAll('.tilt-card:not([data-tilt])');

  cards.forEach((card) => {
    card.setAttribute('data-tilt', 'true');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* ========================== */
/* BOTÕES MAGNÉTICOS - seguem o mouse */
/* ========================== */
function initMagnetic() {
  const elements = document.querySelectorAll('.magnetic:not([data-magnetic])');

  elements.forEach((el) => {
    el.setAttribute('data-magnetic', 'true');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ========================== */
/* PARALLAX - elementos flutuantes no hero */
/* ========================== */
(function initParallax() {
  const shapes = document.querySelectorAll('.floating-shape');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    shapes.forEach((shape) => {
      const speed = parseFloat(shape.dataset.speed) || 0.2;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
})();

/* ========================== */
/* INICIALIZAÇÃO              */
/* ========================== */
document.addEventListener('DOMContentLoaded', () => {
  initTilt();
  initMagnetic();
});

/* Expoe as funções para serem chamadas após render dinâmico */
window.initTilt = initTilt;
window.initMagnetic = initMagnetic;
