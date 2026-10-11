/**
 * Sohan Pal Portfolio - Core Interactive Logic
 * Plain Vanilla JS, no dependencies
 */

// Configurable Form Endpoint (e.g. Formspree / Web3Forms / Formkeep)
// To connect to your backend, simply replace this URL:
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xyzyqazb";

/**
 * Creative Stack Data
 * Easy to add, remove, or modify items
 */
const creativeStackData = [
  {
    category: "DESIGN",
    chips: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"]
  },
  {
    category: "VISUAL",
    chips: ["Branding", "Typography", "Editorial", "Illustration"]
  },
  {
    category: "TOOLS",
    chips: ["Figma", "Illustrator", "Photoshop", "Framer", "Premiere Pro"]
  },
  {
    category: "CODE",
    chips: ["HTML / CSS", "Tailwind", "React (basics)", "Framer Motion"]
  }
];

/**
 * Testimonials Data
 * Easy to add or edit pinned notes
 */
const testimonialsData = [
  {
    quote: "Sohan has the rare ability to turn fuzzy product ideas into interfaces that immediately feel obvious. A joy to collaborate with.",
    author: "Maya Iyer",
    org: "Foglamp Studio"
  },
  {
    quote: "As the Convenor of the IEI Students' Chapter (CSE) at AOT, I highly recommend Sohan. He is an exceptionally hardworking and creative designer who consistently elevated our chapter's visual presence. Sohan brings fresh ideas to every project and delivers outstanding results with strong dedication. He is a valuable asset to any team.",
    author: "Sukrit Deb",
    org: "Convenor, SCCSE"
  },
  {
    quote: "Calm, considerate and opinionated when it matters. Easily one of the most delightful people I've worked with in the past two years.",
    author: "Shramana Bandyopadhyay",
    org: "Core member, SCCSE"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initLiveClocks();
  initProjectsRender();
  initScrollFeatures();
  initScrollSpy();
  initAudioToggle();
  initCopyEmail();
  initContactForm();
  initScrollAnimations();
  initCustomCursor();
});

/* ==========================================================================
   1. LIVE CLOCKS (Top Menu & Hero Widget)
   ========================================================================== */
function initLiveClocks() {
  const headerClock = document.getElementById("headerClock");
  const widgetClock = document.getElementById("widgetClock");

  function updateTime() {
    const now = new Date();

    // Format date: "Sun Oct 11"
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();

    // 12-hour format with AM/PM
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    const hoursStr = String(hours).padStart(2, "0");

    // Header clock update
    if (headerClock) {
      headerClock.innerHTML = `
        <span class="clock-date">${dayName} ${monthName} ${dateNum}</span>
        <span class="clock-dot">·</span>
        <span class="clock-time">${hoursStr}:${minutes} ${ampm}</span>
      `;
    }

    // Hero widget large clock update
    if (widgetClock) {
      widgetClock.innerHTML = `
        <span class="widget-time-digits">${hoursStr}:${minutes}</span>
        <span class="widget-time-period">${ampm}</span>
      `;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. DYNAMIC PROJECTS RENDER FROM projects.js
   ========================================================================== */
function initProjectsRender() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  if (typeof projects === "undefined" || !Array.isArray(projects)) {
    console.warn("Projects data not found in projects.js");
    return;
  }

  container.innerHTML = "";

  projects.forEach((proj, index) => {
    const row = document.createElement("article");
    row.className = "project-row";
    row.id = `project-${proj.id || index}`;

    const tagsString = Array.isArray(proj.tags) ? proj.tags.join(" · ") : proj.tags || "";

    row.innerHTML = `
      <div class="project-media-frame">
        <div class="media-window-bar">
          <span class="mini-dot"></span>
          <span class="mini-dot"></span>
          <span class="mini-dot"></span>
        </div>
        <div class="project-img-wrapper">
          <img src="${proj.image}" alt="${proj.title} Preview" class="project-thumbnail" loading="lazy">
        </div>
      </div>

      <div class="project-info">
        <div class="project-category">${proj.category}</div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-tags">${tagsString}</div>
        <a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="project-action-link">
          Open project <span>↗</span>
        </a>
      </div>
    `;

    container.appendChild(row);
  });
}

/* ==========================================================================
   3. SCROLL PROGRESS & SMOOTH NAVIGATION
   ========================================================================== */
function initScrollFeatures() {
  const progressBar = document.getElementById("scrollProgressBar");

  function updateProgressBar() {
    if (!progressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  window.addEventListener("scroll", updateProgressBar, { passive: true });
  updateProgressBar();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ==========================================================================
   4. SCROLL-SPY NAVIGATION TRACKING
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const centerDisplay = document.getElementById("currentSectionDisplay");

  const sectionTitles = {
    home: "Home",
    work: "Work",
    about: "About",
    stack: "Stack",
    testimonials: "Testimonials",
    contact: "Contact"
  };

  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let currentId = "home";

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    // Check if bottom of page reached
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
      currentId = "contact";
    }

    navLinks.forEach(link => {
      if (link.getAttribute("data-section") === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (centerDisplay && sectionTitles[currentId]) {
      centerDisplay.textContent = sectionTitles[currentId];
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   5. AUDIO NOW-PLAYING TOGGLE
   ========================================================================== */
function initAudioToggle() {
  const toggleBtn = document.getElementById("btnAudioToggle");
  const audioIcon = document.getElementById("audioIcon");
  let isPlaying = true;

  if (!toggleBtn || !audioIcon) return;

  toggleBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      // Pause icon (two bars)
      audioIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16" rx="1"/>
        <rect x="14" y="4" width="4" height="16" rx="1"/>
      `;
      toggleBtn.setAttribute("title", "Pause");
    } else {
      // Play icon (triangle)
      audioIcon.innerHTML = `
        <polygon points="6 4 20 12 6 20 6 4"/>
      `;
      toggleBtn.setAttribute("title", "Play");
    }
  });
}

/* ==========================================================================
   6. COPY EMAIL CLIPBOARD TOOLTIP
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById("btnCopyEmail");
  const copyBubble = document.getElementById("copyBubble");
  const emailText = "sohanxpal18@gmail.com";

  if (!copyBtn || !copyBubble) return;

  copyBtn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback for older browsers
        const temp = document.createElement("input");
        temp.value = emailText;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }

      copyBubble.classList.add("show");
      setTimeout(() => {
        copyBubble.classList.remove("show");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const msgInput = document.getElementById("userMessage");
  const statusAlert = document.getElementById("formStatusAlert");
  const submitBtn = document.getElementById("btnSubmitForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let hasError = false;

    // Reset error states
    document.querySelectorAll(".form-group").forEach(g => g.classList.remove("has-error"));
    if (statusAlert) {
      statusAlert.className = "form-status-alert";
      statusAlert.style.display = "none";
    }

    // Name validation
    if (!nameInput.value.trim()) {
      nameInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    // Message validation
    if (!msgInput.value.trim()) {
      msgInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    if (hasError) return;

    // Prepare payload
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim()
    };

    // UI loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    try {
      // Post to endpoint if real, otherwise mock response for local testing
      let responseOk = true;
      if (CONTACT_FORM_ENDPOINT && !CONTACT_FORM_ENDPOINT.includes("xyzyqazb")) {
        const res = await fetch(CONTACT_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData)
        });
        responseOk = res.ok;
      } else {
        // Simulated local delay
        await new Promise(r => setTimeout(r, 600));
        responseOk = true;
      }

      if (responseOk) {
        statusAlert.className = "form-status-alert success";
        statusAlert.innerHTML = `✓ Message sent! Thanks for reaching out, I'll get back to you soon.`;
        statusAlert.style.display = "block";
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      statusAlert.className = "form-status-alert error";
      statusAlert.innerHTML = `✕ Oops, something went wrong. Feel free to email directly at sohanxpal18@gmail.com.`;
      statusAlert.style.display = "block";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* ==========================================================================
   8. ENTRANCE REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".window-frame, .widget-panel, .bottom-footer-bar");
  
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. CUSTOM RETRO SQUARE CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  // Only enable on devices with a fine pointer (mouse/trackpad, not touch)
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isFinePointer) return;

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Activate custom cursor styling & hide native cursor
  document.documentElement.classList.add("custom-cursor-active");

  let targetX = -100;
  let targetY = -100;
  let currentX = -100;
  let currentY = -100;

  let targetRot = -8;
  let currentRot = -8;

  let targetScale = 1;
  let currentScale = 1;

  let isHover = false;
  let isText = false;
  let isDown = false;
  let hasMoved = false;

  const LERP_FACTOR = 0.18;
  const REST_ROTATION = -8;

  // Event delegation selector for interactive elements
  const interactiveSelector = 'a, button, [role="button"], input, textarea, .desktop-icon, .desktop-icon-item, .project-row, .dock-pill, .stack-chip, .testimonial-card';

  // Evaluate target element for hover or text field state
  function updateCursorState(element) {
    if (!element) {
      isHover = false;
      isText = false;
      cursor.classList.remove("is-hover", "is-text");
      return;
    }

    // Text inputs and textareas -> vertical I-beam bar (2px x 20px)
    const textTarget = element.closest('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea');
    if (textTarget) {
      isText = true;
      isHover = false;
      cursor.classList.add("is-text");
      cursor.classList.remove("is-hover");
      return;
    }

    // Interactive elements -> enlarged teal square (~28px)
    const interactiveTarget = element.closest(interactiveSelector);
    if (interactiveTarget) {
      isHover = true;
      isText = false;
      cursor.classList.add("is-hover");
      cursor.classList.remove("is-text");
      return;
    }

    // Default rest state -> peach square (~14px) with -8deg rotation
    isHover = false;
    isText = false;
    cursor.classList.remove("is-hover", "is-text");
  }

  // Pointer position tracking
  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!hasMoved) {
      hasMoved = true;
      currentX = targetX;
      currentY = targetY;
      cursor.classList.add("is-visible");
    }

    updateCursorState(e.target);
  }, { passive: true });

  // Event delegation on mouseover and mouseout for instant state responsiveness
  document.addEventListener("mouseover", (e) => {
    updateCursorState(e.target);
  });

  document.addEventListener("mouseout", (e) => {
    updateCursorState(e.relatedTarget);
  });

  // Mousedown & Mouseup scaling (scale down to ~0.8 on press)
  window.addEventListener("mousedown", () => {
    isDown = true;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
  });

  // Hide cursor when mouse leaves window and show again on re-entry
  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseenter", () => {
    if (hasMoved) {
      cursor.classList.add("is-visible");
    }
  });

  // Animation render loop using requestAnimationFrame
  function render() {
    if (prefersReducedMotion) {
      currentX = targetX;
      currentY = targetY;
      currentRot = 0;
      currentScale = 1;
    } else {
      // Lerp translation (~0.18 smoothing lag)
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;

      // Rotation: -8deg at rest, 0deg when hovering interactive or text fields
      targetRot = (isHover || isText) ? 0 : REST_ROTATION;
      currentRot += (targetRot - currentRot) * LERP_FACTOR;

      // Scale: 0.8 on mousedown, 1 on release
      targetScale = isDown ? 0.8 : 1;
      currentScale += (targetScale - currentScale) * LERP_FACTOR;
    }

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentRot.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
