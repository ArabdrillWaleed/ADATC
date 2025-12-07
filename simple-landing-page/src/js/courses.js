document.addEventListener('DOMContentLoaded', function() {
    const searchClearBtn = document.getElementById('course-search-clear');
  const modal = document.getElementById('course-modal');
  if(!modal) return;
  
  const courseCards = document.querySelectorAll('.course-card');
  const modalTitle = document.getElementById('course-modal-title');
  const modalDuration = document.getElementById('course-modal-duration');
  const modalBody = document.getElementById('course-modal-body');
  const modalAccreditation = document.getElementById('course-modal-accreditation');
  const registerButton = modal.querySelector('a.btn');
  const searchInput = document.getElementById('course-search-input');
  const searchCount = document.getElementById('course-search-count');
  const noResults = document.getElementById('course-no-results');
  const filtersContainer = document.getElementById('courses-category-filters');
  let currentCategory = 'all';

  function openModal(card) {
    const summary = card.querySelector('.course-summary');
    if (!summary) return;
    
    const courseTitle = summary.dataset.title || '';
    modalTitle.textContent = courseTitle;
    modalDuration.textContent = summary.dataset.duration || '';
    modalBody.innerHTML = `<p>${summary.dataset.desc || ''}</p>`;
    modalAccreditation.textContent = summary.dataset.accreditation || 'To be added';
    
    // Update Register Now button with course name in URL
    const registerNowBtn = document.getElementById('register-now-btn');
    if (registerNowBtn) {
      const subject = encodeURIComponent(`${courseTitle} Registration Inquiry`);
      registerNowBtn.href = `contact.html?subject=${subject}`;
    }
    
    // Scroll modal body to top when opening
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
    
    // Trigger animation
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.setAttribute('aria-hidden', 'false');
    }, 10);
    document.body.classList.add('modal-open');
  }

  // Build accreditation filter buttons dynamically
  function buildCategoryFilters() {
    if(!filtersContainer) return;
    filtersContainer.innerHTML = '';
    const addBtn = (label, value, isActive=false) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'team-filter-btn' + (isActive ? ' active' : '');
      b.dataset.category = value;
      b.textContent = label;
      filtersContainer.appendChild(b);
    };
    addBtn('All', 'all', true);
    addBtn('Drilling', 'drilling');
    addBtn('Electrical', 'electrical');
    addBtn('Soft Skills', 'soft-skills');
    addBtn('Mechanical', 'mechanical');
    addBtn('HSE', 'hse');

    filtersContainer.addEventListener('click', e => {
      const btn = e.target.closest('.team-filter-btn');
      if(!btn) return;
      currentCategory = btn.dataset.category || 'all';
      filtersContainer.querySelectorAll('.team-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters(searchInput ? searchInput.value : '');
    });
  }

  function applyFilters(searchTerm) {
    searchTerm = (searchTerm || '').toLowerCase().trim();
    // On mobile, reset zoom after search
    if (window.innerWidth <= 700) {
      document.body.style.zoom = '';
    }
    let visibleCount = 0;
    courseCards.forEach(card => {
      const summary = card.querySelector('.course-summary');
      if(!summary) return;
      const title = (summary.dataset.title || '').toLowerCase();
      const desc = (summary.dataset.desc || '').toLowerCase();
      const category = (summary.dataset.category || '').toLowerCase();
      // Determine category match
      let categoryMatch = true;
      if(currentCategory !== 'all') {
        categoryMatch = category === currentCategory;
      }
      // Determine search match
      const searchMatch = !searchTerm || title.includes(searchTerm) || desc.includes(searchTerm);
      const visible = categoryMatch && searchMatch;
      card.style.display = visible ? '' : 'none';
      if(visible) visibleCount++;
    });
    // Show/hide no results
    if(noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if(filtersContainer) {
    buildCategoryFilters();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      modal.style.display = 'none';
    }, 450);
    document.body.classList.remove('modal-open');
  }

    // Make entire card clickable and set up icons
  courseCards.forEach(card => {
    // Set up icon if data-image exists
    const summary = card.querySelector('.course-summary');
    if (summary && summary.dataset.image) {
      const iconDiv = document.createElement('div');
      iconDiv.className = 'course-icon';
      iconDiv.style.backgroundImage = `url('${summary.dataset.image}')`;
      card.appendChild(iconDiv);
    }

    // Clickable functionality
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });  // Search functionality
  function filterCourses(query) {
    applyFilters(query);
  }

  // Add search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterCourses(e.target.value));
    // Custom clear (X) button logic
    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', function() {
        searchInput.value = '';
        filterCourses('');
        searchInput.focus();
      });
      // Show/hide clear button based on input value
      searchInput.addEventListener('input', function() {
        searchClearBtn.style.display = searchInput.value ? 'flex' : 'none';
      });
      // Initialize clear button visibility
      searchClearBtn.style.display = searchInput.value ? 'flex' : 'none';
    }
    // If a query param ?category= exists, activate that filter
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      currentCategory = category;
      // Activate the correct button
      if (filtersContainer) {
        filtersContainer.querySelectorAll('.team-filter-btn').forEach(b => {
          if (b.dataset.category === category) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      }
      applyFilters(searchInput ? searchInput.value : '');
    } else {
      // Initialize without count
      searchCount.textContent = ``;
      // Initial filter application
      filterCourses('');
    }
  }

  // Add event listeners for both close button and backdrop
  const closeButton = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
});