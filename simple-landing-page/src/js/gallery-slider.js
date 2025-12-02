document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.querySelector('.gallery-image-container');
  const desc = document.querySelector('.gallery-image-desc');
  const leftArrow = document.querySelector('.gallery-arrow.left');
  const rightArrow = document.querySelector('.gallery-arrow.right');

  // Images and descriptions
  const images = [
    'images/contactus.jpg',
    'images/adla.jpg',
    'images/learningres.png'
  ];
  const descriptions = [
    '1995',
    'ADLA - Placeholder description text goes here.',
    'Center Person 1 - Placeholder description text goes here.'
  ];

  let current = 0;

  function showImage(idx) {
    if (!galleryContainer) return;
    galleryContainer.style.backgroundImage = `url('${images[idx]}')`;
    galleryContainer.style.backgroundSize = 'cover';
    galleryContainer.style.backgroundPosition = 'center';
    desc.textContent = descriptions[idx];
  }

  leftArrow.addEventListener('click', function() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  rightArrow.addEventListener('click', function() {
    current = (current + 1) % images.length;
    showImage(current);
  });

  // Parallax effect on scroll (background position)
  window.addEventListener('scroll', function() {
    if (!galleryContainer) return;
    const rect = galleryContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        galleryContainer.style.backgroundPosition = `center ${scrollPercent * 120}px`; // Increased for stronger effect
    } else {
      galleryContainer.style.backgroundPosition = 'center';
    }
  });

  showImage(current);
});
