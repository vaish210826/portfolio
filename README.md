# Vaishnavi Sree Ravva – Web Developer Portfolio

A modern, responsive, and accessible personal developer portfolio built with semantic **HTML5**, modern **CSS3** (custom properties, flexbox, CSS grid, and glassmorphism), and vanilla **JavaScript (ES6+)**.

---

## 🌟 Key Features Implemented

### 1. 📂 Project Filtering by Category
- **Category Filter Tabs:** Projects can be filtered by **All Projects**, **Frontend**, **Backend**, and **Other Projects** (AI & ML / Generative AI tools).
- **Dynamic Count Badges:** Each tab displays a live counter showing the exact number of matching projects.
- **Visual Feedback:** High-contrast active tab state with smooth micro-animations.

### 2. 🔍 Real-Time Project Search
- **Instant Search:** Filters projects as the user types by matching across titles, short descriptions, full architecture narratives, technology tags, and category labels.
- **Clear Action (`✕`):** One-click clear button resets the search field instantly.
- **Status Indicator:** Displays dynamic counts (e.g., *"Showing 2 of 6 projects in Frontend matching 'React'"*).
- **Graceful Empty State:** When no projects match, an empty state UI appears with an explanation and a **"Reset Search & Filters"** button.

### 3. 🪟 Interactive Project Detail Modal
- **Rich Popup Dialog:** Clicking **"View Details"** on any project opens an accessible modal with a frosted glass backdrop (`backdrop-filter: blur(8px)`).
- **Complete Project Metadata:**
  - Category pill and highlight badge (e.g., *Infosys Springboard 7.0*, *Mobile-First App*)
  - Problem statement, architectural overview, and design decisions
  - Key highlights checklist with custom checkmarks
  - Technology stack pill tags
  - Direct links to **Live Demo** and **Source Code (GitHub)**
- **Full Accessibility:**
  - Closes via header close button (`✕`), footer Close button, clicking outside the overlay, or pressing the `Escape` key.
  - Automatically restores focus to the triggering button upon dismissal.
  - Locks background page scrolling (`body.modal-open`).

### 4. 📬 Functional Contact Form with Real-Time Validation
- **Form Fields:**
  - **Full Name:** Validates required state, minimum 2 characters, and alphabetic formatting.
  - **Email Address:** Validates required state and strict RFC email format regex.
  - **Inquiry Topic:** Required select dropdown covering Internship Opportunities, Collaborations, and General Questions.
  - **Your Message:** Validates required state, minimum 10 characters, and includes a live character counter (`0 / 1000`).
- **Interactive Feedback:**
  - Validates on `blur` (leaving field) without premature nagging while typing.
  - Clears error styling dynamically on `input` as soon as the user corrects the input.
  - Visual indicators: green border on valid fields; red border and descriptive error text on invalid fields.
- **Asynchronous Submission Experience:**
  - Submit button transitions into an interactive loading spinner (`"Sending message..."`).
  - Upon successful validation, renders a personalized confirmation banner:
    > *"Thank you, [Name]! Your message regarding '[Topic]' has been received. I'll get back to you within 24 hours at [Email]."*
  - Includes a **"Send Another Message"** reset button.
  - Simulates persistence by storing inquiries in browser `localStorage`.

### 5. 🎨 UI Polish, Dark/Light Mode & Responsiveness
- **Theme Toggle:** Persistent dark/light theme switch stored in `localStorage` and adhering to `prefers-color-scheme`.
- **Glassmorphic Navigation:** Sticky navbar with blur backdrop and active scrollspy link indicators.
- **Mobile Navigation:** Responsive hamburger menu with smooth slide-down animation and touch targets.
- **Floating Back-to-Top Button:** Appears automatically when scrolling past 350px.
- **URL Deep Linking:** Supports URL search parameters for sharing and testing states:
  - `?category=frontend`
  - `?search=React`
  - `?modal=examace`
  - `?theme=light` or `?theme=dark`

---

## 📸 Screenshots Showcase

| View | Screenshot |
| :--- | :--- |
| **Desktop Hero & Navbar** | ![Desktop Hero](screenshots/01-desktop-hero.png) |
| **Category Filtering** | ![Category Filtering](screenshots/02-projects-filtering.png) |
| **Live Search** | ![Live Search](screenshots/03-projects-search.png) |
| **Search Empty State** | ![Empty State](screenshots/04-projects-empty-state.png) |
| **Project Detail Modal** | ![Project Modal](screenshots/05-project-modal.png) |
| **Contact Form Validation** | ![Contact Validation](screenshots/06-contact-validation.png) |
| **Contact Submission Success** | ![Contact Success](screenshots/07-contact-success.png) |
| **Mobile Viewport (390px)** | ![Mobile View](screenshots/08-mobile-view.png) |
| **Light Mode Theme** | ![Light Mode](screenshots/09-light-mode.png) |

---

## 📂 Project Structure

```text
portfolio/
├── index.html           # Semantic HTML5 structure and accessible templates
├── style.css            # Design tokens, responsive grid, themes & modal styling
├── script.js            # Modular JavaScript: data, filters, search, modal & validation
├── capture_shots.ps1    # Automated screenshot generation script using headless Chrome
├── README.md            # Comprehensive documentation and feature guide
└── screenshots/         # Showcase screenshots for submission
    ├── 01-desktop-hero.png
    ├── 02-projects-filtering.png
    ├── 03-projects-search.png
    ├── 04-projects-empty-state.png
    ├── 05-project-modal.png
    ├── 06-contact-validation.png
    ├── 07-contact-success.png
    ├── 08-mobile-view.png
    └── 09-light-mode.png
```

---

## 🚀 How to Run Locally

You can run the portfolio locally without installing extra dependencies:

### Option 1: Python HTTP Server (Recommended)
```bash
# In the portfolio directory:
python -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your web browser.

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: Direct Browser Launch
Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🧪 Verification & Testing Completed

1. **Category Filter Testing:** Verified clicking *All Projects*, *Frontend*, *Backend*, and *Other Projects* filters cards correctly and updates counter badges.
2. **Search Testing:** Verified keyword queries (e.g., `React`, `Python`, `Leaflet`) filter cards immediately, case-insensitively, and clearing restores cards.
3. **Empty State Testing:** Verified unmatched searches trigger the empty state card and the *"Reset Search & Filters"* button restores full state.
4. **Modal Testing:** Verified clicking *"View Details"* opens the dialog with complete overview, features, and tags. Verified closing via `X`, footer close button, backdrop click, and `Escape` key.
5. **Form Validation Testing:** Verified empty submission highlights all fields with specific error messages; verified invalid email detection (`test@`); verified message length enforcement; verified successful submission displays confirmation card and loading state.
6. **Theme Testing:** Verified dark and light mode toggle updates colors smoothly and persists across reloads.
7. **Responsiveness Testing:** Verified layout across desktop (1280px), tablet (768px), and mobile (390px) screen viewports.

---

## 📤 GitHub Submission Instructions

To push this codebase to your GitHub repository:

```bash
# 1. Initialize remote (replace with your repository URL)
git remote add origin https://github.com/vaish210826/portfolio.git

# 2. Rename branch to main if needed
git branch -M main

# 3. Push source code and screenshots
git push -u origin main
```
