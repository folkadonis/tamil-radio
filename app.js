/* ===== Station Data ===== */
const STATIONS = [
  /* — Chennai / India — confirmed live on radios.crabdance.com:8002 — */
  { id: 1, name: "Radio Mirchi 98.3",  freq: "98.3 MHz",   region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/1" },
  { id: 2, name: "Suryan FM 93.5",     freq: "93.5 MHz",   region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/2" },
  { id: 3, name: "Hello FM 106.4",     freq: "106.4 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/3" },
  { id: 4, name: "Big FM 92.7",        freq: "92.7 MHz",   region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/4" },
  { id: 5, name: "Radio City 91.1",    freq: "91.1 MHz",   region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/5" },
];

/* ===== DOM Refs ===== */
const grid        = document.getElementById("stationGrid");
const emptyState  = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const tabsEl      = document.getElementById("tabs");
const audio       = document.getElementById("audioEl");
const playBtn     = document.getElementById("playBtn");
const prevBtn     = document.getElementById("prevBtn");
const nextBtn     = document.getElementById("nextBtn");
const volumeEl    = document.getElementById("volumeSlider");
const playerStation = document.getElementById("playerStation");
const playerFreq    = document.getElementById("playerFreq");
const visualizer    = document.getElementById("visualizer");
const themeToggle   = document.getElementById("themeToggle");

/* ===== State ===== */
let currentStation = null;
let currentCat     = "all";
let isPlaying      = false;
let isLoading      = false;
let filteredList   = [...STATIONS];
const offlineIds   = new Set();
let retryTimer     = null;

/* ===== Theme ===== */
function initTheme() {
  const saved = localStorage.getItem("radio-theme");
  if (saved === "light") document.documentElement.setAttribute("data-theme", "light");
}
initTheme();

themeToggle.addEventListener("click", () => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  if (isLight) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("radio-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("radio-theme", "light");
  }
});

/* ===== Render ===== */
function getInitials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("");
}

function renderStations() {
  const query = searchInput.value.toLowerCase().trim();

  filteredList = STATIONS.filter(s => {
    const matchesCat = currentCat === "all" || s.cat === currentCat;
    const matchesSearch = !query || s.name.toLowerCase().includes(query) || s.region.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filteredList.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  grid.innerHTML = filteredList.map(s => {
    const isActive  = currentStation && currentStation.id === s.id;
    const isOffline = offlineIds.has(s.id);
    return `
    <div class="station-card${isActive ? ' active' : ''}${isOffline ? ' offline' : ''}"
         data-id="${s.id}" id="station-${s.id}">
      <div class="station-avatar">${getInitials(s.name)}</div>
      <div class="station-details">
        <p class="station-name">${s.name}</p>
        <div class="station-region">
          <span>${s.region}</span>
          <span class="dot"></span>
          <span>${s.freq}</span>
        </div>
        <div class="station-live">
          <span class="live-dot"></span> LIVE
        </div>
        <div class="station-offline">
          <span class="offline-dot"></span> OFFLINE
        </div>
      </div>
    </div>
  `;
  }).join("");

  // Attach click handlers
  grid.querySelectorAll(".station-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = parseInt(card.dataset.id);
      const station = STATIONS.find(s => s.id === id);
      if (!station) return;
      if (offlineIds.has(station.id) && currentStation && currentStation.id === station.id) {
        // Retry same offline station
        offlineIds.delete(station.id);
        selectStation(station);
      } else {
        selectStation(station);
      }
    });
  });
}

/* ===== Station Selection ===== */
function selectStation(station) {
  const isSame = currentStation && currentStation.id === station.id;
  const isOff  = offlineIds.has(station.id);

  if (isSame && !isOff) {
    togglePlay();
    return;
  }

  currentStation = station;
  playerStation.textContent = station.name;
  playerStation.classList.remove("has-error");
  playerFreq.textContent = station.region + " · " + station.freq;

  audio.src = station.url;
  audio.load();
  playStream();
  renderStations();
}

/* ===== Playback ===== */
function playStream() {
  clearTimeout(retryTimer);
  setLoading(true);
  setError(false);
  audio.play().then(() => {
    setLoading(false);
    setPlaying(true);
    if (currentStation) offlineIds.delete(currentStation.id);
  }).catch(() => {
    setLoading(false);
    setPlaying(false);
    markCurrentOffline();
  });
}

function markCurrentOffline() {
  if (!currentStation) return;
  offlineIds.add(currentStation.id);
  setError(true);
  renderStations();
}

function setError(val) {
  playerStation.classList.toggle("has-error", val);
  if (val && currentStation) {
    playerFreq.textContent = "Stream unavailable — tap to retry";
  }
}

function togglePlay() {
  if (!currentStation) return;
  if (audio.paused) {
    playStream();
  } else {
    audio.pause();
    setPlaying(false);
  }
}

function setPlaying(val) {
  isPlaying = val;
  playBtn.classList.toggle("is-playing", val);
  visualizer.classList.toggle("playing", val);
}

function setLoading(val) {
  isLoading = val;
  playBtn.classList.toggle("is-loading", val);
}

/* ===== Audio Events ===== */
audio.addEventListener("playing", () => {
  setLoading(false);
  setPlaying(true);
  setError(false);
  if (currentStation) {
    offlineIds.delete(currentStation.id);
    playerFreq.textContent = currentStation.region + " · " + currentStation.freq;
    renderStations();
  }
});
audio.addEventListener("waiting", () => { setLoading(true); });
audio.addEventListener("pause",   () => { setPlaying(false); });
audio.addEventListener("error",   () => {
  setLoading(false);
  setPlaying(false);
  markCurrentOffline();
});

/* ===== Controls ===== */
playBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx = filteredList.findIndex(s => s.id === currentStation.id);
  const prev = idx > 0 ? filteredList[idx - 1] : filteredList[filteredList.length - 1];
  selectStation(prev);
});

nextBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx = filteredList.findIndex(s => s.id === currentStation.id);
  const next = idx < filteredList.length - 1 ? filteredList[idx + 1] : filteredList[0];
  selectStation(next);
});

volumeEl.addEventListener("input", () => {
  audio.volume = volumeEl.value / 100;
});
audio.volume = 0.8;

/* ===== Search ===== */
searchInput.addEventListener("input", renderStations);

/* ===== Tabs ===== */
tabsEl.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  currentCat = tab.dataset.cat;
  tabsEl.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  renderStations();
});

/* ===== Keyboard Shortcuts ===== */
document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.code === "Space") { e.preventDefault(); togglePlay(); }
  if (e.code === "ArrowRight") nextBtn.click();
  if (e.code === "ArrowLeft")  prevBtn.click();
});

/* ===== Retry on freq click ===== */
playerFreq.addEventListener("click", () => {
  if (currentStation && playerFreq.textContent.includes("retry")) {
    offlineIds.delete(currentStation.id);
    selectStation(currentStation);
  }
});

/* ===== Init ===== */
renderStations();
