/* ================================================================
   SCRIPT.JS - Funcionalidades da página
   ================================================================
   Efeito de digitação | Scroll Reveal | Barra de progresso | Navbar
   ================================================================
   NÃO PRECISA EDITAR NADA AQUI (a menos que queira customizar)
   ================================================================ */

/* ========================== */
/* CONFIGURAÇÕES              */
/* ========================== */
// EDITAR AQUI (opcional): frases do efeito de digitação
const TYPING_PHRASES = [
  "Transformo ideias em código",
  "Crio soluções inteligentes",
  "Desenvolvo o futuro",
];

const TYPING_SPEED = 80;    // ms por caractere
const DELETE_SPEED = 40;    // ms por caractere ao apagar
const PAUSE_BEFORE = 2000;  // pausa antes de começar a apagar
const PAUSE_AFTER = 500;    // pausa antes de digitar a próxima

/* ========================== */
/* EFEITO DE DIGITAÇÃO        */
/* ========================== */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  function type() {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => {
        isDeleting = true;
        type();
      }, PAUSE_BEFORE);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      timeout = setTimeout(type, PAUSE_AFTER);
      return;
    }

    const speed = isDeleting ? DELETE_SPEED : TYPING_SPEED;
    timeout = setTimeout(type, speed);
  }

  type();
})();

/* ========================== */
/* SCROLL REVEAL - animações ao scroll */
/* ========================== */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
})();

/* ========================== */
/* BARRA DE PROGRESSO         */
/* ========================== */
(function initProgressBar() {
  const bar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
})();

/* ========================== */
/* NAVBAR - scroll + mobile   */
/* ========================== */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  // Fundo na navbar ao scrollar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle tema
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    function updateThemeIcon() {
      var theme = document.documentElement.getAttribute('data-theme');
      themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
    updateThemeIcon();
    themeToggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  // Toggle mobile
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });

    // Fecha menu ao clicar num link
    links.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        toggle.classList.remove('active');
        menu.classList.remove('active');
      }
    });
  }
})();
