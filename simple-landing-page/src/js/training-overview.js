document.addEventListener('DOMContentLoaded', function() {
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
    addBtn('All', 'all', true);
    addBtn('Drilling', 'drilling');
    addBtn('Soft Skills', 'soft-skills');
    addBtn('Mechanical', 'mechanical');
    addBtn('HSE', 'hse');

    filtersContainer.addEventListener('click', e => {
      const btn = e.target.closest('.team-filter-btn');
      if(!btn) return;
      currentAccreditation = btn.dataset.accreditation || 'all';
      filtersContainer.querySelectorAll('.team-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRows(getFilteredCourses());
    });
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