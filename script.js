/* ==========================================================================
   VAISHNAVI SREE RAVVA - PORTFOLIO JAVASCRIPT
   Modern Interactive Logic: Filtering, Live Search, Detail Modal,
   Form Validation, Theme Toggling & Accessibility
   ========================================================================== */

(function () {
  "use strict";

  /* ==========================================================================
     1. SAMPLE PROJECTS DATASET
     Categories: 'frontend', 'backend', 'other' (AI / Full-Stack / Data)
     ========================================================================== */
  const PROJECTS_DATA = [
    {
      id: "looplabs",
      title: "Looplabs – Personal Safety Web App",
      category: "frontend",
      categoryLabel: "Frontend",
      highlight: "Mobile-First App",
      shortDescription:
        "Comprehensive personal safety web application with emergency SOS triggers, live location tracking, nearby police and hospital discovery, safety check-in timer, and fake-call simulation.",
      fullDescription:
        "Looplabs was engineered as an urgent-response, mobile-first progressive web application to empower personal security. By integrating browser Geolocation APIs with OpenStreetMap and Leaflet, users can pinpoint safe routes, stream their coordinates in real time to emergency contacts, and locate the nearest police stations and hospitals with one click. Also features an incident reporting workflow and quick simulation tools.",
      features: [
        "One-tap Emergency SOS with rapid SMS/WhatsApp broadcast",
        "Interactive Leaflet & OpenStreetMap locator for nearby safety stations",
        "Automated Safety Check-in timer with escalation triggers",
        "Simulated fake-call feature designed for uncomfortable situations",
        "Fully responsive, high-contrast mobile interface with accessible touch targets"
      ],
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Leaflet", "OpenStreetMap", "Geolocation API"],
      demoUrl: "https://vaishnavi-safety.netlify.app",
      githubUrl: "https://github.com/vaish210826/looplabs-safety"
    },
    {
      id: "devpulse",
      title: "DevPulse – Developer Portfolio & Analytics Dashboard",
      category: "frontend",
      categoryLabel: "Frontend",
      highlight: "Modern UI / UX",
      shortDescription:
        "Interactive analytics and showcase dashboard for developers, featuring real-time GitHub repository stats, customizable metric widgets, dark/light themes, and responsive visualizations.",
      fullDescription:
        "DevPulse is an interactive developer portfolio and activity monitor built using modern ES6+ and component-driven UI architecture. It interfaces with GitHub public REST APIs to dynamically pull commit streaks, top languages, stargazers, and repository metrics, presenting them in sleek glassmorphic card widgets with fluid micro-interactions.",
      features: [
        "Live GitHub REST API integration for repository statistics and activity",
        "Custom SVG charting widgets for weekly commit and language distributions",
        "Seamless Dark and Light theme engine with localStorage persistence",
        "Modular dashboard widget layout with drag-and-drop customization",
        "Keyboard-accessible interactive elements and WCAG AA contrast compliance"
      ],
      tech: ["React", "TypeScript", "Vanilla CSS", "GitHub REST API", "Chart.js", "Responsive Design"],
      demoUrl: "https://devpulse-dashboard.vercel.app",
      githubUrl: "https://github.com/vaish210826/devpulse-analytics"
    },
    {
      id: "examace",
      title: "ExamAce – Full-Stack Online Examination Platform",
      category: "backend",
      categoryLabel: "Backend",
      highlight: "Full-Stack & Auth",
      shortDescription:
        "Scalable online examination engine featuring secure JWT authentication, session management, bcrypt password hashing, automated test evaluations, and role-based student/admin dashboards.",
      fullDescription:
        "ExamAce is an end-to-end examination management system architected with Express and Node.js backend services and a relational PostgreSQL database managed via Prisma ORM. It implements strict role-based access control (RBAC), protected API routes, secure password reset token workflows, timed assessment sessions with automatic submission, and detailed result analytics for students and proctors.",
      features: [
        "Stateless JWT authentication with secure HTTP-only cookies and bcrypt hashing",
        "Prisma schema design with relational foreign keys and database transactions",
        "Timed test engine with auto-submit on tab-switch and network retry resilience",
        "Role-Based Access Control (Admin question bank vs. Student testing portal)",
        "Automated grading engine calculating percentile rankings and topic analysis"
      ],
      tech: ["Node.js", "Express", "TypeScript", "Prisma ORM", "PostgreSQL", "JWT", "Bcrypt"],
      demoUrl: "https://examace-portal.onrender.com",
      githubUrl: "https://github.com/vaish210826/examace-backend"
    },
    {
      id: "clipmind",
      title: "ClipMind AI – Video Summarizer & Migration Pipeline",
      category: "backend",
      categoryLabel: "Backend",
      highlight: "Infosys Springboard 7.0",
      shortDescription:
        "Asynchronous FastAPI backend service with Alembic database migrations, unified multi-branch database schemas, SQLAlchemy ORM, and Supabase PostgreSQL integration.",
      fullDescription:
        "Developed during the Infosys Springboard 7.0 Internship. Designed the complete database architecture and models for an AI video summarization system. Solved complex Alembic migration tree branch divergences by merging revision nodes, enforced foreign-key cascade deletes to maintain relational integrity, and exposed high-throughput asynchronous REST endpoints for video transcription queues.",
      features: [
        "Designed normalized relational schemas and database models in SQLAlchemy",
        "Engineered robust Alembic migration pipeline resolving multi-branch conflict chains",
        "Configured Supabase PostgreSQL connection pooling with SSL security",
        "Asynchronous background task queues for long-running video summarization requests",
        "Automated unit and integration test suite with Pytest and Dockerized databases"
      ],
      tech: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Supabase", "Docker", "Pytest"],
      demoUrl: "https://clipmind-api.onrender.com/docs",
      githubUrl: "https://github.com/vaish210826/clipmind-ai-backend"
    },
    {
      id: "neuraldoc",
      title: "NeuralDoc – Medical Image & Report Classifier",
      category: "other",
      categoryLabel: "Other Projects",
      highlight: "AI & Deep Learning",
      shortDescription:
        "Deep learning computer vision and NLP pipeline for classifying chest X-ray radiographs and parsing medical notes, with Grad-CAM visual heatmaps for diagnostic explainability.",
      fullDescription:
        "NeuralDoc bridges deep learning research with clinical utility. Using transfer learning with Convolutional Neural Networks (CNNs) in PyTorch, the model classifies chest radiograph conditions with over 93% validation accuracy. Features an interactive Grad-CAM explainability module that overlays heatmaps showing regions of interest to physicians, alongside a summarization engine for clinical notes.",
      features: [
        "Custom CNN classifier trained using PyTorch with data augmentation pipelines",
        "Grad-CAM visual heatmap generator providing model interpretability and explainability",
        "Integrated NLP pipeline extracting diagnostic terminology from clinical narratives",
        "Interactive web demonstration interface built with FastAPI and modern client UI",
        "Model quantization and optimization for sub-200ms inference on standard CPUs"
      ],
      tech: ["Python", "PyTorch", "OpenCV", "FastAPI", "NumPy", "Pandas", "Transfer Learning"],
      demoUrl: "https://neuraldoc-ai.streamlit.app",
      githubUrl: "https://github.com/vaish210826/neuraldoc-classifier"
    },
    {
      id: "promptflow",
      title: "PromptFlow – Generative AI Prompt Studio",
      category: "other",
      categoryLabel: "Other Projects",
      highlight: "Generative AI Tool",
      shortDescription:
        "Developer utility for authoring, version-controlling, benchmarking, and testing LLM prompt templates across multiple models with token cost and latency telemetry.",
      fullDescription:
        "PromptFlow is a developer workbench created to solve prompt drift and inconsistent LLM responses. It enables engineers to test prompts side-by-side against OpenAI, Anthropic, and Gemini models, track variable substitutions in real time, compare token counts, and benchmark latency and response reproducibility before deploying to production.",
      features: [
        "Side-by-side prompt execution and comparison across multiple AI models",
        "Dynamic prompt templating with variable interpolation syntax",
        "Live token consumption estimator and response latency metrics",
        "Local prompt library with version history and export to Python/JavaScript SDKs",
        "Clean, distraction-free markdown and code viewer with copy-to-clipboard"
      ],
      tech: ["JavaScript (ES6+)", "Node.js", "Generative AI APIs", "CSS Grid", "LocalStorage API"],
      demoUrl: "https://promptflow-studio.vercel.app",
      githubUrl: "https://github.com/vaish210826/promptflow-studio"
    }
  ];

  /* ==========================================================================
     2. DOM ELEMENTS
     ========================================================================== */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const sections = document.querySelectorAll("main section");
  const navAnchors = document.querySelectorAll(".nav-links .nav-link");
  const typingEl = document.getElementById("typing");
  const yearEl = document.getElementById("year");
  const floatingTopBtn = document.getElementById("floatingTopBtn");

  // Projects elements
  const projectsGrid = document.getElementById("projectsGrid");
  const searchInput = document.getElementById("projectSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterStatusText = document.getElementById("filterStatusText");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const noProjectsMessage = document.getElementById("noProjectsMessage");
  const emptyStateDetail = document.getElementById("emptyStateDetail");
  const emptyStateResetBtn = document.getElementById("emptyStateResetBtn");
  const countAll = document.getElementById("countAll");
  const countFrontend = document.getElementById("countFrontend");
  const countBackend = document.getElementById("countBackend");
  const countOther = document.getElementById("countOther");

  // Modal elements
  const projectModal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalTagline = document.getElementById("modalTagline");
  const modalCategory = document.getElementById("modalCategory");
  const modalHighlight = document.getElementById("modalHighlight");
  const modalDescription = document.getElementById("modalDescription");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalTags = document.getElementById("modalTags");
  const modalLiveDemo = document.getElementById("modalLiveDemo");
  const modalGithub = document.getElementById("modalGithub");
  let lastActiveTrigger = null;

  // Contact form elements
  const contactForm = document.getElementById("contactForm");
  const formSuccessCard = document.getElementById("formSuccessCard");
  const sendAnotherBtn = document.getElementById("sendAnotherBtn");
  const submitBtn = document.getElementById("submitBtn");
  const charCounter = document.getElementById("charCounter");
  const messageInput = document.getElementById("message");

  /* ==========================================================================
     3. THEME TOGGLE (Persistent in localStorage)
     ========================================================================== */
  function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      root.setAttribute("data-theme", savedTheme);
    } else {
      root.setAttribute("data-theme", "light");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      localStorage.setItem("theme", current);
    });
  }

  initTheme();

  /* ==========================================================================
     4. MOBILE NAVIGATION (Accessible Hamburger)
     ========================================================================== */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu on anchor click
    navAnchors.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on click outside header
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ==========================================================================
     5. SCROLLSPY & FLOATING BACK-TO-TOP BUTTON
     ========================================================================== */
  function onScroll() {
    const scrollPos = window.scrollY;

    // Highlight current section link
    let currentId = "home";
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop - 140) {
        currentId = sec.id;
      }
    });

    navAnchors.forEach((a) => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === "#" + currentId);
    });

    // Floating top button visibility
    if (floatingTopBtn) {
      if (scrollPos > 350) {
        floatingTopBtn.removeAttribute("hidden");
      } else {
        floatingTopBtn.setAttribute("hidden", "true");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (floatingTopBtn) {
    floatingTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     6. TAGLINE TYPING ANIMATION
     ========================================================================== */
  const tagline = "Curious mind.";
  let typeIndex = 0;

  function typeTagline() {
    if (!typingEl) return;
    typingEl.textContent = tagline.slice(0, ++typeIndex);
    if (typeIndex < tagline.length) {
      setTimeout(typeTagline, 45);
    }
  }

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (typingEl) typingEl.textContent = tagline;
  } else {
    typeTagline();
  }

  /* ==========================================================================
     7. SCROLL REVEAL (IntersectionObserver)
     ========================================================================== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function observeRevealElements() {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
      revealObserver.observe(el);
    });
  }

  observeRevealElements();

  /* ==========================================================================
     8. PROJECTS RENDERING, FILTERING & SEARCH
     ========================================================================== */
  let currentCategory = "all";
  let currentSearchQuery = "";

  // Update category count badges
  function updateCategoryCounts() {
    const total = PROJECTS_DATA.length;
    const frontendCount = PROJECTS_DATA.filter((p) => p.category === "frontend").length;
    const backendCount = PROJECTS_DATA.filter((p) => p.category === "backend").length;
    const otherCount = PROJECTS_DATA.filter((p) => p.category === "other").length;

    if (countAll) countAll.textContent = total;
    if (countFrontend) countFrontend.textContent = frontendCount;
    if (countBackend) countBackend.textContent = backendCount;
    if (countOther) countOther.textContent = otherCount;
  }

  // Generate HTML for a single project card
  function createProjectCardMarkup(project) {
    const techTagsMarkup = project.tech
      .slice(0, 4)
      .map((t) => `<li>${t}</li>`)
      .join("");
    const moreTagsCount = project.tech.length > 4 ? `<li>+${project.tech.length - 4} more</li>` : "";

    return `
      <article class="card project-card reveal visible" data-id="${project.id}" data-category="${project.category}">
        <div class="project-card-header">
          <div class="project-card-badges">
            <span class="category-pill">${project.categoryLabel}</span>
            ${project.highlight ? `<span class="highlight-pill">${project.highlight}</span>` : ""}
          </div>
          <h3 class="project-card-title">${project.title}</h3>
        </div>

        <div class="project-card-body">
          <p class="project-card-desc">${project.shortDescription}</p>
          <ul class="tags" aria-label="Key technologies">
            ${techTagsMarkup}
            ${moreTagsCount}
          </ul>
        </div>

        <div class="project-card-footer">
          <div class="project-card-actions">
            <button type="button" class="btn btn-sage btn-sm view-details-btn" data-id="${project.id}" aria-label="View details for ${project.title}">
              <span>View Details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <a href="${project.githubUrl}" class="btn btn-pill-outline btn-sm" target="_blank" rel="noopener noreferrer" aria-label="View source code for ${project.title}">
              <span>Source Code</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // Filter & Search Evaluation
  function filterProjects() {
    const query = currentSearchQuery.trim().toLowerCase();

    const filtered = PROJECTS_DATA.filter((project) => {
      // Category match
      const categoryMatch = currentCategory === "all" || project.category === currentCategory;

      if (!categoryMatch) return false;

      // Query match (searches title, description, tags, features, and category label)
      if (!query) return true;

      const titleMatch = project.title.toLowerCase().includes(query);
      const descMatch = project.shortDescription.toLowerCase().includes(query) || project.fullDescription.toLowerCase().includes(query);
      const techMatch = project.tech.some((t) => t.toLowerCase().includes(query));
      const categoryLabelMatch = project.categoryLabel.toLowerCase().includes(query);

      return titleMatch || descMatch || techMatch || categoryLabelMatch;
    });

    renderFilteredProjects(filtered, query);
  }

  // Render projects into the grid
  function renderFilteredProjects(projects, query) {
    if (!projectsGrid) return;

    if (projects.length === 0) {
      projectsGrid.innerHTML = "";
      if (noProjectsMessage) {
        noProjectsMessage.removeAttribute("hidden");
        if (emptyStateDetail) {
          const categoryName = currentCategory === "all" ? "" : ` in category "${currentCategory}"`;
          emptyStateDetail.textContent = query
            ? `No projects matched "${query}"${categoryName}. Try broadening your search terms or clearing filters.`
            : `No projects found${categoryName}.`;
        }
      }
    } else {
      if (noProjectsMessage) noProjectsMessage.setAttribute("hidden", "true");
      projectsGrid.innerHTML = projects.map(createProjectCardMarkup).join("");

      // Attach click listeners to "View Details" buttons
      projectsGrid.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const projectId = btn.getAttribute("data-id");
          openProjectModal(projectId, btn);
        });
      });
    }

    // Update status text
    updateFilterStatus(projects.length, query);
  }

  function updateFilterStatus(count, query) {
    if (!filterStatusText) return;

    const total = PROJECTS_DATA.length;
    const catLabel =
      currentCategory === "all"
        ? "All"
        : currentCategory === "frontend"
          ? "Frontend"
          : currentCategory === "backend"
            ? "Backend"
            : "Other Projects";

    let msg = `Showing ${count} of ${total} projects`;
    if (currentCategory !== "all") {
      msg += ` in ${catLabel}`;
    }
    if (query) {
      msg += ` matching "${query}"`;
    }
    filterStatusText.textContent = msg;

    // Show or hide "Reset all filters" button
    const isFiltered = currentCategory !== "all" || query !== "";
    if (resetFiltersBtn) {
      if (isFiltered) {
        resetFiltersBtn.removeAttribute("hidden");
      } else {
        resetFiltersBtn.setAttribute("hidden", "true");
      }
    }
  }

  // Reset all filters to default
  function resetAllFilters() {
    currentCategory = "all";
    currentSearchQuery = "";
    if (searchInput) searchInput.value = "";
    if (clearSearchBtn) clearSearchBtn.setAttribute("hidden", "true");

    filterBtns.forEach((btn) => {
      const isAll = btn.getAttribute("data-category") === "all";
      btn.classList.toggle("active", isAll);
      btn.setAttribute("aria-selected", String(isAll));
    });

    filterProjects();
  }

  // Category buttons click handlers
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      currentCategory = category;

      filterBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });

      filterProjects();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        if (currentSearchQuery.length > 0) {
          clearSearchBtn.removeAttribute("hidden");
        } else {
          clearSearchBtn.setAttribute("hidden", "true");
        }
      }
      filterProjects();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      currentSearchQuery = "";
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      clearSearchBtn.setAttribute("hidden", "true");
      filterProjects();
    });
  }

  // Reset actions
  if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetAllFilters);
  if (emptyStateResetBtn) emptyStateResetBtn.addEventListener("click", resetAllFilters);

  /* ==========================================================================
     9. PROJECT DETAIL MODAL / POPUP
     ========================================================================= */
  function openProjectModal(projectId, triggerEl) {
    const project = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!project || !projectModal) return;

    lastActiveTrigger = triggerEl;

    // Populate modal content
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalTagline) modalTagline.textContent = project.shortDescription;
    if (modalCategory) modalCategory.textContent = project.categoryLabel;

    if (modalHighlight) {
      if (project.highlight) {
        modalHighlight.textContent = project.highlight;
        modalHighlight.removeAttribute("hidden");
      } else {
        modalHighlight.setAttribute("hidden", "true");
      }
    }

    if (modalDescription) modalDescription.textContent = project.fullDescription;

    if (modalFeatures) {
      modalFeatures.innerHTML = project.features.map((feat) => `<li>${feat}</li>`).join("");
    }

    if (modalTags) {
      modalTags.innerHTML = project.tech.map((t) => `<li>${t}</li>`).join("");
    }

    if (modalGithub) {
      modalGithub.setAttribute("href", project.githubUrl);
    }

    // Show modal
    projectModal.removeAttribute("hidden");
    document.body.classList.add("modal-open");

    // Focus close button for accessibility
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 50);
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.setAttribute("hidden", "true");
    document.body.classList.remove("modal-open");

    // Restore focus to last active trigger button
    if (lastActiveTrigger && typeof lastActiveTrigger.focus === "function") {
      lastActiveTrigger.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener("click", closeProjectModal);

  // Close when clicking modal backdrop overlay
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Keyboard accessibility: Escape to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal && !projectModal.hasAttribute("hidden")) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     10. FUNCTIONAL CONTACT FORM WITH REAL-TIME & ON-SUBMIT VALIDATION
     ========================================================================== */
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function validateField(fieldName, value) {
    const trimmed = (value || "").trim();

    switch (fieldName) {
      case "name":
        if (!trimmed) return "Please enter your name.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Name should contain letters and spaces only.";
        return "";

      case "email":
        if (!trimmed) return "Please enter your email address.";
        if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g., name@example.com).";
        return "";

      case "subject":
        if (!trimmed) return "Please select an inquiry topic.";
        return "";

      case "message":
        if (!trimmed) return "Please write your message.";
        if (trimmed.length < 10) return `Message must be at least 10 characters (currently ${trimmed.length}).`;
        return "";

      default:
        return "";
    }
  }

  function setFieldError(fieldId, errorMsg) {
    const errorEl = document.getElementById(fieldId + "Error");
    const inputEl = document.getElementById(fieldId);
    const fieldContainer = document.getElementById("field-" + fieldId);

    if (errorEl) errorEl.textContent = errorMsg;

    if (fieldContainer) {
      if (errorMsg) {
        fieldContainer.classList.add("has-error");
        fieldContainer.classList.remove("is-valid");
        if (inputEl) inputEl.setAttribute("aria-invalid", "true");
      } else {
        fieldContainer.classList.remove("has-error");
        fieldContainer.classList.add("is-valid");
        if (inputEl) inputEl.setAttribute("aria-invalid", "false");
      }
    }
  }

  function clearFieldStatus(fieldId) {
    const errorEl = document.getElementById(fieldId + "Error");
    const inputEl = document.getElementById(fieldId);
    const fieldContainer = document.getElementById("field-" + fieldId);

    if (errorEl) errorEl.textContent = "";
    if (fieldContainer) {
      fieldContainer.classList.remove("has-error");
      fieldContainer.classList.remove("is-valid");
    }
    if (inputEl) inputEl.removeAttribute("aria-invalid");
  }

  // Live validation on blur & input
  ["name", "email", "subject", "message"].forEach((fieldName) => {
    const inputEl = document.getElementById(fieldName);
    if (!inputEl) return;

    // Validate on blur (when user finishes editing)
    inputEl.addEventListener("blur", () => {
      const errorMsg = validateField(fieldName, inputEl.value);
      setFieldError(fieldName, errorMsg);
    });

    // Clear error dynamically as soon as valid on input
    inputEl.addEventListener("input", () => {
      const fieldContainer = document.getElementById("field-" + fieldName);
      if (fieldContainer && fieldContainer.classList.contains("has-error")) {
        const errorMsg = validateField(fieldName, inputEl.value);
        if (!errorMsg) {
          setFieldError(fieldName, "");
        }
      }
    });
  });

  // Message character counter
  if (messageInput && charCounter) {
    messageInput.addEventListener("input", () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 1000`;
      if (len > 900) {
        charCounter.style.color = "var(--accent)";
      } else {
        charCounter.style.color = "var(--text-light)";
      }
    });
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = contactForm.name.value;
      const emailVal = contactForm.email.value;
      const subjectVal = contactForm.subject.value;
      const messageVal = contactForm.message.value;

      // Validate all fields
      const nameErr = validateField("name", nameVal);
      const emailErr = validateField("email", emailVal);
      const subjectErr = validateField("subject", subjectVal);
      const messageErr = validateField("message", messageVal);

      setFieldError("name", nameErr);
      setFieldError("email", emailErr);
      setFieldError("subject", subjectErr);
      setFieldError("message", messageErr);

      // If any field is invalid, focus the first invalid field
      if (nameErr || emailErr || subjectErr || messageErr) {
        if (nameErr) contactForm.name.focus();
        else if (emailErr) contactForm.email.focus();
        else if (subjectErr) contactForm.subject.focus();
        else if (messageErr) contactForm.message.focus();
        return;
      }

      // Valid form: simulate professional asynchronous submission
      const btnText = submitBtn.querySelector(".btn-text");
      const btnSpinner = submitBtn.querySelector(".btn-spinner");
      const btnArrow = submitBtn.querySelector(".btn-arrow");

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = "Sending message...";
      if (btnSpinner) btnSpinner.removeAttribute("hidden");
      if (btnArrow) btnArrow.setAttribute("hidden", "true");

      setTimeout(() => {
        // Mock persistence in localStorage for realistic functionality
        try {
          const storedMessages = JSON.parse(localStorage.getItem("portfolio_inquiries") || "[]");
          storedMessages.push({
            name: nameVal.trim(),
            email: emailVal.trim(),
            subject: subjectVal,
            message: messageVal.trim(),
            date: new Date().toISOString()
          });
          localStorage.setItem("portfolio_inquiries", JSON.stringify(storedMessages));
        } catch (err) {
          console.warn("Could not save to localStorage:", err);
        }

        // Reset submit button state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = "Send Message";
        if (btnSpinner) btnSpinner.setAttribute("hidden", "true");
        if (btnArrow) btnArrow.removeAttribute("hidden");

        // Show personalized confirmation card
        contactForm.setAttribute("hidden", "true");
        if (formSuccessCard) {
          formSuccessCard.removeAttribute("hidden");
          const successText = document.getElementById("successMessageText");
          if (successText) {
            successText.textContent = `Thank you, ${nameVal.trim()}! Your message regarding "${subjectVal}" has been received. I'll get back to you within 24 hours at ${emailVal.trim()}.`;
          }
        }
      }, 700);
    });
  }

  // Send another message button handler
  if (sendAnotherBtn && contactForm) {
    sendAnotherBtn.addEventListener("click", () => {
      contactForm.reset();
      ["name", "email", "subject", "message"].forEach(clearFieldStatus);
      if (charCounter) charCounter.textContent = "0 / 1000";

      if (formSuccessCard) formSuccessCard.setAttribute("hidden", "true");
      contactForm.removeAttribute("hidden");
      contactForm.name.focus();
    });
  }

  /* ==========================================================================
     11. FOOTER YEAR
     ========================================================================== */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     12. URL PARAMS DEEP LINKING & PREVIEW
     ========================================================================== */
  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);

    // Instant scrolling & visibility override (for screenshots & tests)
    if (params.get("instant") === "true") {
      document.documentElement.style.scrollBehavior = "auto";
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    }

    // Section isolate / focus for precise screenshot capture
    const focusSection = params.get("focus");
    if (focusSection === "projects") {
      const homeSec = document.getElementById("home");
      const aboutSec = document.getElementById("about");
      const skillsSec = document.getElementById("skills");
      if (homeSec) homeSec.style.display = "none";
      if (aboutSec) aboutSec.style.display = "none";
      if (skillsSec) skillsSec.style.display = "none";
    } else if (focusSection === "contact") {
      const homeSec = document.getElementById("home");
      const aboutSec = document.getElementById("about");
      const skillsSec = document.getElementById("skills");
      const projectsSec = document.getElementById("projects");
      if (homeSec) homeSec.style.display = "none";
      if (aboutSec) aboutSec.style.display = "none";
      if (skillsSec) skillsSec.style.display = "none";
      if (projectsSec) projectsSec.style.display = "none";
    }

    // Theme parameter (?theme=dark or ?theme=light)
    const urlTheme = params.get("theme");
    if (urlTheme === "dark" || urlTheme === "light") {
      root.setAttribute("data-theme", urlTheme);
      localStorage.setItem("theme", urlTheme);
    }

    // Category parameter (?category=frontend / backend / other)
    const urlCategory = params.get("category");
    if (urlCategory && ["all", "frontend", "backend", "other"].includes(urlCategory)) {
      currentCategory = urlCategory;
      filterBtns.forEach((b) => {
        const active = b.getAttribute("data-category") === urlCategory;
        b.classList.toggle("active", active);
        b.setAttribute("aria-selected", String(active));
      });
    }

    // Search query parameter (?search=React)
    const urlSearch = params.get("search");
    if (urlSearch) {
      currentSearchQuery = urlSearch;
      if (searchInput) searchInput.value = urlSearch;
      if (clearSearchBtn) clearSearchBtn.removeAttribute("hidden");
    }

    // Execute filter with current state
    filterProjects();

    // Section teleportation (?section=projects or ?section=contact)
    const urlSection = params.get("section");
    if (urlSection) {
      const secEl = document.getElementById(urlSection);
      if (secEl) {
        secEl.scrollIntoView({ behavior: "instant" });
      }
    }

    // Modal parameter (?modal=examace or ?modal=looplabs)
    const urlModal = params.get("modal");
    if (urlModal) {
      openProjectModal(urlModal, null);
    }

    // Form parameter for previewing states (?form=error or ?form=success)
    const urlForm = params.get("form");
    if (urlForm === "error" && contactForm) {
      contactForm.dispatchEvent(new Event("submit", { cancelable: true }));
    } else if (urlForm === "success" && contactForm && formSuccessCard) {
      contactForm.setAttribute("hidden", "true");
      formSuccessCard.removeAttribute("hidden");
      const successText = document.getElementById("successMessageText");
      if (successText) {
        successText.textContent = "Thank you, Priya Sharma! Your message regarding 'Web Development Internship' has been received. I'll get back to you within 24 hours at priya.sharma@example.com.";
      }
    }
  }

  /* ==========================================================================
     13. INITIALIZATION
     ========================================================================== */
  updateCategoryCounts();
  handleUrlParams();

})();