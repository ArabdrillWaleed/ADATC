// --- MV Slider: Small Audio Button Logic ---
document.addEventListener('DOMContentLoaded', function() {
  var playBtnSmall = document.getElementById('playMVOverviewAudioSmallBtn');
  var audioSmall = document.getElementById('mvOverviewAudioSmall');
  if (playBtnSmall && audioSmall) {
    playBtnSmall.addEventListener('click', function() {
      if (audioSmall.paused) {
        audioSmall.play();
        playBtnSmall.innerHTML = '&#x23F8;'; // Pause icon
      } else {
        audioSmall.pause();
        playBtnSmall.innerHTML = '&#x1F50A;'; // Speaker icon
      }
    });
    audioSmall.addEventListener('ended', function() {
      playBtnSmall.innerHTML = '&#x1F50A;';
    });
    audioSmall.addEventListener('pause', function() {
      playBtnSmall.innerHTML = '&#x1F50A;';
    });
    audioSmall.addEventListener('play', function() {
      playBtnSmall.innerHTML = '&#x23F8;';
    });
  }
});
// --- Simulation Center Page: Play Audio Overview Button Logic ---
document.addEventListener('DOMContentLoaded', function() {
  var playBtn = document.getElementById('playOverviewAudioBtn');
  var audio = document.getElementById('overviewAudio');
  if (playBtn && audio) {
    playBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = '\u23F8 Pause Audio Overview';
      } else {
        audio.pause();
        playBtn.textContent = '\u25B6 Play Audio Overview';
      }
    });
    audio.addEventListener('ended', function() {
      playBtn.textContent = '\u25B6 Play Audio Overview';
    });
    audio.addEventListener('pause', function() {
      playBtn.textContent = '\u25B6 Play Audio Overview';
    });
    audio.addEventListener('play', function() {
      playBtn.textContent = '\u23F8 Pause Audio Overview';
    });
  }
});
// Contact form validation logic
let observerInitialized = false;
// Removed old global audioPlayer/audioBtn/autoPlayActive/autoPlayPaused logic
let timelineAutoPlay = false;
let timelineAutoPlayStopped = false;
  // let currentIndex = 0; // Removed duplicate declaration
// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
    // Preload all timeline images
    if (window.timelineData && Array.isArray(window.timelineData)) {
      window.timelineData.forEach(item => {
        if (item.image) {
          const img = new window.Image();
          img.src = item.image;
        }
      });
    }
    // Always set initial timeline background and render first entry
    if (section && timelineData[0] && timelineData[0].image) {
      section.style.backgroundImage = `url('${timelineData[0].image}')`;
      section.offsetHeight;
      updateTimeline(0);
      timelineAutoPlay = false;
      timelineAutoPlayStopped = true;
    }
    // Always scroll to top on page load/refresh (after timeline init and rendering)
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 100);
  var form = document.getElementById('contactForm');
  var overlay = document.getElementById('popupOverlay');
  var popup = document.getElementById('formPopup');
  // Ensure popup and overlay are hidden on page load
  if (overlay) overlay.style.display = 'none';
  if (popup) popup.style.display = 'none';
  if (!form) return;

  window.closePopup = function() {
    var overlay = document.getElementById('popupOverlay');
    var popup = document.getElementById('formPopup');
    if (overlay) overlay.style.display = 'none';
    if (popup) popup.style.display = 'none';
  }

  function highlightInvalidFields(form) {
    let firstInvalid = null;
    Array.from(form.elements).forEach(function(el) {
      if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
  // Removed old local audioPlayer/audioBtn/autoPlayActive/autoPlayPaused logic
        let valid = true;
        if (el.name === 'phone') {
          if (!/^\d+$/.test(el.value.trim())) {
            valid = false;
          }
        } else if (el.type === 'email') {
          if (!/^\S+@\S+\.\S+$/.test(el.value.trim())) {
            valid = false;
          }
        } else if (el.required && !el.value.trim()) {
          valid = false;
        }
        el.classList.remove('field-error');
        if (!valid) {
          el.classList.add('field-error');
          if (!firstInvalid) firstInvalid = el;
        }
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }
// Error hint style
// Error field style
var style = document.createElement('style');
style.textContent = `
.field-error {
  border: 2px solid #d32f2f !important;
  background: #fff0f0 !important;
  transition: border-color 0.2s, background 0.2s;
}
.form-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-popup button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
}
`;
document.head.appendChild(style);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    highlightInvalidFields(form);
    // Check all fields
    let valid = true;
    Array.from(form.elements).forEach(function(el) {
      if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
        if (el.classList.contains('field-error')) valid = false;
      }
    });
    if (valid) {
      var overlay = document.getElementById('popupOverlay');
      var popup = document.getElementById('formPopup');
      if (overlay) overlay.style.display = 'block';
      if (popup) popup.style.display = 'block';
      form.reset();
    }
  });
});
// Global runtime error capture — non-invasive helper to surface JS errors
// during debugging. It logs and adds a visible banner so it's easier to
// spot which script/line is throwing in the browser. This does not change
// functional behavior of the page.
window.addEventListener('error', function (evt) {
  try {
    console.error('Runtime error captured:', evt.error || evt.message, evt.filename + ':' + evt.lineno + ':' + evt.colno);
    // show light overlay banner for quick visual feedback (only when DOM is ready)
    if (document && document.body && !document.getElementById('runtime-error-banner')) {
      const b = document.createElement('div');
      b.id = 'runtime-error-banner';
      b.style.position = 'fixed';
      b.style.left = '0';
      b.style.right = '0';
      b.style.top = '0';
      b.style.background = 'rgba(200,40,40,0.95)';
      b.style.color = 'white';
      b.style.padding = '6px 12px';
      b.style.fontSize = '13px';
      b.style.zIndex = '2147483647';
      b.style.fontFamily = 'sans-serif';
      b.textContent = 'JavaScript error: ' + (evt.message || evt.error && evt.error.message || 'see console');
    // Intersection Observer for timeline auto-play removed (no longer needed)
      b.addEventListener('click', () => b.parentNode && b.parentNode.removeChild(b));
      document.body.appendChild(b);
    }
  } catch (e) {
    // ignore errors in the error handler
  }
});

window.addEventListener('unhandledrejection', function (evt) {
  try {
    console.error('Unhandled promise rejection:', evt.reason);
  } catch (e) {}
});

document.addEventListener('DOMContentLoaded', function() {
            // Failsafe: always reveal site after max timeout (e.g., 6 seconds)
            setTimeout(() => {
              if (document.body.classList.contains('loading')) {
                const loader = document.getElementById('site-loader');
                if (loader) {
                  loader.style.transition = 'opacity 0.15s cubic-bezier(.2,.9,.25,1)';
                  loader.style.opacity = '0';
                  setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading');
                    document.body.style.opacity = '1';
                  }, 150);
                } else {
                  document.body.classList.remove('loading');
                  document.body.style.opacity = '1';
                }
              }
            }, 1000);
      // Loader logic: keep white screen until everything is loaded, then fade in
      function revealSite() {
        const loader = document.getElementById('site-loader');
        if (loader) {
          loader.style.transition = 'opacity 0.15s cubic-bezier(.2,.9,.25,1)';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            document.body.style.transition = 'background 0.12s, opacity 0.15s cubic-bezier(.2,.9,.25,1)';
            document.body.style.opacity = '1';
          }, 150);
        } else {
          document.body.classList.remove('loading');
          document.body.style.opacity = '1';
        }
      }

      function allImagesLoaded() {
        const imgs = Array.from(document.images);
        return imgs.every(img => img.complete);
      }

      function waitForAllResources() {
        // Wait for images
        if (!allImagesLoaded()) {
          let checkInterval = setInterval(() => {
            if (allImagesLoaded()) {
              clearInterval(checkInterval);
              waitForFontsAndFragments();
            }
          }, 50);
        } else {
          waitForFontsAndFragments();
        }
      }

      function waitForFontsAndFragments() {
        let fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
        let fragmentsReady = new Promise(resolve => {
          if (window._fragmentsInserted) resolve();
          else {
            document.addEventListener('fragments:inserted', function handler(ev) {
              window._fragmentsInserted = true;
              document.removeEventListener('fragments:inserted', handler);
              resolve();
            });
          }
        });
        Promise.all([fontsReady, fragmentsReady]).then(() => {
          // Wait for window.onload as final step
          if (document.readyState === 'complete') {
            revealSite();
              // Ensure timeline is initialized after all resources/fragments
              if (typeof updateTimeline === 'function') {
                updateTimeline(0);
              }
          } else {
            window.addEventListener('load', revealSite);
              // Also initialize timeline after window load
              window.addEventListener('load', function() {
                if (typeof updateTimeline === 'function') {
                  updateTimeline(0);
                }
              });
          }
        });
      }

      // Add loading class and hide body until reveal
      document.body.classList.add('loading');
      document.body.style.opacity = '0';

      // Start waiting for all resources
      waitForAllResources();
    // Expose idempotent initializers so they can be called after fragments
    // are dynamically inserted into the page. These functions are safe to
    // call multiple times; they protect against double-registration.
    window.initHeader = function initHeader(){
      try{
        const navToggle = document.getElementById('nav-toggle');
        const mainNav = document.getElementById('main-nav');
        const headerEl = document.querySelector('.site-header');
        
        // Only proceed if elements exist and not already initialized
        if(!navToggle || !mainNav || !headerEl) return;
        if(initHeader._done) return; 
        initHeader._done = true;
        
        navToggle.addEventListener('click', () => {
          document.body.classList.toggle('nav-open');
          const expanded = document.body.classList.contains('nav-open');
          navToggle.setAttribute('aria-expanded', String(expanded));
        });

          // Ensure dropdown triggers/toggles work even when header is
          // inserted dynamically (e.g., via fragments). We attach handlers
          // to each .nav-item.has-dropdown so mobile toggles reliably open
          // and close submenus.
          document.querySelectorAll('.nav-item.has-dropdown').forEach(navItem => {
            const trigger = navItem.querySelector('.dropdown-trigger');
            let toggle = navItem.querySelector('.dropdown-toggle');
            const dropdownMenu = navItem.querySelector('.dropdown-menu');

            // Accordion behavior for mobile: only one dropdown open at a time
            function accordionToggle(e) {
              if(window.innerWidth <= 900){
                e.preventDefault();
                // Close all other dropdowns
                document.querySelectorAll('.nav-item.has-dropdown.expanded').forEach(item => {
                  if(item !== navItem) item.classList.remove('expanded');
                });
                navItem.classList.toggle('expanded');
              }
            }
            // If there's no explicit toggle button, create a small one for
            // mobile accessibility so taps have a clear hit-target. This
            // keeps markup stable while ensuring JS can always find a toggle.
            if(!toggle){
              try{
                toggle = document.createElement('button');
                toggle.className = 'dropdown-toggle';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Toggle submenu');
                // insert after the trigger if present, else prepend
                if(trigger && trigger.parentNode){
                  trigger.parentNode.insertBefore(toggle, trigger.nextSibling);
                } else if(navItem.firstChild){
                  navItem.insertBefore(toggle, navItem.firstChild);
                } else {
                  navItem.appendChild(toggle);
                }
              }catch(e){/* non-fatal */}
            }

            const setExpanded = (expanded) => {
              if(expanded) navItem.classList.add('expanded'); else navItem.classList.remove('expanded');
              if(trigger) try{ trigger.setAttribute('aria-expanded', String(!!expanded)); }catch(e){}
              if(toggle) try{ toggle.setAttribute('aria-expanded', String(!!expanded)); }catch(e){}
            };

            const toggleDropdown = (e) => {
              if(e && e.preventDefault) e.preventDefault();
              const isExpanded = navItem.classList.contains('expanded');
              setExpanded(!isExpanded);
            };

            if(trigger){
              trigger.addEventListener('click', accordionToggle);
            }

            if(toggle){
              toggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleDropdown(e); });
            }

            // Close when clicking outside
            document.addEventListener('click', (e) => {
              if(!navItem.contains(e.target) && navItem.classList.contains('expanded')){
                setExpanded(false);
              }
            });
          });

          // close menu when any link is clicked (mobile)
          mainNav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', (e) => {
              if(window.innerWidth <= 720 && headerEl.classList.contains('nav-open')){
                if (!e.target.closest('.dropdown-toggle')) {
                  headerEl.classList.remove('nav-open');
                  navToggle.setAttribute('aria-expanded', 'false');
                }
              }
            });
          });
        
        // mark active nav links to match current page
        try{
          const links = document.querySelectorAll('#main-nav a, .site-nav a');
          var page = window.location.pathname.split('/').pop() || 'index.html';
          links.forEach(function(a){
            a.classList.remove('active');
            var href = a.getAttribute('href') || '';
            if(href === page || href === '/' + page || (page === 'index.html' && (href === '' || href === 'index.html'))){
              a.classList.add('active');
            }
          });
        }catch(e){}
      }catch(e){console.error('initHeader failed',e);}    
    };

    window.initFooter = function initFooter(){
      try{
        if(initFooter._done) return; initFooter._done = true;
        const footer = document.querySelector('.site-footer');
        if(!footer) return;
        const setInView = (v) => { if(v) footer.classList.add('in-view'); else footer.classList.remove('in-view'); };
        if('IntersectionObserver' in window){
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => setInView(entry.isIntersecting && entry.intersectionRatio > 0.03));
          }, {root:null, threshold:[0,0.03,0.1]});
          obs.observe(footer);
        } else {
          setInView(true);
        }
      }catch(e){console.error('initFooter failed',e);}    
    };

      // Amenities modal logic
      (function(){
        const modal = document.getElementById('amenities-modal');
        if (!modal) return;
        const modalTitle = document.getElementById('amenities-modal-title');
        const modalDesc = document.getElementById('amenities-modal-description');
        const modalImage = document.getElementById('amenities-modal-image');
        document.querySelectorAll('.amenity-card').forEach(card => {
          card.addEventListener('click', function(e){
            e.preventDefault();
            // Set modal content
            modalTitle.textContent = card.dataset.amenityName || '';
            modalDesc.textContent = card.dataset.amenityDescription || '';
            const imageSrc = card.dataset.amenityImage;
            if(imageSrc){
              modalImage.innerHTML = `<img src="${imageSrc}" alt="${card.dataset.amenityName || ''}" />`;
              modalImage.style.display = 'block';
            } else {
              modalImage.innerHTML = '';
              modalImage.style.display = 'none';
            }
            // Show modal with drop-in animation
            modal.style.display = 'flex';
            setTimeout(() => {
              modal.setAttribute('aria-hidden','false');
            }, 10);
            document.body.classList.add('modal-open');
          });
        });
        // Close modal handlers
        modal.querySelectorAll('[data-action="close"]').forEach(btn => {
          btn.addEventListener('click', function(){
            modal.setAttribute('aria-hidden','true');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
          });
        });
      })();

    // When fragments are inserted dynamically, re-run the initializers so
    // nav toggle, active link highlighting and footer reveal work.
    document.addEventListener('fragments:inserted', function(ev){
      try{
        // call both initializers; they are idempotent
        if(window.initHeader) window.initHeader();
        if(window.initFooter) window.initFooter();
      }catch(e){console.warn('fragments:inserted handler failed', e);}    
    });
    // Auto-inject favicons into <head> for any page that includes this script.
    // This ensures favicons are present on all pages without editing each HTML file.
    (function injectFavicons(){
      try {
        const head = document.head || document.getElementsByTagName('head')[0];
        if(!head) return;

        // If a favicon or apple-touch-icon is already present, don't duplicate.
        if(head.querySelector('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')) return;

        const links = [
          { rel: 'icon', href: 'images/favicon.png', type: 'image/png' },
          { rel: 'apple-touch-icon', href: 'images/apple-touch-icon-144.png', sizes: '144x144' }
        ];

        links.forEach(cfg => {
          const l = document.createElement('link');
          l.rel = cfg.rel;
          if(cfg.type) l.type = cfg.type;
          if(cfg.sizes) l.sizes = cfg.sizes;
          l.href = cfg.href;
          head.appendChild(l);
        });

        // Add legacy shortcut icon as well for older browsers
        const sc = document.createElement('link');
        sc.rel = 'shortcut icon';
        sc.href = 'images/favicon.png';
        head.appendChild(sc);

        // Add .ico fallback for maximum compatibility
        const ico = document.createElement('link');
        ico.rel = 'icon';
        ico.href = 'images/favicon.ico';
        ico.type = 'image/x-icon';
        head.appendChild(ico);

        // Useful meta tags for theme color and windows tile
        if(!head.querySelector('meta[name="theme-color"]')){
          const m1 = document.createElement('meta');
          m1.name = 'theme-color';
          m1.content = '#0b1b2b';
          head.appendChild(m1);
        }

        if(!head.querySelector('meta[name="msapplication-TileImage"]')){
          const m2 = document.createElement('meta');
          m2.name = 'msapplication-TileImage';
          m2.content = 'images/apple-touch-icon-144.png';
          head.appendChild(m2);
        }
      } catch (e) {
        // Non-fatal; just log for debugging
        console.error('Favicon injection failed:', e);
      }
    })();

    // Year update
    (function(){ 
      const yr = document.getElementById('year');
      if(yr) yr.textContent = new Date().getFullYear();
    })();

    // Header top-line measurement: set CSS variables so the ::before line
    // starts at COMPANY (not the logo) and spans to the right edge of INSTRUCTORS.
    (function setHeaderTopline(){
      const headerRow = document.querySelector('.header-main-row');
      const navList = document.querySelector('.nav-list');
      if(!headerRow || !navList) return;

      const setVars = () => {
        const items = Array.from(navList.querySelectorAll('a'));
        const company = items.find(a => /company/i.test(a.textContent.trim()));
        let instructors = items.find(a => /instructors/i.test(a.textContent.trim()));
        if(!instructors) instructors = items[items.length - 1];

        const rowRect = headerRow.getBoundingClientRect();
        if(!company || !instructors) return;

        const cRect = company.getBoundingClientRect();
        const iRect = instructors.getBoundingClientRect();

        // start: distance from row left to the left edge of the COMPANY link
        const start = Math.max(0, cRect.left - rowRect.left);
        // width: distance from COMPANY left to INSTRUCTORS right
        const width = Math.max(0, iRect.right - cRect.left);

        headerRow.style.setProperty('--header-topline-start', Math.round(start) + 'px');
        headerRow.style.setProperty('--header-topline-width', Math.round(width) + 'px');
        // Position the Arabic utility link so its RIGHT edge aligns with the
        // right end of the topline (INSTRUCTORS right edge). We measure the
        // INSTRUCTORS right coordinate and offset by the Arabic element width
        // so the Arabic link's right edge sits at the same x position.
        try {
          const topContainer = document.querySelector('.header-top .container');
          const arabicEl = document.querySelector('.header-top .arabic');
          if(topContainer && instructors){
            const topLeft = topContainer.getBoundingClientRect().left;
            const lineRight = iRect.right; // viewport x coord for INSTRUCTORS right edge
            // left position relative to the container where the line's right edge sits
            let targetLeft = Math.round(Math.max(0, lineRight - topLeft));

            // we want the Arabic link's LEFT edge to start exactly at the lineRight
            // coordinate, so do NOT subtract the arabic element width here.

            topContainer.style.setProperty('--arabic-left', targetLeft + 'px');
          }
        } catch(e){ /* ignore measurement errors */ }
      };

      setVars();
      window.addEventListener('resize', setVars);
      window.addEventListener('load', setVars);
    })();

    // Dropdowns removed from nav — no dropdown JS necessary

      // Loader behavior: hide after window load or after 2.5s fallback
      (function(){
        const loader = document.getElementById('site-loader');
        if(!loader) return;

        const hide = () => {
          if(!loader) return;
          loader.classList.add('hidden');
          setTimeout(() => {
            if(loader && loader.parentNode) loader.parentNode.removeChild(loader);
          }, 600);
        };

        if(document.readyState === 'complete'){
          // already loaded
          setTimeout(hide, 120);
        } else {
          window.addEventListener('load', hide, {once:true});
          // fallback in case load doesn't fire quickly
          setTimeout(hide, 2500);
        }
      })();

      // Sticky notes reveal: observe .sticky-note elements and add .visible
      // when they enter the viewport. This was previously handled elsewhere
      // and may be missing in some copies — add a lightweight observer here.
      (function stickyNotesReveal(){
        try {
          const notes = Array.from(document.querySelectorAll('.sticky-note'));
          if(!notes || notes.length === 0) return;

          const reveal = (el) => el.classList.add('visible');
          if('IntersectionObserver' in window){
            const obs = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                if(entry.isIntersecting){
                  reveal(entry.target);
                  observer.unobserve(entry.target);
                }
              });
            }, {root: null, threshold: 0.08});

            notes.forEach(n => obs.observe(n));
          } else {
            // fallback: reveal all so content is accessible
            notes.forEach(n => reveal(n));
          }
        } catch(e){ /* non-fatal */ }
      })();

        // Header scroll behavior: make header white when scrolled
      (function(){
        // Wrap the behavior so it can run immediately if the header exists
        // or re-run once after fragments are inserted (header injected later).
        // Also create a fallback spacer early so content isn't overlapped while
        // the header fragment is still being fetched/inserted.
        const ensureInitialSpacer = function(){
          if(document.getElementById('header-spacer')) return;
          const spacer = document.createElement('div');
          spacer.id = 'header-spacer';
          // Set initial header height variables and safe default spacer height
          spacer.style.height = '90px'; // Default to expanded header height
          try {
            document.documentElement.style.setProperty('--header-height', '90px');
            document.documentElement.style.setProperty('--header-height-base', '90px');
            document.documentElement.style.setProperty('--header-height-scrolled', '64px');
          } catch(e) {}
          // insert before main content as a conservative fallback
          const main = document.querySelector('main');
          if(main && main.parentNode){
            main.parentNode.insertBefore(spacer, main);
          } else if(document.body.firstChild){
            document.body.insertBefore(spacer, document.body.firstChild);
          } else {
            document.body.appendChild(spacer);
          }
        };

        ensureInitialSpacer();

        const run = function(){
          const header = document.querySelector('.site-header');
          if(!header) return false;

          // If an initial spacer exists in a fallback position, move it to be
          // immediately after the header so measurements are accurate.
          let headerSpacer = document.querySelector('#header-spacer');
          if(!headerSpacer){
            headerSpacer = document.createElement('div');
            headerSpacer.id = 'header-spacer';
            header.parentNode.insertBefore(headerSpacer, header.nextSibling);
          } else {
            // move existing spacer to be just after header
            if(headerSpacer.parentNode !== header.parentNode || headerSpacer.previousSibling !== header){
              try{ headerSpacer.parentNode.removeChild(headerSpacer); }catch(e){}
              header.parentNode.insertBefore(headerSpacer, header.nextSibling);
            }
          }

          const updateSpacer = () => {
            const rect = header.getBoundingClientRect();
            const height = Math.round(rect.height);
            
            // Update both spacer height and CSS variable
            headerSpacer.style.height = height + 'px';
            try {
              // Always keep header height variables in sync
              document.documentElement.style.setProperty('--header-height', height + 'px');
              document.documentElement.style.setProperty('--header-height-base', height + 'px');
              document.documentElement.style.setProperty('--header-height-scrolled', Math.min(height, 64) + 'px');
            } catch(e) {
              console.warn('Failed to update header height variables:', e);
            }
          };

          // Set initial header height values before any measurements
          try {
            document.documentElement.style.setProperty('--header-height', '64px');
            document.documentElement.style.setProperty('--header-height-base', '90px');
            document.documentElement.style.setProperty('--header-height-scrolled', '64px');
          } catch(e) {}

          // Update on resize
          updateSpacer();
          window.addEventListener('resize', updateSpacer);

          // Use ResizeObserver for dynamic header size changes
          if('ResizeObserver' in window) {
            try {
              const ro = new ResizeObserver(entries => {
                // Only update if size actually changed
                if(entries[0].contentRect.height !== header.getBoundingClientRect().height) {
                  updateSpacer();
                }
              });
              ro.observe(header);
            } catch(e) {
              console.warn('ResizeObserver setup failed:', e);
              // Fallback: periodic re-checks
              setTimeout(updateSpacer, 250);
              setTimeout(updateSpacer, 800);
            }
          } else {
            // Legacy fallback: periodic re-checks 
            setTimeout(updateSpacer, 250);
            setTimeout(updateSpacer, 800);
          }

          // Animation helper: when toggling the scrolled state, play a hide-then-drop animation
          // so the header visually disappears (moves up + fades) then returns smaller.
          const playShrinkSequence = (shouldBeScrolled) => {
            // synchronous toggle: immediately add/remove the scrolled state without animations
            const isScrolled = header.classList.contains('scrolled');
            if(shouldBeScrolled === isScrolled){
              updateSpacer();
              return;
            }

            if(shouldBeScrolled && !isScrolled){
              header.classList.add('scrolled');
              // hide utility links (like the Arabic toggle) from assistive tech while shrunk
              const arabic = document.querySelector('.header-top .arabic');
              if(arabic){
                arabic.setAttribute('aria-hidden', 'true');
                arabic.dataset.prevTab = arabic.getAttribute('tabindex') || '';
                arabic.setAttribute('tabindex', '-1');
              }
              updateSpacer();
            } else if(!shouldBeScrolled && isScrolled){
              header.classList.remove('scrolled');
              // restore utility link visibility and tab order for assistive tech
              const arabic = document.querySelector('.header-top .arabic');
              if(arabic){
                arabic.removeAttribute('aria-hidden');
                const prev = arabic.dataset.prevTab || '';
                if(prev) arabic.setAttribute('tabindex', prev);
                else arabic.removeAttribute('tabindex');
                delete arabic.dataset.prevTab;
              }
              // small timeout to allow CSS transition on header-inner to start, then update spacer
              setTimeout(updateSpacer, 40);
            }
          };

          const check = () => {
            const shouldBeScrolled = window.scrollY > 20;
            playShrinkSequence(shouldBeScrolled);
          };

          // initial check and bind
          check();
          window.addEventListener('scroll', check, {passive:true});

          // Anchor link offset: when clicking on same-page anchors, account for sticky header
          const offsetToTarget = (target) => {
            if(!target) return;
            const headerHeight = header.getBoundingClientRect().height;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
            window.scrollTo({top, behavior: 'smooth'});
          };

          // handle hash-only links (href="#foo")
          document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', (e) => {
              const targetId = a.getAttribute('href').slice(1);
              if(!targetId) return;
              const target = document.getElementById(targetId);
              if(!target) return;
              // prevent default jump and perform offset scroll
              e.preventDefault();
              history.pushState(null, '', '#' + targetId);
              offsetToTarget(target);
            });
          });

          // handle links that include the current page + hash (e.g., index.html#courses)
          document.querySelectorAll('a[href*="#"]').forEach(a => {
            const href = a.getAttribute('href') || '';
            try {
              const url = new URL(href, window.location.href);
              if(url.pathname === window.location.pathname && url.hash){
                a.addEventListener('click', (e) => {
                  const id = url.hash.slice(1);
                  const target = document.getElementById(id);
                  if(target){
                    e.preventDefault();
                    history.pushState(null, '', url.pathname + url.hash);
                    offsetToTarget(target);
                  }
                });
              }
            } catch(e){ /* ignore invalid URLs */ }
          });

          // When the hash changes (back/forward or direct link), offset the scroll after the browser jumps
          const onHashChange = () => {
            const id = window.location.hash.slice(1);
            if(!id) return;
            const target = document.getElementById(id);
            if(target) setTimeout(() => offsetToTarget(target), 24);
          };
          window.addEventListener('hashchange', onHashChange);
          // perform one-time adjustment if the page loaded with a hash
          if(window.location.hash){
            setTimeout(onHashChange, 80);
          }

          return true;
        };

        // run now or once fragments are inserted
        if(!run()){
          document.addEventListener('fragments:inserted', function(){ try{ run(); }catch(e){} }, { once: true });
        }
      })();

      // Footer reveal: toggle .in-view when footer enters/exits viewport so the animation
      // plays every time it comes into view.
      (function(){
        const footer = document.querySelector('.site-footer');
        if(!footer) return;

        const setInView = (v) => {
          if(v) footer.classList.add('in-view');
          else footer.classList.remove('in-view');
        };

        if('IntersectionObserver' in window){
          const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              setInView(entry.isIntersecting && entry.intersectionRatio > 0.03);
            });
          }, {root:null, threshold: [0, 0.03, 0.1]});

          obs.observe(footer);
        } else {
          // fallback: check on scroll and toggle
          const onScroll = () => {
            const rect = footer.getBoundingClientRect();
            const inView = rect.top < window.innerHeight - 20 && rect.bottom > 20;
            setInView(inView);
          };
          window.addEventListener('scroll', onScroll, {passive:true});
          onScroll();
        }
      })();

    // Active nav highlighting: ensure the correct tab is highlighted across pages
    (function setActiveNav(){
      try {
        const navLinks = document.querySelectorAll('.site-nav a');
        if(!navLinks || navLinks.length === 0) return;

        const url = new URL(window.location.href);
  // derive the current page basename (e.g. index.html or about.html)
  const segments = url.pathname.split('/').filter(Boolean);
  const path = segments.length ? segments.pop() : 'index.html';
  const hash = url.hash || '';

        // helper to normalize hrefs for comparison
        const normalize = href => {
          // make sure hash-only links reference current page
          if(href.startsWith('#')) return (path || 'index.html') + href;
          return href;
        };

        navLinks.forEach(a => a.classList.remove('active'));

        // Priority: exact pathname (home/about) > hash anchors (courses/instructors)
        // First try exact match
        let matched = Array.from(navLinks).find(a => {
          const nh = normalize(a.getAttribute('href') || '');
          return nh === path || nh === ('/' + path) || nh === (path + '#') || nh === (path + hash);
        });

        // If no exact match, match by hash (e.g., #courses on index)
        if(!matched && hash){
          matched = Array.from(navLinks).find(a => (a.getAttribute('href') || '').endsWith(hash));
        }

        // If still no match, fallback to Home link when on index
        if(!matched && (path === '' || path === 'index.html')){
          matched = Array.from(navLinks).find(a => (a.getAttribute('href') || '').endsWith('index.html') || (a.getAttribute('href') || '') === 'index.html' || (a.getAttribute('href') || '') === '/');
        }

        // Re-introduce persistent "active" class, but only when the header
        // is in its scrolled (compact) state. When the header is expanded we
        // keep the behavior transient (no persistent active state).
        const headerEl = document.querySelector('.site-header');

        const setActive = (link) => {
          navLinks.forEach(n => n.classList.remove('active'));
          if(link) link.classList.add('active');
        };

        // Set the active tab on load based on URL (path/hash) so it's
        // highlighted in both scrolled and unscrolled modes.
        if(matched){
          setActive(matched);
        }

        // Add click handlers that set the active state unconditionally so
        // clicking a tab highlights it regardless of header state.
        navLinks.forEach(a => {
          a.addEventListener('click', (e) => {
            setActive(a);
          });
        });
      } catch (e){
        console.error('Active nav setup failed', e);
      }
    })();
    
    // Try to initialize header/footer immediately if they already exist in DOM
    // (in case fragments loaded before this script)
    try{
      if(window.initHeader) window.initHeader();
      if(window.initFooter) window.initFooter();
    }catch(e){
      console.warn('Initial header/footer init failed', e);
    }
});





const timelineData = [
  { year: "1993", description: "The Establishment of Arabian Drilling Training Center in Dhahran Base.", image: "images/contactus.jpg", audio: "audio/1993.mp3" },
  { year: "1995", description: "Deployment and operation of the CS Portable drilling and well control simulator", image: "images/1995.svg", audio: "audio/1995.mp3" },
  { year: "2005", description: "Deployment and operation of the CS Full Size drilling and well control simulator", image: "images/Simulator.svg", audio: "audio/2005.mp3" },
  { year: "2006", description: "Well Control - International Association of Drilling Contractors (IADC) and Well Control Accreditation Program (WellCAP)", image: "images/Simulator.svg", audio: "audio/2006.mp3" },
  { year: "2012", description: "Deployment and operation of the of CS Cyber Chair drilling and well control simulator ", image: "images/2012.svg", audio: "audio/2012.mp3" },
  { year: "2013", description: "The Health & Safety Institute (HSI) - First Aid and Basic Life Support (BLS)", image: "images/2013.svg", audio: "audio/2013.mp3" },
  { year: "2015", description: "IADC WellSharp/IADC DIT - 1st training provider outside the USA to obtain this accrediation.", image: "images/contact.svg", audio: "audio/2015.mp3" },
  { year: "2016", description: "IADC DIT - H2S Train the Trainer", image: "images/2016.png", audio: "audio/2016.mp3" },
  { year: "2018", description: "Deployment and operation of four main simulators that are used to train and access students.", image: "images/ds600.svg", audio: "audio/2018.mp3" },
  { year: "2019", description: "ISO:29993:2017 and ISO:9001:2015 certifications", image: "images/accreditations.svg", audio: "audio/2019.mp3" },
  { year: "2023", description: "Acquiring Arabian Drilling Academy Training Center new building.", image: "images/ADLAcenter.svg", audio: "audio/2023.mp3" },
  { year: "2024", description: "Deployment and operation of the Bomco Full Size Cyber operator simulator.", image: "images/Bomco1.png", audio: "audio/2024dep.mp3" },
  { year: "2025", description: "Registration with The Technical and Vocational Training Corporation.", image: "images/timeline2025voc.svg", audio: "audio/2025.mp3" },
];
		let currentIndex = 0;
		const yearsContainer = document.getElementById('timelineYears');
		const desc = document.getElementById('timelineDesc');
		// Select section before any function uses it
		const section = document.querySelector('.timeline-section');
		// Windowed years rendering
		let visibleStart = 0;
		const VISIBLE_COUNT = 5;
		let lastDirection = 'right';
    function renderYears() {
      if (!yearsContainer) return;
      yearsContainer.innerHTML = '';
      for (let i = visibleStart; i < Math.min(visibleStart + VISIBLE_COUNT, timelineData.length); i++) {
        const btn = document.createElement('button');
        btn.className = 'timeline-year' + (i === currentIndex ? ' active' : '');
        btn.textContent = timelineData[i].year;
        btn.dataset.index = i;
        btn.addEventListener('click', () => {
          if (i === visibleStart && visibleStart > 0) {
            visibleStart--;
            // Animate all year buttons to the right
            Array.from(yearsContainer.children).forEach((el) => {
              el.classList.remove('slide-nav-left', 'slide-nav-right');
              el.classList.add('slide-nav-right');
              setTimeout(() => el.classList.remove('slide-nav-right'), 400);
            });
          } else if (i === visibleStart + VISIBLE_COUNT - 1 && visibleStart + VISIBLE_COUNT < timelineData.length) {
            visibleStart++;
            // Animate all year buttons to the left
            Array.from(yearsContainer.children).forEach((el) => {
              el.classList.remove('slide-nav-left', 'slide-nav-right');
              el.classList.add('slide-nav-left');
              setTimeout(() => el.classList.remove('slide-nav-left'), 400);
            });
          }
          lastDirection = (i > currentIndex) ? 'left' : 'right';
          updateTimeline(i);
        });
        // Add animation class to active year
        if (i === currentIndex) {
          btn.classList.add('slide-in-' + lastDirection);
        }
        yearsContainer.appendChild(btn);
      }
    }
    // let audioPlayer = null; // Removed duplicate
    // let audioBtn = null; // Removed duplicate
    
    function updateTimeline(index) {
      lastDirection = (index > currentIndex) ? 'left' : (index < currentIndex ? 'right' : lastDirection);
      currentIndex = index;
      if (index < visibleStart) {
        visibleStart = index;
      } else if (index >= visibleStart + VISIBLE_COUNT) {
        visibleStart = index - VISIBLE_COUNT + 1;
      }
      renderYears();
      // Removed scrollIntoView logic to prevent auto-scrolling to timeline section on page load
      // Animate description and add play button
      if (desc) {
        desc.classList.remove('slide-in-left', 'slide-in-right');
        void desc.offsetWidth;
        desc.innerHTML = '';
        // Add description text
        const descText = document.createElement('span');
        descText.textContent = timelineData[index].description;
        desc.appendChild(descText);
        // Add play/pause button for audio
        if (timelineData[index].audio) {
          // Remove any existing audio player
          let oldAudio = desc.querySelector('audio');
          if (oldAudio) oldAudio.remove();
          // Create audio element
          const audio = document.createElement('audio');
          audio.src = timelineData[index].audio;
          audio.preload = 'auto';
          audio.style.display = 'none';
          desc.appendChild(audio);

          // Create play/pause button
          const playBtn = document.createElement('button');
          playBtn.className = 'timeline-play-btn';
          playBtn.textContent = 'Play Audio';
          playBtn.style.marginLeft = '1em';
          let isPlaying = false;

          // Play/pause logic
          playBtn.onclick = function() {
            if (!isPlaying) {
              audio.play();
              playBtn.textContent = 'Pause Audio';
              isPlaying = true;
            } else {
              audio.pause();
              playBtn.textContent = 'Play Audio';
              isPlaying = false;
            }
          };

          audio.addEventListener('ended', function() {
            playBtn.textContent = 'Play Audio';
            isPlaying = false;
          });
          audio.addEventListener('pause', function(e) {
            playBtn.textContent = 'Play Audio';
            isPlaying = false;
          });
          audio.addEventListener('play', function() {
            playBtn.textContent = 'Pause Audio';
            isPlaying = true;
          });

          desc.appendChild(playBtn);
        }
        desc.classList.add('slide-in-' + lastDirection);
      }
      if (section) {
        // Set background image directly for the active year
        const imgUrl = timelineData[index].image;
        section.style.backgroundImage = `url('${imgUrl}')`;
        section.offsetHeight;
      }
    }
		function moveActiveYear(direction) {
			let newIndex = currentIndex;
			if (direction === 'left') {
				newIndex = currentIndex - 1;
				if (newIndex < 0) {
					newIndex = timelineData.length - 1;
				}
				lastDirection = 'right';
			} else if (direction === 'right') {
				newIndex = currentIndex + 1;
				if (newIndex >= timelineData.length) {
					newIndex = 0;
				}
				lastDirection = 'left';
			}
			updateTimeline(newIndex);
		}
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let didShift = false;
        if (visibleStart > 0) {
          visibleStart--;
          didShift = true;
          // Animate all year buttons to the right
          Array.from(yearsContainer.children).forEach((el) => {
            el.classList.remove('slide-nav-left', 'slide-nav-right');
            el.classList.add('slide-nav-right');
            setTimeout(() => el.classList.remove('slide-nav-right'), 400);
          });
        }
        // Move to previous year, wrap to last if at first
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = timelineData.length - 1;
        updateTimeline(newIndex);
      });
    }

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let didShift = false;
        if (visibleStart + VISIBLE_COUNT < timelineData.length) {
          visibleStart++;
          didShift = true;
          // Animate all year buttons to the left
          Array.from(yearsContainer.children).forEach((el) => {
            el.classList.remove('slide-nav-left', 'slide-nav-right');
            el.classList.add('slide-nav-left');
            setTimeout(() => el.classList.remove('slide-nav-left'), 400);
          });
        }
        // Move to next year, wrap to first if at last
        let newIndex = currentIndex + 1;
        if (newIndex >= timelineData.length) newIndex = 0;
        updateTimeline(newIndex);
      });
    }
		// Initial render
    document.addEventListener('DOMContentLoaded', function() {
      console.log("Timeline script loaded");
      // Do NOT initialize timeline on page load
      // Intersection Observer for robust timeline auto-play
      if (!observerInitialized && section) {
        observerInitialized = true;
        let timelineStarted = false;
        const observer = new window.IntersectionObserver((entries) => {
          entries.forEach(entry => {
            var isMobile = window.innerWidth < 900 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (!isMobile && entry.isIntersecting && !timelineAutoPlayStopped && !timelineStarted) {
              timelineAutoPlay = true;
              updateTimeline(currentIndex);
              timelineStarted = true;
            }
          });
        }, { threshold: 0.3 });
        observer.observe(section);
      }
      // Parallax effect for timeline section background
      window.addEventListener('scroll', function() {
          if (!section) return;
          var rect = section.getBoundingClientRect();
          var windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
              var scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
              section.style.backgroundPosition = 'center ' + (scrollPercent * 120) + 'px';
          } else {
              section.style.backgroundPosition = 'center 0px';
          }
      });
    });

// Homepage in-view animation logic
// Animate homepage items only when in view, with staggered delays for each card
let homepageObserverInitialized = false;
document.addEventListener('DOMContentLoaded', function() {
  if (homepageObserverInitialized) return;
  homepageObserverInitialized = true;
  // Select homepage items to animate
  const selectors = [
    '.modern-intro-card',
    '.modern-value-card',
    '.stat-card',
    '.overview-card',
    '.trusted-by-logos img'
  ];
  selectors.forEach(sel => {
    const items = Array.from(document.querySelectorAll(sel));
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > .55) { // Require more of the item in view
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .55 }); // Trigger when 35% of item is visible
    items.forEach((el, i) => {
      el.style.animationDelay = (i * 0.5 + 0.1) + 's'; // 0.5s stagger, start at 0.1s
      observer.observe(el);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Set generic download name for media images
  document.querySelectorAll('.media-img').forEach(function(img, i) {
    // Wrap image in a link with download attribute if not already
    if (!img.parentElement || img.parentElement.tagName.toLowerCase() !== 'a') {
      var link = document.createElement('a');
      link.href = img.src;
      link.download = 'ADTC-media-' + (i+1) + '.jpg';
      img.parentNode.insertBefore(link, img);
      link.appendChild(img);
      // Move magnifier if present
      var mag = link.nextSibling;
      if (mag && mag.classList && mag.classList.contains('media-magnifier')) {
        link.appendChild(mag);
      }
    } else {
      img.parentElement.download = 'ADTC-media-' + (i+1) + '.jpg';
    }
  });
});



// Media Gallery Filter Logic
// Show/hide videos/images based on filter button

document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.media-filter-btn');
  const videosSection = document.querySelector('.media-videos');
  const imagesSection = document.querySelector('.media-images-grid');

  function setActive(btn) {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setActive(btn);
      const filter = btn.getAttribute('data-filter');
      if (filter === 'all') {
        videosSection.style.display = '';
        imagesSection.style.display = '';
      } else if (filter === 'videos') {
        videosSection.style.display = '';
        imagesSection.style.display = 'none';
      } else if (filter === 'images') {
        videosSection.style.display = 'none';
        imagesSection.style.display = '';
      }
    });
  });
  // Set default active on page load
  if (filterBtns[0]) {
    filterBtns[0].classList.add('active');
  }
});