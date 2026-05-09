/* ===== TV Channel Data (confirmed-live servers only) ===== */
const TV_CHANNELS = [
  { id:"tv1",  name:"DD Podhigai",      logo:"https://upload.wikimedia.org/wikipedia/en/d/d2/DDPodhigaiLogo.jpg",                                                         url:"https://mk9qa798qwyb-hls-live.wmncdn.net/824/abrstream/bbb19eae240ec100af921d511efc86a0.sdp/mono.m3u8" },
  { id:"tv2",  name:"Raj TV",           logo:"https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Raj_TV_Tamil.png/250px-Raj_TV_Tamil.png",                               url:"http://z5ams.akamaized.net/rajtv/tracks-v1a1/index.m3u8" },
  { id:"tv3",  name:"Raj News 24x7",    logo:"https://i.pinimg.com/originals/8b/6f/57/8b6f578b0b45b83392ed274a19429804.jpg",                                              url:"http://z5ams.akamaized.net/rajnews/tracks-v1a1/index.m3u8" },
  { id:"tv4",  name:"Raj Musix Tamil",  logo:"http://www.rajtvnet.in/Raj_Net/raj_logos/Raj_msx_tamil.png",                                                                url:"http://z5ams.akamaized.net/rajmusix/tracks-v1a1/index.m3u8" },
  { id:"tv5",  name:"Zee Tamil",        logo:"https://upload.wikimedia.org/wikipedia/en/1/13/Zee_Tamil_Logo.jpg",                                                         url:"http://z5ams.akamaized.net/zeetamil/tracks-v1a1/index.m3u8" },
  { id:"tv6",  name:"Makkal TV",        logo:"https://upload.wikimedia.org/wikipedia/en/7/71/Makkal_TV_logo.jpg",                                                         url:"http://z5ams.akamaized.net/makkaltv/tracks-v1a1/index.m3u8" },
  { id:"tv7",  name:"Peppers TV",       logo:"https://www.lycatv.tv/img/upload/contents/channelpage/channels/07103952peppers-tv.png",                                     url:"http://live.wmncdn.net/peppers/live.stream/tracks-v1a1/index.m3u8" },
  { id:"tv8",  name:"Tamilian TV",      logo:"https://media.glassdoor.com/sqll/605132/tamilan-television-squarelogo-1472818890022.png",                                   url:"http://8ovgdk34qmpw-hls-live.wmncdn.net/307/tamilan/live.stream/tracks-v1a1/index.m3u8" },
  { id:"tv9",  name:"IBC Bakthi",       logo:"https://i.ytimg.com/vi/lzHseHvLBiY/hqdefault_live.jpg",                                                                    url:"https://cdn.ibctamil.com/ibc-bakthi/smil:ibcbakthi.smil/index.m3u8" },
  { id:"tv10", name:"IBC Tamil Comedy", logo:"https://old.ibctamil.com/images/flogo.png",                                                                                 url:"https://cdn.ibctamil.com/ibc-comedy/smil:ibccomedy.smil/chunklist.m3u8" },
  { id:"tv11", name:"IBC Tamil Music",  logo:"https://images.plurk.com/4hxxn7NCCXpC0JiYYiyM.jpg",                                                                        url:"https://cdn.ibctamil.com/ibc-music/smil:ibcmusic.smil/index.m3u8" },
  { id:"tv12", name:"Sivan TV HD",      logo:"http://sivantv.com/wp-content/uploads/2017/10/Logo-site.png",                                                               url:"https://sivan.vedge.infomaniak.com/livecast/sivan/playlist.m3u8" },
];

/* ===== Radio Station Data ===== */
const STATIONS = [
  { id: 1, name: "Radio Mirchi 98.3",   freq: "98.3 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/1" },
  { id: 2, name: "Suryan FM 93.5",      freq: "93.5 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/2" },
  { id: 3, name: "Hello FM 106.4",      freq: "106.4 MHz", region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/3" },
  { id: 4, name: "Big FM 92.7",         freq: "92.7 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/4" },
  { id: 5, name: "Radio City 91.1",     freq: "91.1 MHz",  region: "Chennai", cat: "india", url: "http://radios.crabdance.com:8002/5" },
  { id: 6, name: "AIR FM Gold Chennai", freq: "101.4 MHz", region: "Chennai", cat: "india", url: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio005/hlspbaudio00564kbps.m3u8" },
  { id: 7, name: "AIR Rainbow Chennai", freq: "101.9 MHz", region: "Chennai", cat: "india", url: "https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspbaudio004/hlspbaudio00464kbps.m3u8" },
];

/* ===== DOM Refs ===== */
const grid          = document.getElementById("stationGrid");
const tvGrid        = document.getElementById("tvGrid");
const emptyState    = document.getElementById("emptyState");
const searchInput   = document.getElementById("searchInput");
const tabsEl        = document.getElementById("tabs");
const audio         = document.getElementById("audioEl");
const playBtn       = document.getElementById("playBtn");
const prevBtn       = document.getElementById("prevBtn");
const nextBtn       = document.getElementById("nextBtn");
const volumeEl      = document.getElementById("volumeSlider");
const playerStation = document.getElementById("playerStation");
const playerFreq    = document.getElementById("playerFreq");
const visualizer    = document.getElementById("visualizer");
const themeToggle   = document.getElementById("themeToggle");
const tvModal       = document.getElementById("tvModal");
const tvVideo       = document.getElementById("tvVideo");
const tvModalName   = document.getElementById("tvModalName");
const tvModalClose  = document.getElementById("tvModalClose");

/* ===== State ===== */
let currentStation = null;
let currentCat     = "radio";
let isPlaying      = false;
let isLoading      = false;
let filteredList   = [...STATIONS];
const offlineIds   = new Set();
let hlsInstance    = null;
let tvHlsInstance  = null;
let currentTV      = null;

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

/* ===== Radio Render ===== */
function getInitials(name) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("");
}

function renderStations() {
  const query = searchInput.value.toLowerCase().trim();
  filteredList = STATIONS.filter(s => {
    const matchesCat    = currentCat === "radio" || s.cat === currentCat;
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
    <div class="station-card${isActive ? " active" : ""}${isOffline ? " offline" : ""}" data-id="${s.id}">
      <div class="station-avatar">${getInitials(s.name)}</div>
      <div class="station-details">
        <p class="station-name">${s.name}</p>
        <div class="station-region"><span>${s.region}</span><span class="dot"></span><span>${s.freq}</span></div>
        <div class="station-live"><span class="live-dot"></span> LIVE</div>
        <div class="station-offline"><span class="offline-dot"></span> OFFLINE</div>
      </div>
    </div>`;
  }).join("");

  grid.querySelectorAll(".station-card").forEach(card => {
    card.addEventListener("click", () => {
      const station = STATIONS.find(s => s.id === parseInt(card.dataset.id));
      if (station) selectStation(station);
    });
  });
}

/* ===== TV Render ===== */
function renderTV() {
  const query = searchInput.value.toLowerCase().trim();
  const list  = TV_CHANNELS.filter(c => !query || c.name.toLowerCase().includes(query));

  tvGrid.innerHTML = list.map(c => `
    <div class="tv-card" data-tvid="${c.id}">
      <div class="tv-logo-wrap">
        <img class="tv-logo" src="${c.logo}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="tv-logo-fallback" style="display:none">${getInitials(c.name)}</div>
      </div>
      <div class="tv-info">
        <p class="tv-name">${c.name}</p>
        <div class="station-live"><span class="live-dot"></span> LIVE</div>
      </div>
      <div class="tv-play-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>`).join("");

  tvGrid.querySelectorAll(".tv-card").forEach(card => {
    card.addEventListener("click", () => {
      const ch = TV_CHANNELS.find(c => c.id === card.dataset.tvid);
      if (ch) openTVPlayer(ch);
    });
  });
}

/* ===== TV Player ===== */
function openTVPlayer(channel) {
  currentTV = channel;
  tvModalName.textContent = channel.name;
  tvModal.classList.add("open");
  document.body.style.overflow = "hidden";

  if (tvHlsInstance) { tvHlsInstance.destroy(); tvHlsInstance = null; }

  if (Hls.isSupported()) {
    tvHlsInstance = new Hls({ lowLatencyMode: true });
    tvHlsInstance.loadSource(channel.url);
    tvHlsInstance.attachMedia(tvVideo);
    tvHlsInstance.on(Hls.Events.MANIFEST_PARSED, () => tvVideo.play().catch(() => {}));
  } else if (tvVideo.canPlayType("application/vnd.apple.mpegurl")) {
    tvVideo.src = channel.url;
    tvVideo.play().catch(() => {});
  }
}

function closeTVPlayer() {
  tvModal.classList.remove("open");
  document.body.style.overflow = "";
  tvVideo.pause();
  tvVideo.src = "";
  if (tvHlsInstance) { tvHlsInstance.destroy(); tvHlsInstance = null; }
  currentTV = null;
}

tvModalClose.addEventListener("click", closeTVPlayer);
tvModal.addEventListener("click", e => { if (e.target === tvModal) closeTVPlayer(); });

/* ===== Tab Switching ===== */
function setView(cat) {
  currentCat = cat;
  const isTV = cat === "tv";
  grid.style.display      = isTV ? "none" : "";
  tvGrid.style.display    = isTV ? "grid" : "none";
  emptyState.style.display = "none";
  searchInput.placeholder = isTV ? "Search channels..." : "Search stations...";
  if (isTV) renderTV();
  else      renderStations();
}

tabsEl.addEventListener("click", e => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  tabsEl.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  setView(tab.dataset.cat);
});

/* ===== Station Selection ===== */
function selectStation(station) {
  const isSame = currentStation && currentStation.id === station.id;
  const isOff  = offlineIds.has(station.id);
  if (isSame && !isOff) { togglePlay(); return; }

  currentStation = station;
  playerStation.textContent = station.name;
  playerStation.classList.remove("has-error");
  playerFreq.textContent = station.region + " · " + station.freq;
  loadStream(station.url);
  renderStations();
}

/* ===== Stream Loader ===== */
function loadStream(url) {
  if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null; }
  if (url.endsWith(".m3u8") && Hls.isSupported()) {
    hlsInstance = new Hls({ lowLatencyMode: true });
    hlsInstance.loadSource(url);
    hlsInstance.attachMedia(audio);
    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => playStream());
    hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) { setLoading(false); markCurrentOffline(); }
    });
  } else {
    audio.src = url;
    audio.load();
    playStream();
  }
}

/* ===== Playback ===== */
function playStream() {
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
  if (val && currentStation) playerFreq.textContent = "Stream unavailable — tap to retry";
}

function togglePlay() {
  if (!currentStation) return;
  if (audio.paused) {
    if (hlsInstance) playStream();
    else loadStream(currentStation.url);
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
  setLoading(false); setPlaying(true); setError(false);
  if (currentStation) {
    offlineIds.delete(currentStation.id);
    playerFreq.textContent = currentStation.region + " · " + currentStation.freq;
    renderStations();
  }
});
audio.addEventListener("waiting", () => setLoading(true));
audio.addEventListener("pause",   () => setPlaying(false));
audio.addEventListener("error",   () => { setLoading(false); setPlaying(false); markCurrentOffline(); });

/* ===== Controls ===== */
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx  = filteredList.findIndex(s => s.id === currentStation.id);
  selectStation(idx > 0 ? filteredList[idx - 1] : filteredList[filteredList.length - 1]);
});
nextBtn.addEventListener("click", () => {
  if (!currentStation) return;
  const idx  = filteredList.findIndex(s => s.id === currentStation.id);
  selectStation(idx < filteredList.length - 1 ? filteredList[idx + 1] : filteredList[0]);
});
volumeEl.addEventListener("input", () => { audio.volume = volumeEl.value / 100; });
audio.volume = 0.8;

searchInput.addEventListener("input", () => {
  if (currentCat === "tv") renderTV();
  else renderStations();
});

playerFreq.addEventListener("click", () => {
  if (currentStation && playerFreq.textContent.includes("retry")) {
    offlineIds.delete(currentStation.id);
    selectStation(currentStation);
  }
});

document.addEventListener("keydown", e => {
  if (e.target.tagName === "INPUT") return;
  if (e.key === "Escape") { closeTVPlayer(); closeCommunity(); }
  if (e.code === "Space" && currentCat !== "tv") { e.preventDefault(); togglePlay(); }
  if (e.code === "ArrowRight") nextBtn.click();
  if (e.code === "ArrowLeft")  prevBtn.click();
});

/* ===== Community Voice (Jitsi iframe) ===== */
const communityBtn   = document.getElementById("communityBtn");
const communityModal = document.getElementById("communityModal");
const communityClose = document.getElementById("communityClose");
const jitsiContainer = document.getElementById("jitsiContainer");

const JITSI_SRC = "https://meet.jit.si/TamilRadioCommunity2024"
  + "#config.startWithVideoMuted=true"
  + "&config.startWithAudioMuted=false"
  + "&config.prejoinPageEnabled=false"
  + "&config.toolbarButtons=[%22microphone%22,%22hangup%22,%22participants-pane%22]"
  + "&interfaceConfig.SHOW_JITSI_WATERMARK=false"
  + "&interfaceConfig.TOOLBAR_ALWAYS_VISIBLE=true";

function openCommunity() {
  communityModal.classList.add("open");
  communityModal.setAttribute("aria-hidden", "false");
  communityBtn.classList.add("active");
  if (jitsiContainer.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = JITSI_SRC;
  iframe.allow = "camera; microphone; fullscreen; display-capture; autoplay";
  iframe.setAttribute("allowfullscreen", "true");
  jitsiContainer.appendChild(iframe);
}

function closeCommunity() {
  communityModal.classList.remove("open");
  communityModal.setAttribute("aria-hidden", "true");
  communityBtn.classList.remove("active");
  jitsiContainer.innerHTML = "";
}

communityBtn.addEventListener("click", openCommunity);
communityClose.addEventListener("click", closeCommunity);
communityModal.addEventListener("click", e => { if (e.target === communityModal) closeCommunity(); });

/* ===== Live Listener Count (MQTT presence) ===== */
const listenerBadge = document.getElementById("listenerBadge");
const listenerCount = document.getElementById("listenerCount");
const SESSION_ID    = Math.random().toString(36).slice(2, 11);
const MQTT_TOPIC    = "tamil-radio-app-v1/listeners/";
const STALE_MS      = 90000;
const activeListeners = new Map();
let mqttClient = null;

function updateBadge() {
  const now = Date.now();
  for (const [id, ts] of activeListeners) { if (now - ts > STALE_MS) activeListeners.delete(id); }
  const n = activeListeners.size;
  listenerCount.textContent = n;
  listenerBadge.style.display = n > 0 ? "inline-flex" : "none";
}

function publishPresence(alive = true) {
  if (!mqttClient || !mqttClient.connected) return;
  mqttClient.publish(MQTT_TOPIC + SESSION_ID, JSON.stringify({ alive }), { qos: 0, retain: false });
}

function initPresence() {
  mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
    clientId: "tamilradio_" + SESSION_ID,
    clean: true, reconnectPeriod: 8000, connectTimeout: 10000,
  });
  mqttClient.on("connect", () => { mqttClient.subscribe(MQTT_TOPIC + "+"); publishPresence(true); });
  mqttClient.on("message", (topic, msg) => {
    try {
      const sid = topic.split("/").pop();
      const data = JSON.parse(msg.toString());
      if (data.alive) activeListeners.set(sid, Date.now());
      else            activeListeners.delete(sid);
      updateBadge();
    } catch (_) {}
  });
  setInterval(() => publishPresence(true), 30000);
  setInterval(updateBadge, 15000);
  window.addEventListener("beforeunload", () => publishPresence(false));
}

initPresence();

/* ===== Init ===== */
setView("radio");
