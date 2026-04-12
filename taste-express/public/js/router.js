/**
 * ============================================================
 *  ROUTER.JS — Dex Bennett // System OS
 *  Hub Switching Engine (Vanilla JS, No Dependencies)
 * ============================================================
 *
 *  HOW IT WORKS:
 *  ─────────────
 *  The dashboard has 4 "Hubs" — full-page content panels
 *  that live inside .dashboard__center. Only one hub is
 *  visible at a time. The router handles:
 *
 *    1. Initialization   — reads URL hash on page load
 *    2. Navigation       — click listeners on dock + sidebar
 *    3. Transitions      — hub-exit → wait → hub-enter
 *    4. URL Sync         — window.history updates the hash
 *    5. Dock Sync        — active class mirrors current hub
 *    6. Sidebar Sync     — sidebar nav mirrors current hub
 *    7. Dock Theme       — dock data-active attr for CSS glow color
 *    8. Scroll Reset     — center area scrolls to top on hub switch
 *    9. Reveal Re-init   — re-runs IntersectionObserver for new hub
 *   10. Public API       — Router.navigateTo() for external calls
 *
 *  HUB IDs (must match id="hub-{id}" in index.html):
 *    - system-core
 *    - operations
 *    - operator-metrics
 *    - archives
 *
 *  DOCK ITEMS must have:
 *    data-hub="hub-id"     ← the target hub
 *    class="dock-item"
 *
 *  SIDEBAR NAV ITEMS must have:
 *    data-hub="hub-id"
 *    class="sidebar__nav-item"
 *
 * ============================================================
 */

const Router = (() => {

  // ──────────────────────────────────────────────────────────
  //  CONSTANTS
  // ──────────────────────────────────────────────────────────

  /** The hub ID loaded when no hash is present in the URL. */
  const DEFAULT_HUB = 'operator-metrics';

  /**
   * Duration (ms) to wait for the exit animation to finish
   * before showing the next hub.
   * Must match --duration-base or the hub-exit keyframe in CSS.
   */
  const EXIT_DURATION = 260;

  /**
   * Registry of all valid hub IDs.
   * Used for validation and initial DOM caching.
   */
  const HUB_IDS = [
    'system-core',
    'operations',
    'operator-metrics',
    'archives',
  ];

  /**
   * Human-readable display labels per hub.
   * Used to update the page <title> on navigation.
   */
  const HUB_LABELS = {
    'system-core':      'System Core',
    'operations':       'Operations',
    'operator-metrics': 'Operator Metrics',
    'archives':         'Archives',
  };

  /**
   * Base document title — prepended to the hub label.
   */
  const BASE_TITLE = 'Dex Bennett // System OS';


  // ──────────────────────────────────────────────────────────
  //  STATE
  // ──────────────────────────────────────────────────────────

  /** Currently visible hub ID. Null before init(). */
  let _currentHub = null;

  /** Flag — prevents rapid double-clicks mid-transition. */
  let _isTransitioning = false;

  /** Cached IntersectionObserver instance for reveal animations */
  let _revealObserver = null;

  /** Whether user prefers reduced motion */
  let _prefersReducedMotion = false;

  /** Adjusted exit duration for reduced motion */
  const REDUCED_EXIT_DURATION = 50;

  /** Cached DOM element references (populated in init). */
  const _elements = {
    /** Map of hubId → <div id="hub-{id}"> element */
    hubs: {},

    /** The scrollable center viewport */
    centerArea: null,

    /** The .dock element (for data-active attribute) */
    dock: null,

    /** All .dock-item[data-hub] elements */
    dockItems: [],

    /** All .sidebar__nav-item[data-hub] elements */
    sidebarItems: [],
  };

  /** Registered lifecycle hook callbacks */
  const _hooks = {
    beforeLeave:  [],
    afterEnter:   [],
  };


  // ──────────────────────────────────────────────────────────
  //  INTERNAL HELPERS
  // ──────────────────────────────────────────────────────────

  /**
   * Safely query an element. Returns null (not undefined) on failure.
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {Element|null}
   */
  function _query(selector, context = document) {
    return context.querySelector(selector);
  }

  /**
   * Safely query all elements.
   * @param {string} selector
   * @param {Element} [context=document]
   * @returns {NodeList}
   */
  function _queryAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  /**
   * Read the current URL hash as a hub ID.
   * Returns null if the hash doesn't match any registered hub.
   * @returns {string|null}
   */
  function _getHashHub() {
    const hash = window.location.hash.replace('#', '').trim();
    return HUB_IDS.includes(hash) ? hash : null;
  }

  /**
   * Update the browser URL hash without triggering a page scroll.
   * Uses replaceState so navigating back doesn't cycle through hubs.
   * @param {string} hubId
   */
  function _setHash(hubId) {
    try {
      window.history.replaceState(
        { hub: hubId },
        `${BASE_TITLE} — ${HUB_LABELS[hubId] || hubId}`,
        `#${hubId}`
      );
    } catch (e) {
      // replaceState can fail in some sandboxed environments; fail silently.
    }
  }

  /**
   * Update the document <title> to reflect the active hub.
   * @param {string} hubId
   */
  function _updateTitle(hubId) {
    const label = HUB_LABELS[hubId] || hubId;
    document.title = `${BASE_TITLE} — ${label}`;
  }

  /**
   * Re-initialize the Intersection Observer scroll reveal
   * for all .reveal elements inside the newly activated hub.
   * Disconnects the old observer to prevent memory leaks.
   * @param {Element} hubEl
   */
  function _reinitReveal(hubEl) {
    if (!hubEl) return;

    // Disconnect old observer to prevent memory leaks
    if (_revealObserver) {
      _revealObserver.disconnect();
      _revealObserver = null;
    }

    const reveals = hubEl.querySelectorAll('.reveal:not(.active)');
    if (!reveals.length) return;

    // If user prefers reduced motion, reveal all elements instantly
    if (_prefersReducedMotion) {
      reveals.forEach((el) => {
        el.classList.add('active');
        el.style.transition = 'none';
      });
      return;
    }

    _revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, no need to keep observing this element.
            _revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
        root: _elements.centerArea || null,
      }
    );

    reveals.forEach((el) => _revealObserver.observe(el));
  }

  /**
   * Run all registered hooks for a given event.
   * @param {'beforeLeave'|'afterEnter'} event
   * @param {string} hubId
   */
  function _runHooks(event, hubId) {
    const callbacks = _hooks[event] || [];
    callbacks.forEach((fn) => {
      try {
        fn(hubId);
      } catch (e) {
        console.warn(`[ROUTER] Hook error (${event}):`, e);
      }
    });
  }


  // ──────────────────────────────────────────────────────────
  //  DOM SYNC
  // ──────────────────────────────────────────────────────────

  /**
   * Update .active class on all dock items to match the current hub.
   * Also sets data-active="hub-id" on the .dock element so CSS can
   * use the hub's accent color for the radar dot.
   * @param {string} hubId
   */
  function _syncDock(hubId) {
    _elements.dockItems.forEach((item) => {
      const isActive = item.dataset.hub === hubId;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    if (_elements.dock) {
      _elements.dock.dataset.active = hubId;
    }
  }

  /**
   * Update .active class on all sidebar nav items.
   * @param {string} hubId
   */
  function _syncSidebar(hubId) {
    _elements.sidebarItems.forEach((item) => {
      const isActive = item.dataset.hub === hubId;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  /**
   * Scroll the center area smoothly back to the top.
   */
  function _scrollToTop() {
    if (_elements.centerArea) {
      _elements.centerArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


  // ──────────────────────────────────────────────────────────
  //  CORE NAVIGATION
  // ──────────────────────────────────────────────────────────

  /**
   * The primary navigation function.
   * Orchestrates exit animation → DOM swap → enter animation.
   *
   * @param {string}  hubId      - Target hub ID (must be in HUB_IDS)
   * @param {Object}  [options]
   * @param {boolean} [options.instant=false]  - Skip animations (e.g., on initial load)
   * @param {boolean} [options.pushState=true] - Update URL hash
   */
  function navigateTo(hubId, options = {}) {
    const {
      instant    = false,
      pushState  = true,
    } = options;

    // ── Validation ───────────────────────────────────────────
    if (!HUB_IDS.includes(hubId)) {
      console.warn(`[ROUTER] Unknown hub: "${hubId}". Valid hubs:`, HUB_IDS);
      return;
    }

    // ── Guard: no-op if already on this hub ──────────────────
    if (hubId === _currentHub && !instant) {
      _scrollToTop();
      return;
    }

    // ── Guard: prevent overlapping transitions ───────────────
    if (_isTransitioning && !instant) {
      return;
    }

    const targetEl  = _elements.hubs[hubId];
    const currentEl = _currentHub ? _elements.hubs[_currentHub] : null;

    if (!targetEl) {
      console.error(`[ROUTER] Hub element not found: #hub-${hubId}`);
      return;
    }

    // ── Run beforeLeave hooks ─────────────────────────────────
    _runHooks('beforeLeave', _currentHub);

    // ── Instant swap (used on first load) ────────────────────
    if (instant) {
      if (currentEl) {
        currentEl.classList.remove('hub--active', 'hub--exiting');
      }
      targetEl.classList.add('hub--active');
      targetEl.classList.remove('hub--exiting');
      _currentHub = hubId;

      _syncDock(hubId);
      _syncSidebar(hubId);
      if (pushState) _setHash(hubId);
      _updateTitle(hubId);
      _reinitReveal(targetEl);
      _runHooks('afterEnter', hubId);

      console.log(`[ROUTER] ⚡ Boot → ${hubId}`);
      return;
    }

    // ── Animated swap ────────────────────────────────────────
    _isTransitioning = true;

    // Use reduced duration for users who prefer reduced motion
    const exitDuration = _prefersReducedMotion ? REDUCED_EXIT_DURATION : EXIT_DURATION;

    // STEP 1: Trigger exit animation on current hub
    if (currentEl) {
      currentEl.classList.add('hub--exiting');
    }

    // STEP 2: After exit animation, swap visibility
    setTimeout(() => {

      // Hide old hub
      if (currentEl) {
        currentEl.classList.remove('hub--active', 'hub--exiting');
      }

      // Show new hub
      targetEl.classList.add('hub--active');
      targetEl.classList.remove('hub--exiting');

      // Update state
      _currentHub = hubId;

      // Sync all UI chrome
      _syncDock(hubId);
      _syncSidebar(hubId);
      _scrollToTop();
      if (pushState) _setHash(hubId);
      _updateTitle(hubId);

      // Re-observe reveal elements in the newly visible hub
      _reinitReveal(targetEl);

      // Run afterEnter hooks
      _runHooks('afterEnter', hubId);

      // Allow next navigation
      _isTransitioning = false;

      console.log(`[ROUTER] ✦ Switched → ${hubId}`);

    }, exitDuration);
  }


  // ──────────────────────────────────────────────────────────
  //  EVENT LISTENERS
  // ──────────────────────────────────────────────────────────

  /**
   * Attach click handlers to dock items and sidebar nav items.
   * Handles both <a href> and <button> / <div> patterns.
   */
  function _bindNavListeners() {

    // ── Dock items ───────────────────────────────────────────
    _elements.dockItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetHub = item.dataset.hub;
        if (targetHub) navigateTo(targetHub);
      });

      // Keyboard support: Enter or Space triggers navigation
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetHub = item.dataset.hub;
          if (targetHub) navigateTo(targetHub);
        }
      });

      // Ensure items are focusable if they aren't naturally
      if (!item.hasAttribute('tabindex') && item.tagName !== 'A' && item.tagName !== 'BUTTON') {
        item.setAttribute('tabindex', '0');
      }
    });

    // ── Sidebar nav items ────────────────────────────────────
    _elements.sidebarItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetHub = item.dataset.hub;
        if (targetHub) navigateTo(targetHub);
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const targetHub = item.dataset.hub;
          if (targetHub) navigateTo(targetHub);
        }
      });
    });

    console.log(
      `[ROUTER] 🎛  Bound ${_elements.dockItems.length} dock + ` +
      `${_elements.sidebarItems.length} sidebar listeners.`
    );
  }

  /**
   * Listen for browser back/forward navigation (popstate).
   * Reads the URL hash and navigates to the matching hub.
   */
  function _bindPopstate() {
    window.addEventListener('popstate', (e) => {
      const hubId = (e.state && e.state.hub) || _getHashHub() || DEFAULT_HUB;
      navigateTo(hubId, { pushState: false });
    });
  }


  // ──────────────────────────────────────────────────────────
  //  INITIALIZATION
  // ──────────────────────────────────────────────────────────

  /**
   * Cache all required DOM references into _elements.
   * Called once during init().
   */
  function _cacheDOM() {

    // Hub panels
    HUB_IDS.forEach((id) => {
      const el = document.getElementById(`hub-${id}`);
      if (el) {
        _elements.hubs[id] = el;
      } else {
        console.warn(`[ROUTER] ⚠ Hub element not found in DOM: #hub-${id}`);
      }
    });

    // Center scrollable area
    _elements.centerArea = _query('.dashboard__center');

    // Dock pill element
    _elements.dock = _query('.dock');

    // All dock navigation items with data-hub
    _elements.dockItems = Array.from(
      _queryAll('.dock-item[data-hub]')
    );

    // All sidebar navigation items with data-hub
    _elements.sidebarItems = Array.from(
      _queryAll('.sidebar__nav-item[data-hub]')
    );

    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    _prefersReducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (e) => {
      _prefersReducedMotion = e.matches;
    });

    // Log what was found
    const hubCount = Object.keys(_elements.hubs).length;
    console.log(
      `[ROUTER] 📦 Cached ${hubCount}/${HUB_IDS.length} hub panels.`
    );
  }

  /**
   * Determine the initial hub from URL hash, history state,
   * or fall back to DEFAULT_HUB.
   * @returns {string}
   */
  function _resolveInitialHub() {
    // 1. Try popstate history state (handles refresh on sub-page)
    if (window.history.state && window.history.state.hub) {
      const stateHub = window.history.state.hub;
      if (HUB_IDS.includes(stateHub)) return stateHub;
    }

    // 2. Try URL hash
    const hashHub = _getHashHub();
    if (hashHub) return hashHub;

    // 3. Default
    return DEFAULT_HUB;
  }

  /**
   * Entry point. Call once after DOMContentLoaded.
   * Caches DOM, binds events, and boots the initial hub.
   */
  function init() {
    console.log('[ROUTER] 🚀 Initializing System OS Router...');

    _cacheDOM();
    _bindNavListeners();
    _bindPopstate();

    const initialHub = _resolveInitialHub();
    navigateTo(initialHub, { instant: true, pushState: true });

    console.log(`[ROUTER] ✅ Ready. Active hub: "${initialHub}"`);
  }


  // ──────────────────────────────────────────────────────────
  //  LIFECYCLE HOOKS — PUBLIC API
  // ──────────────────────────────────────────────────────────

  /**
   * Register a callback to run BEFORE a hub transition starts.
   * Useful for pausing animations in the outgoing hub.
   *
   * @example
   * Router.onBeforeLeave((hubId) => {
   *   console.log('Leaving:', hubId);
   * });
   *
   * @param {function} fn - Receives the outgoing hubId string.
   */
  function onBeforeLeave(fn) {
    if (typeof fn === 'function') _hooks.beforeLeave.push(fn);
  }

  /**
   * Register a callback to run AFTER a hub has fully entered.
   * Useful for triggering JS-driven animations (e.g., counting
   * up metric numbers, drawing charts, etc.).
   *
   * @example
   * Router.onAfterEnter((hubId) => {
   *   if (hubId === 'operator-metrics') initStatAnimations();
   * });
   *
   * @param {function} fn - Receives the incoming hubId string.
   */
  function onAfterEnter(fn) {
    if (typeof fn === 'function') _hooks.afterEnter.push(fn);
  }

  /**
   * Get the currently active hub ID.
   * @returns {string|null}
   */
  function getCurrentHub() {
    return _currentHub;
  }

  /**
   * Programmatically navigate to a hub from any external script.
   * @param {string} hubId
   */
  function goTo(hubId) {
    navigateTo(hubId);
  }


  // ──────────────────────────────────────────────────────────
  //  PUBLIC API
  // ──────────────────────────────────────────────────────────
  return {
    init,
    navigateTo,
    goTo,
    getCurrentHub,
    onBeforeLeave,
    onAfterEnter,
  };

})(); // End Router IIFE


// ──────────────────────────────────────────────────────────────
//  AUTO-BOOT
//  Initialize the router once the DOM is fully parsed.
// ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});
