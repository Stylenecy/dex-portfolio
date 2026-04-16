/**
 * ============================================================
 *  SIDEBAR-RESIZE.JS — Collapsible & Resizable Sidebar
 *  Handles collapse toggle, drag-to-resize, avatar scaling,
 *  and profile photo lightbox.
 * ============================================================
 *
 *  FEATURES:
 *  - Collapse/expand toggle button
 *  - Drag-to-resize sidebar width
 *  - Max width: 33vw (1/3 of viewport)
 *  - Min width (expanded): 200px
 *  - Collapsed width: 64px (icon rail)
 *  - Avatar scales with sidebar width
 *  - Photo lightbox with futuristic frame
 *  - State persistence via localStorage
 *
 *  PUBLIC API:
 *    SidebarResize.init()
 *    SidebarResize.collapse()
 *    SidebarResize.expand()
 *    SidebarResize.toggle()
 *
 * ============================================================
 */

const SidebarResize = (() => {

  // ──────────────────────────────────────────────────────────
  //  CONSTANTS
  // ──────────────────────────────────────────────────────────

  const COLLAPSED_WIDTH = 64;      // px — icon rail width
  const MIN_EXPANDED_WIDTH = 200;  // px — minimum when expanded
  const MAX_WIDTH_RATIO = 0.33;    // 33% of viewport width
  const DEFAULT_WIDTH = 260;       // px — default sidebar width

  // Avatar size scales proportionally: ~54% of sidebar width
  const AVATAR_SIZE_RATIO = 0.54;
  const AVATAR_MIN_SIZE = 40;      // px — minimum avatar in collapsed
  const AVATAR_MAX_SIZE = 200;     // px — maximum avatar size

  const STORAGE_KEY_WIDTH = 'sidebar-width';
  const STORAGE_KEY_COLLAPSED = 'sidebar-collapsed';


  // ──────────────────────────────────────────────────────────
  //  STATE
  // ──────────────────────────────────────────────────────────

  let _isCollapsed = false;
  let _currentWidth = DEFAULT_WIDTH;
  let _isDragging = false;
  let _startX = 0;
  let _startWidth = 0;


  // ──────────────────────────────────────────────────────────
  //  DOM REFERENCES
  // ──────────────────────────────────────────────────────────

  let _sidebar = null;
  let _collapseBtn = null;
  let _resizeHandle = null;
  let _avatarFrame = null;
  let _photoLightbox = null;
  let _lightboxClose = null;


  // ──────────────────────────────────────────────────────────
  //  INITIALIZATION
  // ──────────────────────────────────────────────────────────

  function init() {
    _sidebar = document.querySelector('.dashboard__sidebar');
    _collapseBtn = document.querySelector('.sidebar__collapse-btn');
    _resizeHandle = document.querySelector('.sidebar__resize-handle');
    _avatarFrame = document.querySelector('.sidebar__avatar-frame');
    _photoLightbox = document.getElementById('photo-lightbox');
    _lightboxClose = _photoLightbox ? _photoLightbox.querySelector('.photo-lightbox__close') : null;

    if (!_sidebar) {
      console.warn('[SIDEBAR] Sidebar element not found');
      return;
    }

    // Restore state from localStorage
    _restoreState();

    // Apply initial state
    _applyState();
    _updateAvatarSize();

    // Bind events
    _bindEvents();

    console.log(`[SIDEBAR] Initialized — width: ${_currentWidth}px, collapsed: ${_isCollapsed}`);
  }


  // ──────────────────────────────────────────────────────────
  //  STATE PERSISTENCE
  // ──────────────────────────────────────────────────────────

  function _restoreState() {
    try {
      const storedWidth = localStorage.getItem(STORAGE_KEY_WIDTH);
      const storedCollapsed = localStorage.getItem(STORAGE_KEY_COLLAPSED);

      if (storedCollapsed !== null) {
        _isCollapsed = storedCollapsed === 'true';
      }

      if (storedWidth !== null && !_isCollapsed) {
        const w = parseInt(storedWidth, 10);
        if (w >= MIN_EXPANDED_WIDTH) {
          _currentWidth = w;
        }
      }
    } catch (e) {
      console.warn('[SIDEBAR] Could not restore state:', e);
    }
  }

  function _saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_WIDTH, String(_currentWidth));
      localStorage.setItem(STORAGE_KEY_COLLAPSED, String(_isCollapsed));
    } catch (e) {
      console.warn('[SIDEBAR] Could not save state:', e);
    }
  }


  // ──────────────────────────────────────────────────────────
  //  STATE APPLICATION
  // ──────────────────────────────────────────────────────────

  function _applyState() {
    if (_isCollapsed) {
      _sidebar.classList.add('sidebar--collapsed');
      _collapseBtn.classList.add('sidebar__collapse-btn--collapsed');
      _collapseBtn.setAttribute('aria-label', 'Expand sidebar');
      _collapseBtn.setAttribute('title', 'Expand sidebar');
      document.documentElement.style.setProperty('--sidebar-width', `${COLLAPSED_WIDTH}px`);
    } else {
      _sidebar.classList.remove('sidebar--collapsed');
      _collapseBtn.classList.remove('sidebar__collapse-btn--collapsed');
      _collapseBtn.setAttribute('aria-label', 'Collapse sidebar');
      _collapseBtn.setAttribute('title', 'Collapse sidebar');
      document.documentElement.style.setProperty('--sidebar-width', `${_currentWidth}px`);
    }
  }


  // ──────────────────────────────────────────────────────────
  //  AVATAR SIZE CALCULATION
  // ──────────────────────────────────────────────────────────

  function _updateAvatarSize() {
    const width = _isCollapsed ? COLLAPSED_WIDTH : _currentWidth;
    const size = Math.round(width * AVATAR_SIZE_RATIO);
    const clampedSize = Math.max(AVATAR_MIN_SIZE, Math.min(size, AVATAR_MAX_SIZE));
    document.documentElement.style.setProperty('--sidebar-avatar-size', `${clampedSize}px`);
  }


  // ──────────────────────────────────────────────────────────
  //  PHOTO LIGHTBOX
  // ──────────────────────────────────────────────────────────

  function _openPhotoLightbox() {
    if (!_photoLightbox) return;
    _photoLightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function _closePhotoLightbox() {
    if (!_photoLightbox) return;
    _photoLightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }


  // ──────────────────────────────────────────────────────────
  //  PUBLIC API
  // ──────────────────────────────────────────────────────────

  /** Collapse the sidebar to icon rail */
  function collapse() {
    _isCollapsed = true;
    _applyState();
    _updateAvatarSize();
    _saveState();
  }

  /** Expand the sidebar to full width */
  function expand() {
    _isCollapsed = false;
    _applyState();
    _updateAvatarSize();
    _saveState();
  }

  /** Toggle between collapsed and expanded */
  function toggle() {
    if (_isCollapsed) {
      expand();
    } else {
      collapse();
    }
  }


  // ──────────────────────────────────────────────────────────
  //  EVENT HANDLERS
  // ──────────────────────────────────────────────────────────

  function _bindEvents() {
    // Collapse toggle
    if (_collapseBtn) {
      _collapseBtn.addEventListener('click', () => {
        toggle();
      });
    }

    // Photo lightbox — click avatar to open
    if (_avatarFrame) {
      _avatarFrame.addEventListener('click', () => {
        _openPhotoLightbox();
      });
    }

    // Photo lightbox — close button
    if (_lightboxClose) {
      _lightboxClose.addEventListener('click', () => {
        _closePhotoLightbox();
      });
    }

    // Photo lightbox — click outside frame to close
    if (_photoLightbox) {
      _photoLightbox.addEventListener('click', (e) => {
        if (e.target === _photoLightbox) {
          _closePhotoLightbox();
        }
      });
    }

    // Photo lightbox — Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && _photoLightbox && _photoLightbox.classList.contains('is-open')) {
        _closePhotoLightbox();
      }
    });

    // Photo lightbox — close when switching hubs via dock or sidebar nav
    document.querySelectorAll('[data-hub]').forEach(el => {
      el.addEventListener('click', () => _closePhotoLightbox());
    });

    // Resize handle — mousedown to start drag
    if (_resizeHandle) {
      _resizeHandle.addEventListener('mousedown', _onResizeStart);
      _resizeHandle.addEventListener('touchstart', _onResizeStart, { passive: false });
    }

    // Global mouseup/touchend to stop drag
    document.addEventListener('mouseup', _onResizeEnd);
    document.addEventListener('touchend', _onResizeEnd);

    // Global mousemove/touchmove for dragging
    document.addEventListener('mousemove', _onResizeMove);
    document.addEventListener('touchmove', _onResizeMove, { passive: false });

    // Update avatar on window resize
    window.addEventListener('resize', () => {
      if (!_isCollapsed) {
        // Recalculate max width constraint
        const maxAllowedWidth = Math.floor(window.innerWidth * MAX_WIDTH_RATIO);
        if (_currentWidth > maxAllowedWidth) {
          _currentWidth = maxAllowedWidth;
          _applyState();
        }
      }
      _updateAvatarSize();
    });
  }

  function _onResizeStart(e) {
    // Don't start resize if sidebar is collapsed
    if (_isCollapsed) return;

    _isDragging = true;
    _startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    _startWidth = _currentWidth;

    if (_resizeHandle) {
      _resizeHandle.classList.add('sidebar__resize-handle--active');
    }

    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';

    e.preventDefault();
  }

  function _onResizeMove(e) {
    if (!_isDragging) return;

    e.preventDefault();

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - _startX;
    let newWidth = _startWidth + deltaX;

    // Calculate max width (33% of viewport)
    const maxAllowedWidth = Math.floor(window.innerWidth * MAX_WIDTH_RATIO);

    // Clamp width
    newWidth = Math.max(MIN_EXPANDED_WIDTH, Math.min(newWidth, maxAllowedWidth));

    _currentWidth = newWidth;
    document.documentElement.style.setProperty('--sidebar-width', `${_currentWidth}px`);

    // Update avatar size in real-time during drag
    _updateAvatarSize();
  }

  function _onResizeEnd() {
    if (!_isDragging) return;

    _isDragging = false;

    if (_resizeHandle) {
      _resizeHandle.classList.remove('sidebar__resize-handle--active');
    }

    // Restore cursor and selection
    document.body.style.userSelect = '';
    document.body.style.cursor = '';

    // Save state
    _saveState();
  }


  // ──────────────────────────────────────────────────────────
  //  PUBLIC API EXPORT
  // ──────────────────────────────────────────────────────────

  return {
    init,
    collapse,
    expand,
    toggle,
  };

})(); // End SidebarResize IIFE

// Auto-boot
document.addEventListener('DOMContentLoaded', () => {
  SidebarResize.init();
});
