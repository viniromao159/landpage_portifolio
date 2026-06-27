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
  "Transformo dados em decisões",
  "Conecto dados e negócios",
  "Resolvo problemas com dados"
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

/* ========================== */
/* CARROSSEL                  */
/* ========================== */
function initCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = Array.from(container.children);
  if (items.length === 0) return;

  function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  let currentIndex = 0;
  let itemsPerView = getItemsPerView();

  container.classList.remove('projetos-grid', 'formacao-grid');
  container.style.position = 'relative';
  container.style.overflow = 'visible';

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('div');
  track.className = 'carousel-track';
  items.forEach(function(item) { track.appendChild(item); });
  viewport.appendChild(track);
  container.appendChild(viewport);

  var prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-btn prev';
  prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevBtn.setAttribute('aria-label', 'Anterior');

  var nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-btn next';
  nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextBtn.setAttribute('aria-label', 'Próximo');

  container.appendChild(prevBtn);
  container.appendChild(nextBtn);

  var dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  container.appendChild(dotsContainer);

  function getMaxIndex() {
    return Math.max(0, items.length - itemsPerView);
  }

  function update() {
    itemsPerView = getItemsPerView();
    var maxIndex = getMaxIndex();
    var isCarousel = items.length > itemsPerView;

    if (!isCarousel) {
      currentIndex = 0;
      track.style.transform = 'translateX(0)';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      dotsContainer.style.display = 'none';
      return;
    }

    dotsContainer.style.display = '';

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    var itemWidthPx = viewport.offsetWidth / itemsPerView;
    track.style.transform = 'translateX(-' + (currentIndex * itemWidthPx) + 'px)';

    prevBtn.style.display = currentIndex === 0 ? 'none' : '';
    nextBtn.style.display = currentIndex >= maxIndex ? 'none' : '';

    dotsContainer.innerHTML = '';
    for (var i = 0; i <= maxIndex; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Posicao ' + (i + 1));
      dot.addEventListener('click', (function(idx) {
        return function() {
          currentIndex = idx;
          update();
        };
      })(i));
      dotsContainer.appendChild(dot);
    }
  }

  prevBtn.addEventListener('click', function() {
    currentIndex--;
    update();
  });

  nextBtn.addEventListener('click', function() {
    currentIndex++;
    update();
  });

  var startX = 0;
  var isDragging = false;

  viewport.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  viewport.addEventListener('touchend', function(e) {
    if (!isDragging) return;
    isDragging = false;
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { currentIndex++; } else { currentIndex--; }
      update();
    }
  }, { passive: true });

  var resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(update, 150);
  });

  update();
}

initCarousel('projectsContainer');
initCarousel('formacaoContainer');
