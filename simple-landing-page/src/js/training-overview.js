document.addEventListener('DOMContentLoaded', function() {
    const ctaBtn = document.getElementById('overview-cta-btn');
  const filtersContainer = document.getElementById('overview-accreditation-filters');
  const table = document.getElementById('course-overview-table');
  if (!filtersContainer || !table) return;

  const tbody = table.querySelector('tbody');
  let currentAccreditation = 'all';

  // Button builder
  function buildFilters() {
    filtersContainer.innerHTML = '';
    const addBtn = (label, value, isActive=false) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'team-filter-btn' + (isActive ? ' active' : '');
      b.dataset.accreditation = value;
      b.textContent = label;
      filtersContainer.appendChild(b);
    };
    addBtn('All Portfolio', 'all', true);
    addBtn('Drilling Portfolio', 'drilling');
    addBtn('Electrical Portfolio', 'electrical');
    addBtn('Soft Skills Portfolio', 'soft-skills');
    addBtn('Mechanical Portfolio', 'mechanical');
    addBtn('HSE Portfolio', 'hse');

    filtersContainer.addEventListener('click', e => {
      const btn = e.target.closest('.team-filter-btn');
      if(!btn) return;
      const value = btn.dataset.accreditation || 'all';
      currentAccreditation = value;
      filtersContainer.querySelectorAll('.team-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRows(getFilteredCourses());
      // Update CTA button label and link
      if (ctaBtn) {
        let label;
        if (value === 'all') {
          label = 'All Portfolio';
          ctaBtn.href = 'courses.html';
        } else {
          // Remove 'Portfolio' if present, then add it
          let base = btn.textContent.replace(/ Portfolio$/i, '');
          label = base + ' Portfolio';
          ctaBtn.href = `courses.html?q=&category=${encodeURIComponent(value)}`;
        }
        ctaBtn.textContent = label;
      }
    });
    // Initial CTA button state
    if (ctaBtn) {
      ctaBtn.textContent = 'All Portfolio';
      ctaBtn.href = 'courses.html';
    }
  }

  // Dummy data loader (replace with actual data source if needed)
  function getCourses() {
    // This should be replaced with actual course data loading logic
    return Array.from(document.querySelectorAll('[data-course]')).map(el => ({
      title: el.dataset.title,
      duration: el.dataset.duration,
      accreditation: el.dataset.accreditation,
      category: el.dataset.category
    }));
  }

  function getFilteredCourses() {
    const allCourses = getCourses();
    if(currentAccreditation === 'all') return allCourses;
    return allCourses.filter(c => (c.category || '').toLowerCase() === currentAccreditation);
  }

  function renderRows(courses) {
    tbody.innerHTML = '';
    courses.forEach(course => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="cell-title" data-label="Course">
          <span class="course-name">${course.title}</span>
        </td>
        <td data-label="Duration"><span class="badge badge-neutral">${course.duration || ''}</span></td>
        <td data-label="Accreditation">${course.accreditation ? `<span class=\"badge\">${course.accreditation}</span>` : '<span class=\"badge badge-muted\">—</span>'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  buildFilters();
  renderRows(getFilteredCourses());
});