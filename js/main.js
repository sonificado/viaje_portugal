// Main application logic
const app = {
  currentDay: 1,
  daysData: [],

  async init() {
    try {
      // Load all day data
      await this.loadAllDays();
      // Render UI
      this.renderDayNav();
      this.renderDayContent();
      // Initialize route cities
      this.updateRouteCities(1);
    } catch (error) {
      console.error('Error initializing app:', error);
      document.getElementById('main-content').innerHTML = '<p style="text-align:center;padding:2rem;">Error loading data. Please refresh the page.</p>';
    }
  },

  async loadAllDays() {
    try {
      // Try to load from JSON files first
      const promises = [];
      for (let i = 1; i <= 8; i++) {
        promises.push(fetch(`js/data/day${i}.json`)
          .then(res => {
            if (!res.ok) throw new Error(`Failed to load day${i}.json`);
            return res.json();
          })
          .catch(() => null));
      }
      const results = await Promise.all(promises);

      // Check if we got all 8 days successfully
      const validResults = results.filter(r => r !== null);
      if (validResults.length === 8) {
        // All JSON files loaded successfully
        this.daysData = results;
        console.log('✅ All JSON files loaded successfully');
      } else {
        // Some JSON files failed, use embedded data
        console.log(`⚠️ Only ${validResults.length}/8 JSON files loaded, using embedded data`);
        this.daysData = this.getEmbeddedData();
      }
    } catch (error) {
      console.log('Using embedded data due to:', error.message);
      this.daysData = this.getEmbeddedData();
    }
  },

  getEmbeddedData() {
    // No embedded data - all content should be in JSON files
    // This function only returns minimal placeholder data for fallback
    return [];
  },

  renderDayNav() {
    const nav = document.getElementById('day-nav');
    nav.innerHTML = this.daysData.map((day, index) => {
      const dayNum = index + 1;
      const isActive = dayNum === this.currentDay ? 'active' : '';
      const isReady = day.ready ? 'ready' : '';
      return `
        <button class="day-btn ${isActive} ${isReady}" id="btn-${dayNum}" onclick="app.showDay(${dayNum})">
          <span class="day-btn-num">${day.navLabel}</span>
          <span class="day-btn-name">${day.navName}</span>
        </button>
      `;
    }).join('');
  },

  renderDayContent() {
    const main = document.getElementById('main-content');
    const dayData = this.daysData[this.currentDay - 1];

    main.innerHTML = `
      <div class="day-content active" id="day-${this.currentDay}">
        ${this.renderDayHeader(dayData)}
        ${this.renderAlerts(dayData)}
        ${this.renderSections(dayData)}
        ${this.renderTimeline(dayData)}
        ${this.renderSummary(dayData)}
      </div>
    `;
  },

  renderDayHeader(day) {
    return `
      <div class="day-header">
        <div class="day-header-top">
          <h2 class="day-title">${day.title}</h2>
          <span class="day-date">${day.date}</span>
        </div>
        <p class="day-subtitle">${day.subtitle}</p>
      </div>
    `;
  },

  renderAlerts(day) {
    if (!day.alerts || day.alerts.length === 0) return '';
    return day.alerts.map(alert => `
      <div class="alert alert-${alert.type}">
        <strong>${alert.icon} ${alert.title}:</strong> ${alert.content}
      </div>
    `).join('');
  },

  renderSections(day) {
    if (!day.sections || day.sections.length === 0) return '';
    return day.sections.map((section, index) => {
      const driveTimeHtml = section.driveTime ? `
        <div class="drive-row">
          <div class="drive-line"></div>
          <div class="drive-label">${section.driveTime}</div>
          <div class="drive-line"></div>
        </div>
      ` : '';

      return `
        <div class="section">
          <div class="section-header">
            <div class="section-dot"></div>
            <div class="section-name">${section.name}</div>
            ${section.distance ? `<div class="section-dist">${section.distance}</div>` : ''}
          </div>
          ${section.stops ? this.renderStops(section.stops) : ''}
          ${section.content ? section.content : ''}
        </div>
        ${driveTimeHtml}
      `;
    }).join('');
  },

  renderStops(stops) {
    return stops.map(stop => `
      <div class="stop">
        <div class="stop-header" onclick="app.toggle(this.parentElement)">
          <div class="stop-icon ${stop.iconClass}">${stop.icon}</div>
          <div class="stop-top">
            <div class="stop-name-row">
              <span class="stop-name">${stop.name}</span>
              ${stop.pills ? stop.pills.map(pill => `<span class="pill pill-${pill.type}">${pill.text}</span>`).join('') : ''}
            </div>
            <div class="stop-meta">
              ${stop.meta ? stop.meta.map(item => `<span class="meta-item">${item}</span>`).join('') : ''}
            </div>
          </div>
          <div class="chevron">▼</div>
        </div>
        <div class="stop-body">
          ${stop.description ? `<div class="stop-desc">${stop.description}</div>` : ''}
          ${stop.items ? `<div class="stop-items">${stop.items.map(item => `<div class="stop-item">${item}</div>`).join('')}</div>` : ''}
          ${stop.ticketBox ? `<div class="ticket-box">${stop.ticketBox}</div>` : ''}
          ${stop.mapsLink ? `<a class="maps-btn" href="${stop.mapsLink}" target="_blank">📍 ${stop.mapsText || 'Ver en Google Maps'}</a>` : ''}
        </div>
      </div>
    `).join('');
  },

  renderTimeline(day) {
    if (!day.timeline || day.timeline.length === 0) return '';
    return `
      <div class="timeline">
        <div class="tl-title">Itinerario del día</div>
        ${day.timeline.map(item => `
          <div class="tl-row">
            <div class="tl-time"></div>
            <div class="tl-dot"></div>
            <div class="tl-name">${item}</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderSummary(day) {
    if (!day.summary || !day.summary.title) return '';
    return `
      <div class="summary">
        <div class="summary-title">${day.summary.title}</div>
        ${day.summary.rows ? day.summary.rows.map(row => `
          <div class="summary-row">
            <span class="summary-label">${row.label}</span>
            <span class="summary-val">${row.value}</span>
          </div>
        `).join('') : ''}
        ${day.summary.total ? `
          <div class="summary-total">
            <span class="summary-total-lbl">${day.summary.total.label}</span>
            <span class="summary-total-val">${day.summary.total.value}</span>
          </div>
        ` : ''}
      </div>
    `;
  },

  showDay(dayNum) {
    this.currentDay = dayNum;
    this.renderDayNav();
    this.renderDayContent();
    this.updateRouteCities(dayNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  toggle(element) {
    element.classList.toggle('open');
  },

  updateRouteCities(dayNum) {
    const cityDayMap = {
      1: [0, 1],
      2: [1, 2],
      3: [2],
      4: [2],
      5: [2, 3],
      6: [3],
      7: [3, 4],
      8: [4, 5]
    };
    const cities = document.querySelectorAll('.route-city');
    cities.forEach(c => c.classList.remove('active'));
    const indices = cityDayMap[dayNum] || [];
    indices.forEach(i => { if (cities[i]) cities[i].classList.add('active'); });
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => app.init());