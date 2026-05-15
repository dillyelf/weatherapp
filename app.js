const DEFAULT_CENTER = [39.8283, -98.5795];
const DEFAULT_ZOOM = 5;
const RADAR_SERVICE = "https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity/MapServer";
const TIME_RADAR_SERVICE = "https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer";
const QPE_SERVICE = "https://mapservices.weather.noaa.gov/raster/rest/services/obs/mrms_qpe/ImageServer";
const OPEN_GEO = "https://opengeo.ncep.noaa.gov/geoserver";

const nwsModes = [
  {
    id: "bref",
    label: "Base Reflectivity",
    short: "Rain intensity",
    layer: "arcgis-radar",
    legend: "reflectivity",
    description: "Base reflectivity estimates precipitation intensity near the lowest radar tilt. It is the everyday storm/rain view."
  },
  {
    id: "cref",
    label: "Composite Reflectivity",
    short: "Tallest storms",
    layer: "wms",
    url: `${OPEN_GEO}/conus/conus_cref_qcd/ows`,
    layers: "conus_cref_qcd",
    legend: "reflectivity",
    description: "Composite reflectivity shows the strongest returned signal in a storm column, which helps find tall or intense cores."
  },
  {
    id: "velocity",
    label: "Velocity",
    short: "Wind toward/away",
    layer: "site-wms",
    product: "SR_BVEL",
    legend: "velocity",
    description: "Velocity shows wind motion toward and away from a radar. Meteorologists use it to inspect rotation and wind shifts."
  },
  {
    id: "hydro",
    label: "Hydrometeor",
    short: "Rain, hail, snow",
    layer: "site-wms",
    product: "BDHC",
    legend: "winter",
    description: "Hydrometeor classification estimates precipitation type, including rain, snow, hail, and mixed precipitation."
  },
  {
    id: "echo-tops",
    label: "Echo Tops",
    short: "Storm height",
    layer: "wms",
    url: `${OPEN_GEO}/conus/conus_neet_v18/ows`,
    layers: "conus_neet_v18",
    legend: "reflectivity",
    description: "Echo tops estimate how high radar returns extend, useful for spotting stronger vertical storm growth."
  },
  {
    id: "ptype",
    label: "Precip Type",
    short: "Rain or snow",
    layer: "wms",
    url: `${OPEN_GEO}/conus/conus_pcpn_typ/ows`,
    layers: "conus_pcpn_typ",
    legend: "winter",
    description: "Precipitation type separates rain, snow, ice, and mixed precipitation where the MRMS product is available."
  },
  {
    id: "one-hour",
    label: "1 Hour Rain",
    short: "Recent total",
    layer: "site-wms",
    product: "BOHA",
    legend: "rain",
    description: "One-hour accumulation estimates recent rainfall, helpful for flooding and training storms."
  },
  {
    id: "storm-total",
    label: "Storm Total",
    short: "Event rainfall",
    layer: "site-wms",
    product: "BDSA",
    legend: "rain",
    description: "Storm-total accumulation estimates rain that has fallen over the current event."
  }
];

const radarSites = [
  ["KABR", "Aberdeen, SD"], ["KABX", "Albuquerque, NM"], ["KAMA", "Amarillo, TX"], ["KAMX", "Miami, FL"],
  ["KAPX", "Gaylord, MI"], ["KARX", "La Crosse, WI"], ["KATX", "Seattle, WA"], ["KBBX", "Beale AFB, CA"],
  ["KBGM", "Binghamton, NY"], ["KBHX", "Eureka, CA"], ["KBIS", "Bismarck, ND"], ["KBOX", "Boston, MA"],
  ["KBRO", "Brownsville, TX"], ["KBUF", "Buffalo, NY"], ["KBYX", "Key West, FL"], ["KCAE", "Columbia, SC"],
  ["KCBX", "Boise, ID"], ["KCCX", "State College, PA"], ["KCLE", "Cleveland, OH"], ["KCLX", "Charleston, SC"],
  ["KCRP", "Corpus Christi, TX"], ["KCXX", "Burlington, VT"], ["KCYS", "Cheyenne, WY"], ["KDAX", "Sacramento, CA"],
  ["KDDC", "Dodge City, KS"], ["KDFX", "Laughlin AFB, TX"], ["KDGX", "Jackson, MS"], ["KDIX", "Philadelphia, PA"],
  ["KDLH", "Duluth, MN"], ["KDMX", "Des Moines, IA"], ["KDOX", "Dover, DE"], ["KDTX", "Detroit, MI"],
  ["KDVN", "Quad Cities, IA"], ["KEAX", "Kansas City, MO"], ["KEMX", "Tucson, AZ"], ["KENX", "Albany, NY"],
  ["KEPZ", "El Paso, TX"], ["KESX", "Las Vegas, NV"], ["KEVX", "Eglin AFB, FL"], ["KEWX", "Austin/San Antonio, TX"],
  ["KFDR", "Frederick, OK"], ["KFFC", "Atlanta, GA"], ["KFSD", "Sioux Falls, SD"], ["KFSX", "Flagstaff, AZ"],
  ["KFTG", "Denver, CO"], ["KFWS", "Dallas/Fort Worth, TX"], ["KGGW", "Glasgow, MT"], ["KGJX", "Grand Junction, CO"],
  ["KGRB", "Green Bay, WI"], ["KGRK", "Fort Hood, TX"], ["KGRR", "Grand Rapids, MI"], ["KGSP", "Greer, SC"],
  ["KGWX", "Columbus AFB, MS"], ["KGYX", "Portland, ME"], ["KHDX", "White Sands, NM"], ["KHGX", "Houston, TX"],
  ["KHNX", "San Joaquin Valley, CA"], ["KHTX", "Huntsville, AL"], ["KICT", "Wichita, KS"], ["KILN", "Cincinnati, OH"],
  ["KILX", "Lincoln, IL"], ["KIND", "Indianapolis, IN"], ["KINX", "Tulsa, OK"], ["KIWX", "Northern Indiana"],
  ["KJAX", "Jacksonville, FL"], ["KJKL", "Jackson, KY"], ["KLBB", "Lubbock, TX"], ["KLCH", "Lake Charles, LA"],
  ["KLGX", "Langley Hill, WA"], ["KLNX", "North Platte, NE"], ["KLOT", "Chicago, IL"], ["KLSX", "St. Louis, MO"],
  ["KLTX", "Wilmington, NC"], ["KLVX", "Louisville, KY"], ["KLWX", "Washington, DC"], ["KLZK", "Little Rock, AR"],
  ["KMAF", "Midland/Odessa, TX"], ["KMAX", "Medford, OR"], ["KMBX", "Minot, ND"], ["KMHX", "Morehead City, NC"],
  ["KMKX", "Milwaukee, WI"], ["KMLB", "Melbourne, FL"], ["KMOB", "Mobile, AL"], ["KMPX", "Twin Cities, MN"],
  ["KMQT", "Marquette, MI"], ["KMRX", "Knoxville, TN"], ["KMSX", "Missoula, MT"], ["KMTX", "Salt Lake City, UT"],
  ["KMUX", "San Francisco, CA"], ["KMVX", "Grand Forks, ND"], ["KNQA", "Memphis, TN"], ["KOAX", "Omaha, NE"],
  ["KOHX", "Nashville, TN"], ["KOKX", "New York City, NY"], ["KOTX", "Spokane, WA"], ["KPAH", "Paducah, KY"],
  ["KPBZ", "Pittsburgh, PA"], ["KPDT", "Pendleton, OR"], ["KPOE", "Fort Polk, LA"], ["KPUX", "Pueblo, CO"],
  ["KRAX", "Raleigh, NC"], ["KRIW", "Riverton, WY"], ["KRLX", "Charleston, WV"], ["KRTX", "Portland, OR"],
  ["KSFX", "Pocatello, ID"], ["KSGF", "Springfield, MO"], ["KSHV", "Shreveport, LA"], ["KSOX", "Santa Ana, CA"],
  ["KSRX", "Fort Smith, AR"], ["KTBW", "Tampa Bay, FL"], ["KTFX", "Great Falls, MT"], ["KTLH", "Tallahassee, FL"],
  ["KTLX", "Oklahoma City, OK"], ["KTWX", "Topeka, KS"], ["KUDX", "Rapid City, SD"], ["KUEX", "Hastings, NE"],
  ["KVAX", "Moody AFB, GA"], ["KVBX", "Vandenberg AFB, CA"], ["KVNX", "Vance AFB, OK"], ["KVTX", "Los Angeles, CA"],
  ["KVWX", "Evansville, IN"], ["KYUX", "Yuma, AZ"]
];

const map = L.map("map", { zoomControl: false }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
L.control.zoom({ position: "bottomleft" }).addTo(map);

const streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const topoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution: "&copy; OpenTopoMap contributors"
});

let activeWeatherLayer = null;
let activeReferenceLayer = null;
let activeMarker = null;
let currentLocation = null;
let currentMode = "easy-rain";
let loopFrames = [];
let loopIndex = 0;
let loopTimer = null;
let loopOverlay = null;
let loopPlaying = false;
let loopMapRefresh = 0;

const tabs = document.querySelectorAll(".tab");
const panels = {
  easy: document.getElementById("easyPanel"),
  nws: document.getElementById("nwsPanel"),
  forecast: document.getElementById("forecastPanel")
};
const modeGrid = document.getElementById("modeGrid");
const siteSelect = document.getElementById("siteSelect");
const modeDescription = document.getElementById("modeDescription");
const plainExplanation = document.getElementById("plainExplanation");
const legendTitle = document.getElementById("legendTitle");
const legendUpdated = document.getElementById("legendUpdated");
const legendScale = document.getElementById("legendScale");
const legendLabels = document.getElementById("legendLabels");
const forecastPlace = document.getElementById("forecastPlace");
const currentConditions = document.getElementById("currentConditions");
const forecastList = document.getElementById("forecastList");
const alertsBox = document.getElementById("alerts");
const loopToggle = document.getElementById("loopToggle");
const loopState = document.getElementById("loopState");
const loopTime = document.getElementById("loopTime");

function init() {
  lucide.createIcons();
  buildModes();
  buildSiteMenu();
  bindEvents();
  setEasyMode("easy-rain");
  loadLoopFrames();
  defaultToCurrentLocation();
}

function buildModes() {
  modeGrid.innerHTML = nwsModes.map((mode) => `
    <button class="mode-card" data-nws-mode="${mode.id}">
      <strong>${mode.label}</strong>
      <small>${mode.short}</small>
    </button>
  `).join("");
}

function buildSiteMenu() {
  siteSelect.innerHTML = radarSites.map(([id, name]) => `<option value="${id}">${id} - ${name}</option>`).join("");
  siteSelect.value = "KLOT";
}

function bindEvents() {
  tabs.forEach((tab) => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setEasyMode(button.dataset.mode));
  });
  modeGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-nws-mode]");
    if (button) setNwsMode(button.dataset.nwsMode);
  });
  siteSelect.addEventListener("change", () => {
    if (currentMode.startsWith("nws-")) {
      setNwsMode(currentMode.replace("nws-", ""));
    }
  });
  document.getElementById("locateBtn").addEventListener("click", locateUser);
  loopToggle.addEventListener("click", toggleRadarLoop);
  map.on("moveend zoomend resize", refreshLoopFrame);
  document.getElementById("searchBtn").addEventListener("click", searchPlace);
  document.getElementById("placeInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchPlace();
  });
  L.control.layers({ Streets: streetMap, Topographic: topoMap }, {}, { position: "bottomleft" }).addTo(map);
}

function switchTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  Object.entries(panels).forEach(([name, panel]) => panel.classList.toggle("active", name === tabName));
  if (tabName === "nws" && !currentMode.startsWith("nws-")) {
    setNwsMode("bref");
  }
}

function setEasyMode(mode) {
  stopRadarLoop(true);
  currentMode = mode;
  document.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  document.querySelectorAll("[data-nws-mode]").forEach((button) => button.classList.remove("active"));

  if (mode === "easy-severe") {
    setRadarLayer(createArcGisLayer(RADAR_SERVICE, 0.74));
    setReferenceLayer(createWmsLayer(`${OPEN_GEO}/wwa/warnings/ows`, "warnings", 0.7));
    setLegend("Severe Focus", "Radar plus warning outlines", "reflectivity", ["Lighter", "Stronger", "Very intense"]);
    plainExplanation.textContent = "Radar colors show rain intensity while warning outlines highlight the areas NWS is watching most closely.";
  } else if (mode === "easy-winter") {
    setRadarLayer(createWmsLayer(`${OPEN_GEO}/conus/conus_pcpn_typ/ows`, "conus_pcpn_typ", 0.72));
    setReferenceLayer(null);
    setLegend("Winter Mix", "MRMS precipitation type", "winter", ["Rain", "Snow", "Ice/mix"]);
    plainExplanation.textContent = "Blue and white usually point to snow, pink can mean mixed or icy precipitation, and red/orange indicates rain.";
  } else {
    setRadarLayer(createArcGisLayer(RADAR_SERVICE, 0.74));
    setReferenceLayer(null);
    setLegend("Easy Radar", "Live NOAA/NWS layer", "reflectivity", ["Light", "Heavy", "Severe"]);
    plainExplanation.textContent = "Green is light rain, yellow and orange are heavier showers, and red or purple can mean intense storms.";
  }
}

function setNwsMode(modeId) {
  stopRadarLoop(true);
  const mode = nwsModes.find((item) => item.id === modeId);
  if (!mode) return;
  currentMode = `nws-${modeId}`;
  document.querySelectorAll("[data-nws-mode]").forEach((button) => button.classList.toggle("active", button.dataset.nwsMode === modeId));
  document.querySelectorAll("[data-mode]").forEach((button) => button.classList.remove("active"));

  let layer;
  if (mode.layer === "arcgis-radar") {
    layer = createArcGisLayer(RADAR_SERVICE, 0.76);
  } else if (mode.layer === "site-wms") {
    const site = (siteSelect.value || "KLOT").toLowerCase();
    layer = createWmsLayer(`${OPEN_GEO}/${site}/ows`, `${site}_${mode.product.toLowerCase()}`, 0.78);
  } else {
    layer = createWmsLayer(mode.url, mode.layers, 0.78);
  }

  setRadarLayer(layer);
  setReferenceLayer(null);
  setLegend(mode.label, "Operational radar product", mode.legend, legendLabelsFor(mode.legend));
  modeDescription.textContent = mode.description;
}

async function loadLoopFrames() {
  try {
    const response = await fetch(`${TIME_RADAR_SERVICE}?f=json`);
    const metadata = await response.json();
    const [start, end] = metadata.timeInfo?.timeExtent || [];
    if (!start || !end) throw new Error("No radar time range");
    const frameStep = 5 * 60 * 1000;
    const firstFrame = Math.max(start, end - (11 * frameStep));
    loopFrames = [];
    for (let time = firstFrame; time <= end; time += frameStep) {
      loopFrames.push(time);
    }
    if (!loopFrames.includes(end)) loopFrames.push(end);
    loopIndex = Math.max(0, loopFrames.length - 1);
    loopTime.textContent = `Latest ${formatFrameTime(loopFrames[loopIndex])}`;
  } catch {
    loopTime.textContent = "Loop unavailable";
  }
}

async function toggleRadarLoop() {
  if (loopPlaying) {
    stopRadarLoop(false);
    return;
  }
  if (!loopFrames.length) await loadLoopFrames();
  if (!loopFrames.length) return;
  startRadarLoop();
}

function startRadarLoop() {
  if (activeWeatherLayer) {
    map.removeLayer(activeWeatherLayer);
    activeWeatherLayer = null;
  }
  setReferenceLayer(null);
  loopPlaying = true;
  loopToggle.classList.add("playing");
  loopToggle.setAttribute("aria-label", "Pause radar loop");
  loopToggle.setAttribute("title", "Pause radar loop");
  loopToggle.innerHTML = `<span data-lucide="pause"></span><span id="loopButtonText">Pause</span>`;
  loopState.textContent = "Playing";
  lucide.createIcons();
  setLegend("Radar Loop", "Last hour of NWS frames", "reflectivity", ["Light", "Heavy", "Severe"]);
  showLoopFrame(loopIndex);
  window.clearInterval(loopTimer);
  loopTimer = window.setInterval(() => {
    loopIndex = (loopIndex + 1) % loopFrames.length;
    showLoopFrame(loopIndex);
  }, 850);
}

function stopRadarLoop(removeOverlay) {
  loopPlaying = false;
  window.clearInterval(loopTimer);
  loopTimer = null;
  loopToggle.classList.remove("playing");
  loopToggle.setAttribute("aria-label", "Play radar loop");
  loopToggle.setAttribute("title", "Play radar loop");
  loopToggle.innerHTML = `<span data-lucide="play"></span><span id="loopButtonText">Loop</span>`;
  loopState.textContent = "Paused";
  lucide.createIcons();
  if (removeOverlay && loopOverlay) {
    map.removeLayer(loopOverlay);
    loopOverlay = null;
  }
}

function refreshLoopFrame() {
  if (!loopOverlay || !loopFrames.length) return;
  window.clearTimeout(loopMapRefresh);
  loopMapRefresh = window.setTimeout(() => showLoopFrame(loopIndex), 120);
}

function showLoopFrame(index) {
  const frameTime = loopFrames[index];
  if (!frameTime) return;
  const bounds = map.getBounds();
  const size = map.getSize();
  const params = new URLSearchParams({
    f: "image",
    bbox: [
      bounds.getWest().toFixed(5),
      bounds.getSouth().toFixed(5),
      bounds.getEast().toFixed(5),
      bounds.getNorth().toFixed(5)
    ].join(","),
    bboxSR: "4326",
    imageSR: "4326",
    size: `${Math.max(320, size.x)},${Math.max(260, size.y)}`,
    format: "png32",
    transparent: "true",
    time: String(frameTime),
    cacheBust: String(frameTime)
  });
  const imageUrl = `${TIME_RADAR_SERVICE}/exportImage?${params}`;
  if (!loopOverlay) {
    loopOverlay = L.imageOverlay(imageUrl, bounds, { opacity: 0.78, interactive: false }).addTo(map);
  } else {
    loopOverlay.setBounds(bounds);
    loopOverlay.setUrl(imageUrl);
  }
  loopOverlay.bringToFront();
  loopTime.textContent = formatFrameTime(frameTime);
}

function formatFrameTime(timestamp) {
  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(new Date(timestamp));
}

function createArcGisLayer(url, opacity = 0.75, layers = "0") {
  return L.esri.dynamicMapLayer({
    url,
    layers: [layers],
    format: "png32",
    transparent: true,
    opacity,
    f: "image"
  });
}

function createWmsLayer(url, layers, opacity = 0.75) {
  return L.tileLayer.wms(url, {
    layers,
    format: "image/png",
    transparent: true,
    opacity,
    version: "1.3.0",
    attribution: "NOAA/NWS"
  });
}

function setRadarLayer(layer) {
  if (activeWeatherLayer) map.removeLayer(activeWeatherLayer);
  activeWeatherLayer = layer;
  activeWeatherLayer.addTo(map);
}

function setReferenceLayer(layer) {
  if (activeReferenceLayer) map.removeLayer(activeReferenceLayer);
  activeReferenceLayer = layer;
  if (activeReferenceLayer) activeReferenceLayer.addTo(map);
}

function setLegend(title, updated, scale, labels) {
  legendTitle.textContent = title;
  legendUpdated.textContent = updated;
  legendScale.className = `scale ${scale}-scale`;
  legendLabels.innerHTML = labels.map((label) => `<span>${label}</span>`).join("");
}

function legendLabelsFor(type) {
  if (type === "velocity") return ["Toward", "Neutral", "Away"];
  if (type === "winter") return ["Rain", "Snow", "Ice/mix"];
  if (type === "rain") return ["Low", "Moderate", "High"];
  return ["Light", "Heavy", "Severe"];
}

async function searchPlace() {
  const query = document.getElementById("placeInput").value.trim();
  if (!query) return;
  forecastPlace.textContent = "Searching...";
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, { headers: { "Accept": "application/json" } });
    const [place] = await response.json();
    if (!place) throw new Error("No matching U.S. location found.");
    const lat = Number(place.lat);
    const lon = Number(place.lon);
    const label = place.display_name.split(",").slice(0, 3).join(",");
    moveToLocation(lat, lon, label);
    loadForecast(lat, lon, label);
  } catch (error) {
    forecastPlace.textContent = error.message || "Search failed.";
  }
}

function locateUser() {
  requestCurrentLocation(false);
}

function defaultToCurrentLocation() {
  if (!navigator.geolocation) {
    loadForecast(41.8781, -87.6298, "Chicago, IL");
    return;
  }
  requestCurrentLocation(true);
}

function requestCurrentLocation(isStartup) {
  if (!navigator.geolocation) {
    forecastPlace.textContent = "This browser cannot use location.";
    return;
  }
  forecastPlace.textContent = isStartup ? "Getting your current location..." : "Getting your location...";
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    moveToLocation(latitude, longitude, "Your location");
    loadForecast(latitude, longitude, "Your location");
  }, () => {
    if (isStartup) {
      loadForecast(41.8781, -87.6298, "Chicago, IL");
    } else {
      forecastPlace.textContent = "Location permission was not allowed.";
    }
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function moveToLocation(lat, lon, label) {
  currentLocation = { lat, lon, label };
  map.setView([lat, lon], 9);
  if (activeMarker) map.removeLayer(activeMarker);
  activeMarker = L.marker([lat, lon]).addTo(map).bindPopup(label);
}

async function loadForecast(lat, lon, label) {
  currentLocation = { lat, lon, label };
  forecastPlace.textContent = label;
  currentConditions.innerHTML = "<strong>Loading forecast...</strong><span>Contacting api.weather.gov</span>";
  forecastList.innerHTML = "";
  alertsBox.classList.remove("show");
  alertsBox.innerHTML = "";

  try {
    const pointResponse = await nwsFetch(`https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`);
    const point = await pointResponse.json();
    const forecastUrl = point.properties.forecast;
    const hourlyUrl = point.properties.forecastHourly;
    const zone = point.properties.forecastZone?.split("/").pop();

    const [forecastData, hourlyData] = await Promise.all([
      nwsFetch(forecastUrl).then((response) => response.json()),
      nwsFetch(hourlyUrl).then((response) => response.json())
    ]);

    renderForecast(forecastData.properties.periods, hourlyData.properties.periods);
    if (zone) loadAlerts(zone);
  } catch (error) {
    currentConditions.innerHTML = `<strong>Forecast unavailable</strong><span>${error.message || "Try another U.S. location."}</span>`;
  }
}

function nwsFetch(url) {
  return fetch(url, {
    headers: {
      "Accept": "application/geo+json",
      "User-Agent": "LiveRadarDesk/1.0"
    }
  }).then((response) => {
    if (!response.ok) throw new Error(`NWS returned ${response.status}`);
    return response;
  });
}

function renderForecast(periods, hourly) {
  const firstHour = hourly?.[0];
  const firstPeriod = periods?.[0];
  if (firstHour) {
    currentConditions.innerHTML = `
      <strong>${firstHour.temperature}&deg;${firstHour.temperatureUnit} · ${firstHour.shortForecast}</strong>
      <span>Wind ${firstHour.windSpeed} ${firstHour.windDirection}</span>
    `;
  } else if (firstPeriod) {
    currentConditions.innerHTML = `
      <strong>${firstPeriod.temperature}&deg;${firstPeriod.temperatureUnit} · ${firstPeriod.shortForecast}</strong>
      <span>Wind ${firstPeriod.windSpeed} ${firstPeriod.windDirection}</span>
    `;
  }

  forecastList.innerHTML = periods.slice(0, 8).map((period) => `
    <article class="forecast-card">
      <header>
        <h3>${period.name}</h3>
        <b>${period.temperature}&deg;${period.temperatureUnit}</b>
      </header>
      <p><strong>${period.shortForecast}</strong></p>
      <p>${period.detailedForecast}</p>
    </article>
  `).join("");
}

async function loadAlerts(zone) {
  try {
    const response = await nwsFetch(`https://api.weather.gov/alerts/active?zone=${zone}`);
    const data = await response.json();
    const alerts = data.features || [];
    if (!alerts.length) {
      alertsBox.classList.add("show");
      alertsBox.innerHTML = `<div class="alert-item"><strong>No active NWS alerts</strong><span>For ${zone}</span></div>`;
      return;
    }
    alertsBox.classList.add("show");
    alertsBox.innerHTML = alerts.slice(0, 4).map(({ properties }) => `
      <div class="alert-item">
        <strong>${properties.event}</strong>
        <span>${properties.headline || properties.areaDesc}</span>
      </div>
    `).join("");
  } catch {
    alertsBox.classList.remove("show");
  }
}

init();
