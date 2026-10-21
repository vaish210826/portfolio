/* =========================================================
   Vaishnavi Sree Ravva — Portfolio script
   Plain JavaScript only (no jQuery, no frameworks).
   Everything is wrapped in small, well-named functions so a
   beginner can read top to bottom.

   Sections in this file:
     1.  Helpers
     2.  Footer year
     3.  Theme toggle (with localStorage memory)
     4.  Reading progress bar
     5.  Sticky navbar frosted-glass on scroll
     6.  Mobile hamburger menu (open / close / close-on-link-click)
     7.  Active nav link highlighting on scroll (IntersectionObserver)
     8.  Rotating hero tagline (slow fade, NOT typewriter)
     9.  Scroll-reveal animations (IntersectionObserver)
     10. Contact form validation (no backend)
     11. Reduced-motion safety net
   ========================================================= */

/* ===== 1. Helpers ===== */
// querySelector shortcut — saves typing
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Respect the user's OS-level reduced-motion setting throughout
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== 2. Footer year =====
   Always shows the current year, so the copyright never goes stale. */
function initFooterYear() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ===== 3. Theme toggle =====
   Light is the default. If the user has chosen dark before, we read
   that choice from localStorage. The toggle button swaps it and
   remembers the new choice. */
function initTheme() {
  const root     = document.documentElement;          // <html>
  const toggle   = $('#themeToggle');
  const icon     = $('.theme-icon');

  // Read saved theme — fall back to the user's OS preference
  const saved    = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial  = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next   = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    // Switch the icon: moon for light mode, sun for dark mode
    icon.textContent = theme === 'dark' ? '☀' : '☾';
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    toggle.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}

/* ===== 4. Reading progress bar =====
   A thin gold bar that fills as the user scrolls down the page. */
function initReadingProgress() {
  const bar = $('#readingProgress');
  if (!bar) return;

  function onScroll() {
    // How far down have we scrolled, as a percentage of the scrollable height?
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled  = window.scrollY;
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== 5. Sticky navbar frosted-glass on scroll =====
   The bar starts transparent; once we scroll past a small threshold
   the .scrolled class is added, which in CSS turns on the blur. */
function initNavbarOnScroll() {
  const navbar = $('#navbar');
  if (!navbar) return;
  function onScroll() {
    if (window.scrollY > 24) navbar.classList.add('scrolled');
    else                     navbar.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== 6. Mobile hamburger menu =====
   - Tap hamburger → menu slides in, hamburger becomes an X.
   - Tap a link inside → menu closes (better UX on mobile).
   - Also closes on Escape key for keyboard users. */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  if (!hamburger || !navLinks) return;

  function open() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
  }
  function close() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  }
  function toggle() {
    navLinks.classList.contains('open') ? close() : open();
  }

  hamburger.addEventListener('click', toggle);
  // Close the menu as soon as the user picks a destination
  $$('.nav-link', navLinks).forEach(link =>
    link.addEventListener('click', close)
  );
  // Close on Escape so keyboard users aren't trapped
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) close();
  });
}

/* ===== 7. Active nav link highlighting on scroll =====
   IntersectionObserver watches each <section>. When one enters the
   viewport, its corresponding nav link gets the .active class
   (a small gold dot underneath, defined in CSS). */
function initScrollSpy() {
  const links    = $$('.nav-link');
  const sections = links
    .map(link => $(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  // 'current' tracks the section id that's currently centered in view
  let currentId = sections[0].id;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        currentId = entry.target.id;
        updateActive();
      }
    }
  }, {
    // The section is considered "active" when its middle is near the
    // middle of the viewport — feels natural rather than jumpy.
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(s => observer.observe(s));

  function updateActive() {
    links.forEach(link =>
      link.classList.toggle('active',
        link.getAttribute('href') === '#' + currentId)
    );
  }
}

/* ===== 8. Rotating hero tagline (slow fade) =====
   The brief specifically asks for a gentle fade, NOT a fast typewriter.
   We fade the current text out, swap it, then fade back in. */
function initTaglineRotator() {
  const tagline = $('#tagline');
  if (!tagline) return;

  const phrases = ['Curious mind.', 'Steady builder.', 'AI & web enthusiast.'];
  let i = 0;

  // Don't rotate at all if the user prefers reduced motion
  if (prefersReducedMotion) return;

  setInterval(() => {
    tagline.classList.add('fade-out');
    // Wait for the fade-out to finish, then swap and fade back in
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      tagline.textContent = phrases[i];
      tagline.classList.remove('fade-out');
    }, 600);   // matches --dur-slow in CSS
  }, 3500);
}

/* ===== 9. Scroll-reveal animations =====
   Wrap elements that should fade up in .reveal. When they enter the
   viewport the observer adds .in. A small stagger is created by
   setting transition-delay per element. */
function initScrollReveal() {
  // Pick the elements we want to animate
  const targets = $$(
    '.section-label, .section-title, .about-text, .about-facts, ' +
    '.glance-strip, .extracurriculars, .quote, ' +
    '.skill-card, .project-card, .contact-info, .contact-form'
  );

  // Add the .reveal class (keeps CSS in charge of the animation)
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // A subtle stagger — every 5th element resets the delay so it
    // never grows too long and feels natural.
    el.style.transitionDelay = `${(i % 5) * 80}ms`;
  });

  if (prefersReducedMotion) {
    // Just show everything immediately
    targets.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);     // only animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ===== 10. Contact form validation (no backend) =====
   - Required fields must not be empty
   - Email must match a simple valid pattern
   - Errors are shown inline under each field
   - On success, prevent the default submit and show a success banner */
function initContactForm() {
  const form      = $('#contactForm');
  if (!form) return;

  const nameEl    = $('#name');
  const emailEl   = $('#email');
  const messageEl = $('#message');
  const successEl = $('#formSuccess');

  // Tiny, readable email pattern — good enough for client-side checks.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper: set or clear an error message next to a field
  function setError(input, message) {
    const errorEl = $('#' + 'error' + capitalize(input.id));
    if (errorEl) errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // Validate each field on blur, so the user gets feedback as they go
  nameEl.addEventListener('blur',    () => setError(nameEl,
    nameEl.value.trim() ? '' : 'Please enter your name.'));
  emailEl.addEventListener('blur',   () => setError(emailEl,
    emailPattern.test(emailEl.value.trim()) ? '' : 'Please enter a valid email address.'));
  messageEl.addEventListener('blur', () => setError(messageEl,
    messageEl.value.trim() ? '' : 'Please write a short message.'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();   // no backend — stop the actual form post

    // Re-run all checks
    const nameOk    = nameEl.value.trim().length > 0;
    const emailOk   = emailPattern.test(emailEl.value.trim());
    const messageOk = messageEl.value.trim().length > 0;

    setError(nameEl,    nameOk    ? '' : 'Please enter your name.');
    setError(emailEl,   emailOk   ? '' : 'Please enter a valid email address.');
    setError(messageEl, messageOk ? '' : 'Please write a short message.');

    if (nameOk && emailOk && messageOk) {
      successEl.hidden = false;
      form.reset();
      // Hide the success banner after a few seconds
      setTimeout(() => { successEl.hidden = true; }, 5000);
    }
  });
}

/* ===== 11. Boot =====
   Wait until the DOM is fully parsed, then start everything.
   DOMContentLoaded fires once the HTML is ready — images may
   still be loading, but our scripts only need the structure. */
document.addEventListener('DOMContentLoaded', () => {
  initFooterYear();
  initTheme();
  initReadingProgress();
  initNavbarOnScroll();
  initMobileMenu();
  initScrollSpy();
  initTaglineRotator();
  initScrollReveal();
  initContactForm();
});
