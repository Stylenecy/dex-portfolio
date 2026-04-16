/**
 * ============================================================
 *  GALLERY-LIGHTBOX.JS — Archives Hub
 *  Lightbox overlay for photography gallery items.
 * ============================================================
 *
 *  HOW IT WORKS:
 *  ─────────────
 *  Clicking a .gallery-item opens a fullscreen overlay
 *  (.gallery-lightbox) with the enlarged image.
 *
 *  Requires:
 *    - .gallery-item elements with <img> children
 *    - .gallery-lightbox element in the DOM (hidden by default)
 *    - archives.css for lightbox styles
 *
 *  PUBLIC API:
 *    GalleryLightbox.init()
 *    GalleryLightbox.open(imageSrc, caption)
 *    GalleryLightbox.close()
 *
 * ============================================================
 */

const GalleryLightbox = (() => {

  /** Cached DOM references */
  let _lightbox = null;
  let _lightboxImg = null;
  let _lightboxCaption = null;
  let _closeBtn = null;

  /** Track if lightbox is currently open */
  let _isOpen = false;

  /**
   * Build the lightbox DOM if it doesn't exist
   */
  function _createLightbox() {
    // Check if lightbox already exists in the DOM
    _lightbox = document.querySelector('.gallery-lightbox');
    if (_lightbox) {
      _lightboxImg = _lightbox.querySelector('.gallery-lightbox__img');
      _lightboxCaption = _lightbox.querySelector('.gallery-caption');
      _closeBtn = _lightbox.querySelector('.gallery-lightbox__close');
      return;
    }

    // Create lightbox element
    _lightbox = document.createElement('div');
    _lightbox.className = 'gallery-lightbox';
    _lightbox.setAttribute('role', 'dialog');
    _lightbox.setAttribute('aria-modal', 'true');
    _lightbox.setAttribute('aria-label', 'Image lightbox');

    _lightbox.innerHTML = `
      <button class="gallery-lightbox__close" aria-label="Close lightbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img class="gallery-lightbox__img" alt="" />
      <div class="gallery-caption gallery-lightbox__caption"></div>
    `;

    document.body.appendChild(_lightbox);

    // Cache references
    _lightboxImg = _lightbox.querySelector('.gallery-lightbox__img');
    _lightboxCaption = _lightbox.querySelector('.gallery-lightbox__caption');
    _closeBtn = _lightbox.querySelector('.gallery-lightbox__close');
  }

  /**
   * Bind click listeners to gallery items and close button
   */
  function _bindListeners() {
    // Gallery item clicks (poster/design grid)
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-item__img');
        const caption = item.querySelector('.gallery-caption__title');
        if (img && img.src) {
          open(img.src, caption ? caption.textContent : '');
        }
      });
    });

    // Photo masonry item clicks — opens full-size lightbox (not a new tab)
    document.querySelectorAll('.photo-item').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.photo-item__img');
        if (img && img.src) {
          open(img.src, '');
        }
      });
    });

    // Poster/design card clicks — same lightbox treatment
    document.querySelectorAll('.poster-card').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.poster-card__img');
        const title = item.querySelector('.poster-card__title');
        if (img && img.src) {
          open(img.src, title ? title.textContent.trim() : '');
        }
      });
    });

    // Close button
    if (_closeBtn) {
      _closeBtn.addEventListener('click', close);
    }

    // Click outside image to close
    if (_lightbox) {
      _lightbox.addEventListener('click', (e) => {
        if (e.target === _lightbox) {
          close();
        }
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _isOpen) {
        close();
      }
    });
  }

  /**
   * Open the lightbox with an image source and optional caption
   * @param {string} imageSrc - URL of the image to display
   * @param {string} [caption] - Optional caption text
   */
  function open(imageSrc, caption = '') {
    if (!_lightbox) return;

    _isOpen = true;
    _lightboxImg.src = imageSrc;
    _lightboxImg.alt = caption || 'Gallery image';

    if (_lightboxCaption) {
      _lightboxCaption.textContent = caption;
      _lightboxCaption.style.display = caption ? 'block' : 'none';
    }

    _lightbox.classList.add('is-open');

    // Trap focus within lightbox
    if (_closeBtn) {
      _closeBtn.focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the lightbox
   */
  function close() {
    if (!_lightbox) return;

    _isOpen = false;
    _lightbox.classList.remove('is-open');

    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Initialize the lightbox — call once after DOMContentLoaded
   */
  function init() {
    _createLightbox();
    _bindListeners();
    console.log('[GALLERY] Lightbox initialized');
  }

  return { init, open, close };

})(); // End GalleryLightbox IIFE

// Auto-boot
document.addEventListener('DOMContentLoaded', () => {
  GalleryLightbox.init();
});
