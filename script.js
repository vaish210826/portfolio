/* ========== 1. DARK / LIGHT THEME (saved in localStorage) ========== */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
// Use saved choice, otherwise the visitor's system preference
const saved = localStorage.getItem("theme");
if (saved) root.setAttribute("data-theme", saved);
else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next); // remember the choice
});

/* ========== 2. MOBILE MENU (hamburger) ========== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open); // for screen readers
});
// Close the menu after a link is clicked
navLinks.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

/* ========== 3. ACTIVE LINK HIGHLIGHT ON SCROLL ========== */
const sections = document.querySelectorAll("main section");
const links = document.querySelectorAll(".nav-links a");

function highlightLink() {
  let current = "home";
  sections.forEach(sec => {
    // A section is "current" once its top passes just below the navbar
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", highlightLink);
highlightLink();

/* ========== 4. TYPING ANIMATION FOR TAGLINE ========== */
const tagline = "B.Tech CSE (AI & ML) student | Aspiring Web Developer | Interested in AI-powered web apps";
const typingEl = document.getElementById("typing");
let i = 0;
function type() {
  typingEl.textContent = tagline.slice(0, ++i);
  if (i < tagline.length) setTimeout(type, 35);
}
// Skip animation if the visitor prefers reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) typingEl.textContent = tagline;
else type();

/* ========== 5. SCROLL REVEAL (IntersectionObserver) ========== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ========== 6. CONTACT FORM VALIDATION ========== */
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple email format check

function setError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  document.getElementById(id).classList.toggle("invalid", message !== "");
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // no backend, so stop the real submit
  success.textContent = "";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Each check returns an inline message, or "" when the field is valid
  setError("name", name ? "" : "Please enter your name.");
  setError("email", !email ? "Please enter your email." : emailPattern.test(email) ? "" : "Please enter a valid email address.");
  setError("message", message ? "" : "Please enter a message.");

  if (name && emailPattern.test(email) && message) {
    success.textContent = "Thanks, your message was sent!";
    form.reset();
  }
});

/* ========== 7. FOOTER YEAR ========== */
document.getElementById("year").textContent = new Date().getFullYear();