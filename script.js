/*  THEME TOGGLE */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* NAV SCROLL EFFECT */
const nav = document.getElementById('nav');

const handleScroll = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });

/* MOBILE NAV */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/*  REVEAL ON SCROLL */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

/*   SMOOTH SCROLL FOR NAV */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/*   HERO PARALLAX (subtle) */
const hero = document.querySelector('.hero');
const orb1 = document.querySelector('.hero__orb--1');
const orb2 = document.querySelector('.hero__orb--2');

if (hero && orb1 && orb2) {
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orb1.style.transform = `translate(${dx * 20}px, ${dy * 20}px)`;
    orb2.style.transform = `translate(${-dx * 15}px, ${-dy * 15}px)`;
  }, { passive: true });
}

/*   ACTIVE NAV HIGHLIGHTING */
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinksList.forEach((link) => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

// total experince counter animation
(function () {
  const totalYears = new Date().getFullYear() - 2008;
  const el = document.getElementById('yearsCounter');
  if (!el) return;
  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    let val = 0;
    const step = totalYears / (1600 / 16);
    const tick = () => {
      val += step;
      if (val < totalYears) { el.textContent = Math.floor(val) + '+'; requestAnimationFrame(tick); }
      else el.textContent = totalYears + '+';
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.5 });
  obs.observe(el);
})();

