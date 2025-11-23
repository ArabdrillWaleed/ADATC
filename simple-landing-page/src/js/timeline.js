document.addEventListener('DOMContentLoaded', () => {
  const timelineYears = document.querySelectorAll('.timeline-year');
  const prevBtn = document.querySelector('.timeline-nav .prev');
  const nextBtn = document.querySelector('.timeline-nav .next');
  let currentYear = 0;

  function updateTimeline() {
    timelineYears.forEach((year, index) => {
      if (index === currentYear) {
        year.classList.add('active');
      } else {
        year.classList.remove('active');
      }
    });
  }

  function nextYear() {
    currentYear = (currentYear + 1) % timelineYears.length;
    updateTimeline();
  }

  function prevYear() {
    currentYear = (currentYear - 1 + timelineYears.length) % timelineYears.length;
    updateTimeline();
  }

  nextBtn.addEventListener('click', nextYear);
  prevBtn.addEventListener('click', prevYear);

  // Minimal robust auto-advance: only desktop, never mobile
  let autoTimeline = null;
  function startTimelineAutoAdvance() {
    if (window.innerWidth > 700 && !autoTimeline) {
      autoTimeline = setInterval(nextYear, 5000);
    }
  }
  function stopTimelineAutoAdvance() {
    if (autoTimeline) {
      clearInterval(autoTimeline);
      autoTimeline = null;
    }
  }
  // Initial start only if desktop
  if (window.innerWidth > 700) {
    startTimelineAutoAdvance();
  }
  // Always clear timer on resize to mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 700) {
      stopTimelineAutoAdvance();
    }
  });
  // Always clear timer if page hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTimelineAutoAdvance();
  });

  // Make years clickable
  timelineYears.forEach((year, index) => {
    year.addEventListener('click', () => {
      currentYear = index;
      updateTimeline();
    });
  });
});