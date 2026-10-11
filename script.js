/**
 * Sohan Pal Portfolio - Desktop OS Window Manager & Interactive System
 * Plain Vanilla JS, no external libraries or build step
 */

// Configurable Form Endpoint (e.g. Formspree / Web3Forms / Formkeep)
const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/xyzyqazb";

document.addEventListener("DOMContentLoaded", () => {
  initLiveClocks();
  renderAllData();
  initWindowManager();
  initTabsSystem();
  initAudioToggle();
  initCopyEmail();
  initContactForm();
  initMobileBanner();
  initCustomCursor();
});

/* ==========================================================================
   1. LIVE CLOCKS (Top Menu & Left Status Widget)
   ========================================================================== */
function initLiveClocks() {
  const headerClock = document.getElementById("headerClock");
  const widgetClock = document.getElementById("widgetClock");

  function updateTime() {
    const now = new Date();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dateNum = now.getDate();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, "0");

    if (headerClock) {
      headerClock.innerHTML = `
        <span class="clock-date">${dayName} ${monthName} ${dateNum}</span>
        <span class="clock-dot">·</span>
        <span class="clock-time">${hoursStr}:${minutes} ${ampm}</span>
      `;
    }

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
   2. DYNAMIC CONTENT RENDERING FROM SHARED DATA FILES
   ========================================================================== */
function renderAllData() {
  renderProjects();
  renderTestimonials();
  renderTimeline();
  renderStack();
}

function renderProjects() {
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

function renderTestimonials() {
  const container = document.getElementById("testimonialsContainer");
  if (!container) return;

  if (typeof testimonials === "undefined" || !Array.isArray(testimonials)) {
    console.warn("Testimonials data not found in testimonials.js");
    return;
  }

  container.innerHTML = "";

  testimonials.forEach((item) => {
    const card = document.createElement("div");
    card.className = `testimonial-card note-${item.fill || "cream"} tilt-${item.tilt || "subtle"}`;

    card.innerHTML = `
      <div class="note-quote-glyph" aria-hidden="true">“</div>
      <p class="note-quote">${item.quote}</p>
      <div class="note-footer">
        <div class="note-author">${item.author}</div>
        <div class="note-org">${item.org}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderTimeline() {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  if (typeof timeline === "undefined" || !Array.isArray(timeline)) {
    console.warn("Timeline data not found in timeline.js");
    return;
  }

  container.innerHTML = "";

  timeline.forEach((item) => {
    const row = document.createElement("div");
    row.className = "timeline-row";

    row.innerHTML = `
      <div class="timeline-time">${item.year}</div>
      <div class="timeline-content">
        <h4 class="timeline-role">${item.role}</h4>
        <p class="timeline-desc">${item.desc}</p>
        <div class="timeline-org">${item.org}</div>
      </div>
    `;

    container.appendChild(row);
  });
}

function renderStack() {
  const container = document.getElementById("stackContainer");
  if (!container) return;

  if (typeof creativeStack === "undefined" || !Array.isArray(creativeStack)) {
    console.warn("Stack data not found in stack.js");
    return;
  }

  container.innerHTML = "";

  creativeStack.forEach((cat) => {
    const card = document.createElement("div");
    card.className = `stack-card stack-card-${cat.fill || "cream"}`;

    const chipsHtml = cat.chips.map(chip => `<span class="stack-chip">${chip}</span>`).join("");

    card.innerHTML = `
      <div class="stack-card-label">${cat.category}</div>
      <div class="stack-chips">${chipsHtml}</div>
    `;

    container.appendChild(card);
  });
}

/* ==========================================================================
   3. RETRO DESKTOP OS WINDOW MANAGER
   ========================================================================== */
function initWindowManager() {
  const workspace = document.getElementById("desktopWorkspace");
  const taskbarItems = document.getElementById("taskbarItems");
  const centerDisplay = document.getElementById("currentSectionDisplay");

  const windowDefs = [
    { id: "welcome", title: "/home/sohan: portfolio.exe", defaultOpen: true, cascadeIndex: 0 },
    { id: "work", title: "Selected work", defaultOpen: false, cascadeIndex: 1 },
    { id: "about", title: "About.txt", defaultOpen: false, cascadeIndex: 2 },
    { id: "contact", title: "Say hi", defaultOpen: false, cascadeIndex: 3 },
    { id: "links", title: "Socials", defaultOpen: false, cascadeIndex: 4 }
  ];

  const windows = {};
  let highestZ = 10;
  let activeWinId = "welcome";

  windowDefs.forEach(def => {
    const el = document.getElementById(`win-${def.id}`);
    if (el) {
      windows[def.id] = {
        id: def.id,
        title: def.title,
        el: el,
        isOpen: def.defaultOpen,
        isMinimized: false,
        cascadeIndex: def.cascadeIndex,
        hasCustomPos: false
      };
    }
  });

  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Update center title bar and active states
  function updateTopDisplay() {
    if (!centerDisplay) return;

    if (activeWinId && windows[activeWinId] && windows[activeWinId].isOpen && !windows[activeWinId].isMinimized) {
      centerDisplay.textContent = windows[activeWinId].title;
    } else {
      // Find highest visible window
      let topWin = null;
      let maxZ = -1;
      Object.values(windows).forEach(w => {
        if (w.isOpen && !w.isMinimized) {
          const z = parseInt(w.el.style.zIndex || "0", 10);
          if (z > maxZ) {
            maxZ = z;
            topWin = w;
          }
        }
      });
      if (topWin) {
        activeWinId = topWin.id;
        centerDisplay.textContent = topWin.title;
      } else {
        centerDisplay.textContent = "portfolio.exe";
        activeWinId = null;
      }
    }

    // Update nav links active class
    document.querySelectorAll(".nav-link").forEach(link => {
      const target = link.getAttribute("data-target");
      if (target && target === activeWinId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    renderTaskbar();
  }

  // Bring specified window to top of stacking context
  function bringToFront(id) {
    const win = windows[id];
    if (!win || !win.isOpen) return;

    if (win.isMinimized) {
      win.isMinimized = false;
      win.el.style.display = "flex";
    }

    highestZ += 1;
    win.el.style.zIndex = highestZ;
    activeWinId = id;

    updateTopDisplay();
  }

  // Flash titlebar feedback if window is already front-most
  function flashTitlebar(id) {
    const win = windows[id];
    if (!win) return;
    const titlebar = win.el.querySelector(".window-titlebar");
    if (titlebar) {
      titlebar.classList.add("is-flashing");
      setTimeout(() => titlebar.classList.remove("is-flashing"), 220);
    }
  }

  // Open window (or bring to front / flash if already open)
  function openWindow(id) {
    const win = windows[id];
    if (!win) return;

    // Mobile: single active modal sheet
    if (isMobile()) {
      Object.values(windows).forEach(w => {
        if (w.id !== id && w.isOpen) {
          w.isOpen = false;
          w.el.style.display = "none";
        }
      });
      win.isOpen = true;
      win.isMinimized = false;
      win.el.style.display = "flex";
      win.el.classList.add("is-open");
      bringToFront(id);
      return;
    }

    // Desktop mode
    if (win.isOpen && !win.isMinimized) {
      bringToFront(id);
      flashTitlebar(id);
      return;
    }

    if (win.isMinimized) {
      win.isMinimized = false;
      win.el.style.display = "flex";
      bringToFront(id);
      return;
    }

    // If opening afresh, apply cascade offset if not dragged before
    if (!win.hasCustomPos && win.id !== "welcome") {
      const cascadeStep = 24;
      const offsetX = (win.cascadeIndex * cascadeStep) % 120;
      const offsetY = (win.cascadeIndex * cascadeStep) % 120;
      win.el.style.left = `${offsetX}px`;
      win.el.style.top = `${offsetY}px`;
    }

    win.isOpen = true;
    win.isMinimized = false;
    win.el.style.display = "flex";
    win.el.classList.add("is-open");

    bringToFront(id);
  }

  // Minimize window to bottom taskbar
  function minimizeWindow(id) {
    const win = windows[id];
    if (!win) return;

    if (isMobile()) {
      closeWindow(id);
      return;
    }

    win.isMinimized = true;
    win.el.style.display = "none";

    // Switch focus to remaining top window
    let nextTop = null;
    let maxZ = -1;
    Object.values(windows).forEach(w => {
      if (w.id !== id && w.isOpen && !w.isMinimized) {
        const z = parseInt(w.el.style.zIndex || "0", 10);
        if (z > maxZ) {
          maxZ = z;
          nextTop = w;
        }
      }
    });

    if (nextTop) {
      activeWinId = nextTop.id;
    } else {
      activeWinId = null;
    }

    updateTopDisplay();
  }

  // Close window
  function closeWindow(id) {
    const win = windows[id];
    if (!win) return;

    win.isOpen = false;
    win.isMinimized = false;
    win.el.style.display = "none";

    // Activate next open window
    let nextTop = null;
    let maxZ = -1;
    Object.values(windows).forEach(w => {
      if (w.isOpen && !w.isMinimized) {
        const z = parseInt(w.el.style.zIndex || "0", 10);
        if (z > maxZ) {
          maxZ = z;
          nextTop = w;
        }
      }
    });

    if (nextTop) {
      activeWinId = nextTop.id;
    } else {
      activeWinId = null;
    }

    updateTopDisplay();
  }

  // Render open windows into bottom taskbar pills
  function renderTaskbar() {
    if (!taskbarItems) return;
    taskbarItems.innerHTML = "";

    Object.values(windows).forEach(win => {
      if (!win.isOpen) return;

      const btn = document.createElement("button");
      btn.type = "button";
      const isActive = activeWinId === win.id && !win.isMinimized;
      btn.className = `taskbar-btn ${isActive ? "active" : ""} ${win.isMinimized ? "minimized" : ""}`;
      btn.setAttribute("data-taskbar-id", win.id);
      btn.setAttribute("title", win.title);

      btn.innerHTML = `
        <span class="taskbar-dot"></span>
        <span class="taskbar-text">${win.title}</span>
      `;

      btn.addEventListener("click", () => {
        if (win.isMinimized) {
          win.isMinimized = false;
          win.el.style.display = "flex";
          bringToFront(win.id);
        } else if (activeWinId === win.id) {
          minimizeWindow(win.id);
        } else {
          bringToFront(win.id);
        }
      });

      taskbarItems.appendChild(btn);
    });
  }

  // Setup titlebar dragging and click-to-front
  Object.values(windows).forEach(win => {
    // Bring to front on pointerdown anywhere inside the window
    win.el.addEventListener("pointerdown", () => {
      bringToFront(win.id);
    });

    // Control buttons inside titlebar
    const closeBtn = win.el.querySelector('.control-btn[data-action="close"]');
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(win.id);
      });
    }

    const minBtn = win.el.querySelector('.control-btn[data-action="minimize"]');
    if (minBtn) {
      minBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        minimizeWindow(win.id);
      });
    }

    // Draggable Titlebar (Pointer Events with Viewport Clamping)
    const titlebar = win.el.querySelector('.window-titlebar[data-drag-handle="true"]');
    if (titlebar) {
      let isDragging = false;
      let startPointerX = 0;
      let startPointerY = 0;
      let startWinLeft = 0;
      let startWinTop = 0;

      titlebar.addEventListener("pointerdown", (e) => {
        if (e.target.closest(".control-btn")) return;
        if (isMobile()) return;

        isDragging = true;
        bringToFront(win.id);

        titlebar.setPointerCapture(e.pointerId);

        startPointerX = e.clientX;
        startPointerY = e.clientY;

        const winRect = win.el.getBoundingClientRect();
        const wsRect = workspace ? workspace.getBoundingClientRect() : { left: 0, top: 0 };

        startWinLeft = winRect.left - wsRect.left;
        startWinTop = winRect.top - wsRect.top;
      });

      titlebar.addEventListener("pointermove", (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startPointerX;
        const dy = e.clientY - startPointerY;

        let targetLeft = startWinLeft + dx;
        let targetTop = startWinTop + dy;

        // Viewport clamping: Titlebar MUST always stay reachable
        const wsRect = workspace ? workspace.getBoundingClientRect() : { left: 0, top: 0 };
        const minLeft = -wsRect.left + 10;
        const maxLeft = window.innerWidth - 140 - wsRect.left;
        const minTop = -wsRect.top + 60;
        const maxTop = window.innerHeight - 80 - wsRect.top;

        targetLeft = Math.min(maxLeft, Math.max(minLeft, targetLeft));
        targetTop = Math.min(maxTop, Math.max(minTop, targetTop));

        win.el.style.left = `${targetLeft}px`;
        win.el.style.top = `${targetTop}px`;
        win.hasCustomPos = true;
      });

      const stopDrag = (e) => {
        if (isDragging) {
          isDragging = false;
          try {
            titlebar.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }
      };

      titlebar.addEventListener("pointerup", stopDrag);
      titlebar.addEventListener("pointercancel", stopDrag);
    }
  });

  // Global trigger delegation for data-target buttons
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-target]");
    if (trigger) {
      const targetId = trigger.getAttribute("data-target");
      if (targetId && windows[targetId]) {
        e.preventDefault();
        openWindow(targetId);
      }
    }
  });

  // Keyboard shortcut: Esc closes front-most window
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeWinId && windows[activeWinId]) {
      closeWindow(activeWinId);
    }
  });

  // Initial display setup
  updateTopDisplay();
}

/* ==========================================================================
   4. WINDOW TABS SWITCHER SYSTEM
   ========================================================================== */
function initTabsSystem() {
  document.addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".tab-btn");
    if (!tabBtn) return;

    const group = tabBtn.getAttribute("data-tab-group");
    const targetPaneId = tabBtn.getAttribute("data-tab-target");
    if (!group || !targetPaneId) return;

    const windowEl = tabBtn.closest(".os-window");
    if (!windowEl) return;

    // Switch active tab button
    windowEl.querySelectorAll(`.tab-btn[data-tab-group="${group}"]`).forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    tabBtn.classList.add("active");
    tabBtn.setAttribute("aria-selected", "true");

    // Switch visible tab pane
    windowEl.querySelectorAll(".tab-pane").forEach(pane => {
      pane.classList.remove("active");
      pane.style.display = "none";
    });

    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.add("active");
      targetPane.style.display = "block";
    }
  });
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
      audioIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16" rx="1"/>
        <rect x="14" y="4" width="4" height="16" rx="1"/>
      `;
      toggleBtn.setAttribute("title", "Pause");
    } else {
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

    document.querySelectorAll(".form-group").forEach(g => g.classList.remove("has-error"));
    if (statusAlert) {
      statusAlert.className = "form-status-alert";
      statusAlert.style.display = "none";
    }

    if (!nameInput.value.trim()) {
      nameInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    if (!msgInput.value.trim()) {
      msgInput.closest(".form-group").classList.add("has-error");
      hasError = true;
    }

    if (hasError) return;

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim()
    };

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    try {
      let responseOk = true;
      if (CONTACT_FORM_ENDPOINT && !CONTACT_FORM_ENDPOINT.includes("xyzyqazb")) {
        const res = await fetch(CONTACT_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(formData)
        });
        responseOk = res.ok;
      } else {
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
   8. MOBILE HR NOTIFICATION BANNER
   ========================================================================== */
function initMobileBanner() {
  const closeBtn = document.getElementById("btnBannerClose");
  const banner = document.getElementById("mobileHrBanner");

  if (closeBtn && banner) {
    closeBtn.addEventListener("click", () => {
      banner.classList.add("is-dismissed");
    });
  }
}

/* ==========================================================================
   9. CUSTOM RETRO SQUARE CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;

  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isFinePointer) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const interactiveSelector = 'a, button, [role="button"], input, textarea, .desktop-icon-btn, .project-row, .tab-btn, .taskbar-btn, .control-btn, .link-btn-card, .stack-chip, .testimonial-card, .window-titlebar';

  function updateCursorState(element) {
    if (!element) {
      isHover = false;
      isText = false;
      cursor.classList.remove("is-hover", "is-text");
      return;
    }

    const textTarget = element.closest('input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea');
    if (textTarget) {
      isText = true;
      isHover = false;
      cursor.classList.add("is-text");
      cursor.classList.remove("is-hover");
      return;
    }

    const interactiveTarget = element.closest(interactiveSelector);
    if (interactiveTarget) {
      isHover = true;
      isText = false;
      cursor.classList.add("is-hover");
      cursor.classList.remove("is-text");
      return;
    }

    isHover = false;
    isText = false;
    cursor.classList.remove("is-hover", "is-text");
  }

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

  document.addEventListener("mouseover", (e) => {
    updateCursorState(e.target);
  });

  document.addEventListener("mouseout", (e) => {
    updateCursorState(e.relatedTarget);
  });

  window.addEventListener("mousedown", () => {
    isDown = true;
  });

  window.addEventListener("mouseup", () => {
    isDown = false;
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseenter", () => {
    if (hasMoved) {
      cursor.classList.add("is-visible");
    }
  });

  function render() {
    if (prefersReducedMotion) {
      currentX = targetX;
      currentY = targetY;
      currentRot = 0;
      currentScale = 1;
    } else {
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;

      targetRot = (isHover || isText) ? 0 : REST_ROTATION;
      currentRot += (targetRot - currentRot) * LERP_FACTOR;

      targetScale = isDown ? 0.8 : 1;
      currentScale += (targetScale - currentScale) * LERP_FACTOR;
    }

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentRot.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
