/**
 * ============================================================
 *  STAT-COUNTER.JS — Animated Number Counting
 *  For RPG stats, metric numbers, and power score displays.
 * ============================================================
 *
 *  HOW IT WORKS:
 *  ─────────────
 *  When a hub with stat counters becomes active,
 *  numbers animate from 0 to their target value.
 *
 *  Usage: Add data-target="123" to any element with class
 *  .stat-counter__value, .power-banner__score, or .ops-metric__value
 *
 *  PUBLIC API:
 *    StatCounter.init()
 *    StatCounter.animate(element, targetValue)
 *    StatCounter.animateAll(container)
 *
 * ============================================================
 */

const StatCounter = (() => {

  /** Default animation duration in ms */
  const DEFAULT_DURATION = 1200;

  /** Whether user prefers reduced motion */
  let _prefersReducedMotion = false;

  /**
   * Animate a single element from 0 to target
   * @param {Element} element - The element to animate
   * @param {number} target - The target number
   * @param {number} [duration] - Animation duration in ms
   */
  function animate(element, target, duration = DEFAULT_DURATION) {
    if (!element || !target) return;

    // Skip animation for reduced motion preference
    if (_prefersReducedMotion) {
      element.textContent = target;
      return;
    }

    // Check if already animated (prevent double-triggering)
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';

    const start = 0;
    const startTime = performance.now();

    // Check if target is a decimal (for scores like 87.5)
    const isDecimal = String(target).includes('.');
    const precision = isDecimal ? 1 : 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;

      element.textContent = current.toFixed(precision);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toFixed(precision);
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Animate all stat counter elements within a container
   * @param {Element} [container=document.body]
   */
  function animateAll(container = document.body) {
    if (!container) return;

    // Find all elements with data-target attribute
    const targets = container.querySelectorAll('[data-target]');
    targets.forEach((el) => {
      const value = parseFloat(el.dataset.target);
      if (!isNaN(value)) {
        animate(el, value);
      }
    });
  }

  /**
   * Initialize the stat counter module
   * Detects reduced motion preference and sets up observers
   */
  function init() {
    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    _prefersReducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', (e) => {
      _prefersReducedMotion = e.matches;
    });

    // Observe hub switches to re-trigger animations
    if (typeof Router !== 'undefined' && Router.onAfterEnter) {
      Router.onAfterEnter((hubId) => {
        const hub = document.getElementById(`hub-${hubId}`);
        if (hub) {
          // Reset animated flags for elements in this hub
          hub.querySelectorAll('[data-animated="true"]').forEach((el) => {
            el.dataset.animated = 'false';
          });
          animateAll(hub);
        }
      });
    }

    // Also animate on initial load for visible elements
    document.addEventListener('DOMContentLoaded', () => {
      animateAll();
    });

    console.log('[STAT] Counter module initialized');
  }

  return { init, animate, animateAll };

})(); // End StatCounter IIFE

// Auto-boot
document.addEventListener('DOMContentLoaded', () => {
  StatCounter.init();
});
