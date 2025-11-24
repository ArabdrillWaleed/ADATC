document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    // Show the first slide and activate its dot on load (after slides are initialized)
  // Check if slider exists on this page first
  const sliderContainer = document.querySelector('.mv-slider');
  if (!sliderContainer) return; // Exit early if no slider on this page

  // Prevent anchor redirects on slide change (mobile)
  sliderContainer.addEventListener('click', function(e) {
    // Only block if the click is not directly on a nav link or button
    if (e.target.tagName === 'A' && !e.target.classList.contains('mv-nav')) {
      e.preventDefault();
    }
  }, true);

  const slides = sliderContainer.querySelectorAll('.mv-slide');
  if (!slides || slides.length === 0) return; // Exit if no slides
  if (!slides || slides.length === 0) return; // Exit if no slides

  let currentSlide = 0;
  let autoRotateTimer;
  const ROTATE_INTERVAL = 5000; // 5 seconds

  // Create dot indicators
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'mv-slider-dots';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'mv-slider-dot';
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = idx;
      updateSlides();
      startAutoRotate();
    });
    dotsContainer.appendChild(dot);
  });
  sliderContainer.appendChild(dotsContainer);
  // Show the first slide and activate its dot on load (after dotsContainer is initialized)
  updateSlides();

  function updateSlides() {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      slide.style.transform = 'translateX(100px)';
      slide.style.opacity = '0';
      slide.style.visibility = 'hidden';
      dotsContainer.children[idx].classList.remove('active');
    });
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.transform = 'translateX(0)';
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].style.visibility = 'visible';
    dotsContainer.children[currentSlide].classList.add('active');
  }

  function startAutoRotate() {
    stopAutoRotate(); // Clear any existing timer
    if (window.innerWidth > 700) {
      autoRotateTimer = setInterval(nextSlide, ROTATE_INTERVAL);
    }
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Wrap navigation functions to restart timer
  function handlePrevClick() {
    prevSlide();
    if (window.innerWidth > 700) {
      startAutoRotate(); // Reset timer when manually navigating
    } else {
      stopAutoRotate();
    }
  }

  function handleNextClick() {
    nextSlide();
    if (window.innerWidth > 700) {
      startAutoRotate(); // Reset timer when manually navigating
    } else {
      stopAutoRotate();
    }
  }


  // Swipe support for touch devices
  let startX = null;
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  sliderContainer.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
      startAutoRotate();
    }
    startX = null;
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Pause auto-rotation when hovering over the slider
  sliderContainer.addEventListener('mouseenter', stopAutoRotate);
  sliderContainer.addEventListener('mouseleave', startAutoRotate);

  // Only start auto-rotation if not on mobile
  function maybeStartAutoRotate() {
    if (window.innerWidth > 700) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }
  }
  maybeStartAutoRotate();
  window.addEventListener('resize', maybeStartAutoRotate);

  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      maybeStartAutoRotate();
    }
  });
});
