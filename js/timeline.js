// ================================
//  Tijdlijn Loader & Renderer
// ================================

async function loadTimeline() {
  const timelineSection = document.querySelector('#timeline-section');
  if (!timelineSection) {
    console.warn('Tijdlijnsectie niet gevonden in HTML.');
    return;
  }

  timelineSection.innerHTML = '<h2>Tijdlijn</h2><p>Bezig met laden...</p>';

  try {
    // JSON ophalen
    const response = await fetch(`${window.siteBase}static/data/timeline.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      timelineSection.innerHTML = '<h2>Tijdlijn</h2><p>Geen data gevonden.</p>';
      return;
    }

    renderTimeline(data, timelineSection);

  } catch (err) {
    console.error('Kon tijdlijn niet laden:', err);
    timelineSection.innerHTML = `
      <h2>Tijdlijn</h2>
      <p style="color:#ff7777;">Er is een fout opgetreden bij het laden van de tijdlijn.</p>
    `;
  }
}


// ================================
//  Tijdlijn Renderer
// ================================

function renderTimeline(data, container) {
  container.innerHTML = '<h2>Tijdlijn</h2>';

  const list = document.createElement('div');
  list.className = 'timeline-list';

  // Sorteer chronologisch (oudste bovenaan)
  data.sort((a, b) => {
    const [da, ma, ya] = a.date.split('/').map(Number);
    const [db, mb, yb] = b.date.split('/').map(Number);
    return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
  });

  const safe = (value) => (value ? value : '—');

  // Maak elk tijdlijn-item
  data.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'timeline-entry';

    const imageUrl = item.image
      ? (item.image.startsWith('http') ? item.image : `${window.siteBase}${item.image}`)
      : `${window.siteBase}static/images/placeholder.jpg`;

    entry.innerHTML = `
      <img src="${imageUrl}" alt="${safe(item.title)}" />
      <div class="timeline-content">
        <h3>${safe(item.title)}</h3>
        <p>${safe(item.description)}</p>
        <p class="timeline-date">${safe(item.date)}</p>
        ${item.source ? `<a href="${item.source}" target="_blank" rel="noopener">Bron</a>` : ''}
      </div>
    `;

    list.appendChild(entry);
  });

  container.appendChild(list);
}


// ================================
//  Init
// ================================

// Zorg dat de tijdlijn pas wordt geladen nadat de DOM klaar is
window.addEventListener('DOMContentLoaded', loadTimeline);
