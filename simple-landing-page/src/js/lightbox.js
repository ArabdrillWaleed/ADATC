document.addEventListener('DOMContentLoaded', function() {
    // DIT cycling configuration
    const ditImages = [
        { src: 'images/Dit1.png', caption: 'H2S Train The Trainer' },
        { src: 'images/Fallprot.png', caption: 'Fall Protection Train The Trainer' },
        { src: 'images/Manualhandling.png', caption: 'Manual Handling Train The Trainer' }
    ];
    let ditIndex = 0;
    let ditAutoTimer = null;
    let isDitMode = false;

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    
    // Create DIT navigation buttons
    const ditNavContainer = document.createElement('div');
    ditNavContainer.className = 'dit-nav-container';
    ditNavContainer.style.display = 'none';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'dit-nav-btn dit-nav-prev';
    prevButton.innerHTML = '←';
    prevButton.setAttribute('aria-label', 'Previous');
    
    const nextButton = document.createElement('button');
    nextButton.className = 'dit-nav-btn dit-nav-next';
    nextButton.innerHTML = '→';
    nextButton.setAttribute('aria-label', 'Next');
    
    const captionDiv = document.createElement('div');
    captionDiv.className = 'dit-caption';
    captionDiv.style.display = 'none';
    
    ditNavContainer.appendChild(prevButton);
    ditNavContainer.appendChild(nextButton);
    
    // Append elements
    lightboxContent.appendChild(lightboxImage);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(closeButton);
    lightbox.appendChild(captionDiv);
    lightbox.appendChild(ditNavContainer);
    document.body.appendChild(lightbox);
    
    // Media gallery lightbox navigation for images
    const mediaImages = Array.from(document.querySelectorAll('.media-img'));
    let mediaIndex = 0;
    let isMediaMode = false;

    // Create navigation arrows for media images
    const mediaNavContainer = document.createElement('div');
    mediaNavContainer.className = 'media-nav-container';
    mediaNavContainer.style.display = 'none';
    const mediaPrevBtn = document.createElement('button');
    mediaPrevBtn.className = 'media-nav-btn media-nav-prev';
    mediaPrevBtn.innerHTML = '←';
    mediaPrevBtn.setAttribute('aria-label', 'Previous Image');
    const mediaNextBtn = document.createElement('button');
    mediaNextBtn.className = 'media-nav-btn media-nav-next';
    mediaNextBtn.innerHTML = '→';
    mediaNextBtn.setAttribute('aria-label', 'Next Image');
    mediaNavContainer.appendChild(mediaPrevBtn);
    mediaNavContainer.appendChild(mediaNextBtn);
    lightbox.appendChild(mediaNavContainer);

    function showMediaImage(idx) {
        mediaIndex = (idx + mediaImages.length) % mediaImages.length;
        isMediaMode = true;
        lightboxImage.src = mediaImages[mediaIndex].src;
        lightboxImage.alt = mediaImages[mediaIndex].alt || '';
        lightboxImage.style.width = '';
        lightboxImage.style.height = '';
        mediaNavContainer.style.display = 'flex';
        ditNavContainer.style.display = 'none';
        captionDiv.style.display = 'none';
        lightbox.classList.add('active');
        window.addEventListener('resize', boundLightboxResize);
    }

    // Add click handlers to all accreditation images
    const boundLightboxResize = () => {
        if(!lightbox.classList.contains('active')) return;
        // adjust size responsively when window resizes
        if(lightboxImage && lightboxImage.naturalWidth){
            const twoX = lightboxImage.naturalWidth * 2;
            if(twoX > window.innerWidth){
                lightboxImage.style.width = '90vw';
            } else {
                lightboxImage.style.width = twoX + 'px';
            }
            lightboxImage.style.height = 'auto';
        }
    };

    function updateDitImage(idx) {
        ditIndex = idx;
        lightboxImage.style.width = '';
        lightboxImage.style.height = '';
        lightboxImage.onload = function(){
            lightboxImage.style.width = Math.min(window.innerWidth * 0.95, this.naturalWidth * 3) + 'px';
            lightboxImage.style.height = 'auto';
        };
        lightboxImage.src = ditImages[ditIndex].src;
        captionDiv.textContent = ditImages[ditIndex].caption;
    }

    function startDitAutoCycle() {
        stopDitAutoCycle();
        ditAutoTimer = setInterval(() => {
            ditIndex = (ditIndex + 1) % ditImages.length;
            updateDitImage(ditIndex);
        }, 3500);
    }

    function stopDitAutoCycle() {
        if (ditAutoTimer) clearInterval(ditAutoTimer);
        ditAutoTimer = null;
    }

    document.querySelectorAll('.accreditation-image').forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const src = this.dataset.largeSrc || this.dataset.lightboxSrc || this.src || this.getAttribute('href');
            if(!src) return;
            
            // Check if this is DIT trigger
            const container = this.closest('.accreditation-image-container');
            isDitMode = container && container.classList.contains('dit-trigger');
            
            if (isDitMode) {
                ditIndex = 0;
                updateDitImage(0);
                ditNavContainer.style.display = 'flex';
                captionDiv.style.display = 'block';
                startDitAutoCycle();
            } else {
                lightboxImage.style.width = '';
                lightboxImage.style.height = '';
                lightboxImage.onload = function(){
                    lightboxImage.style.width = Math.min(window.innerWidth * 0.95, this.naturalWidth * 3) + 'px';
                    lightboxImage.style.height = 'auto';
                };
                lightboxImage.src = src;
                ditNavContainer.style.display = 'none';
                captionDiv.style.display = 'none';
            }
            
            lightbox.classList.add('active');
            window.addEventListener('resize', boundLightboxResize);
        });
    });

    // Make entire card clickable for accreditations
    document.querySelectorAll('.accreditation-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Find the image within this card
            const img = this.querySelector('.accreditation-image');
            if(!img) return;
            const src = img.dataset.largeSrc || img.dataset.lightboxSrc || img.src;
            if(!src) return;
            
            // Check if this is DIT trigger
            const container = this.querySelector('.accreditation-image-container');
            isDitMode = container && container.classList.contains('dit-trigger');
            
            if (isDitMode) {
                ditIndex = 0;
                updateDitImage(0);
                ditNavContainer.style.display = 'flex';
                captionDiv.style.display = 'block';
                startDitAutoCycle();
            } else {
                lightboxImage.style.width = '';
                lightboxImage.style.height = '';
                lightboxImage.onload = function(){
                    lightboxImage.style.width = Math.min(window.innerWidth * 0.95, this.naturalWidth * 3) + 'px';
                    lightboxImage.style.height = 'auto';
                };
                lightboxImage.src = src;
                ditNavContainer.style.display = 'none';
                captionDiv.style.display = 'none';
            }
            
            lightbox.classList.add('active');
            window.addEventListener('resize', boundLightboxResize);
        });
    });
    
    // DIT navigation handlers
    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        ditIndex = (ditIndex - 1 + ditImages.length) % ditImages.length;
        updateDitImage(ditIndex);
        startDitAutoCycle();
    });
    
    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        ditIndex = (ditIndex + 1) % ditImages.length;
        updateDitImage(ditIndex);
        startDitAutoCycle();
    });
    
    // Media navigation handlers
    mediaPrevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showMediaImage(mediaIndex - 1);
    });
    mediaNextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showMediaImage(mediaIndex + 1);
    });
    
    // Close lightbox when clicking close button or outside the image
    closeButton.addEventListener('click', closeLightbox);
    
    // Click anywhere on the lightbox to close it
    lightbox.addEventListener('click', closeLightbox);
    
    // Prevent clicks on the image from closing the lightbox
    lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close lightbox when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // When closing, reset media mode
    const originalCloseLightbox = closeLightbox;
    closeLightbox = function() {
        originalCloseLightbox();
        isMediaMode = false;
        mediaNavContainer.style.display = 'none';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        stopDitAutoCycle();
        isDitMode = false;
        ditNavContainer.style.display = 'none';
        captionDiv.style.display = 'none';
        // Reset image and sizing to avoid retaining large inline styles
        lightboxImage.src = '';
        lightboxImage.style.width = '';
        lightboxImage.style.height = '';
        // remove resize handler
        window.removeEventListener('resize', boundLightboxResize);
    }
});