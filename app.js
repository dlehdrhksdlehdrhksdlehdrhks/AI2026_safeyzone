/**
 * 전국 어린이 보호구역 안전 사각지대 탐색기 (Child Safety Zone Visualizer)
 * Core Logic: Pure Vanilla JavaScript (ES6+)
 */

// Application State
const state = {
  allRecords: [],
  filteredRecords: [],
  currentQuickFilter: 'all', // 'all', 'no_cctv', 'f_grade', 'vulnerable'
  searchQuery: '',
  selectedAgency: '',
  selectedPolice: '',
  selectedType: '',
  selectedGrade: '',
  sortField: 'vulnerabilityScore',
  sortOrder: 'desc',
  currentPage: 1,
  pageSize: 25,
  charts: {
    policeBar: null,
    facilityDoughnut: null
  },
  map: null,
  markerClusterGroup: null,
  mapBoundsFitted: false
};

// DOM Elements Reference
const elements = {
  loadingOverlay: document.getElementById('loadingOverlay'),
  mainDashboard: document.getElementById('mainDashboard'),
  dataStatusText: document.getElementById('dataStatusText'),
  dataStatusBadge: document.getElementById('dataStatusBadge'),
  uploadCsvBtn: document.getElementById('uploadCsvBtn'),
  csvFileInput: document.getElementById('csvFileInput'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),
  homeBtn: document.getElementById('homeBtn'),
  homeLinkBtn: document.getElementById('homeLinkBtn'),

  // KPI Elements
  kpiTotalCount: document.getElementById('kpiTotalCount'),
  kpiNoCctvCount: document.getElementById('kpiNoCctvCount'),
  kpiNoCctvRatio: document.getElementById('kpiNoCctvRatio'),
  kpiFGradeCount: document.getElementById('kpiFGradeCount'),

  // Filter Elements
  quickFilterBtns: document.querySelectorAll('.quick-filter-btn'),
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  agencySelect: document.getElementById('agencySelect'),
  policeSelect: document.getElementById('policeSelect'),
  typeSelect: document.getElementById('typeSelect'),
  gradeSelect: document.getElementById('gradeSelect'),
  filteredCountText: document.getElementById('filteredCountText'),
  resetFilterBtn: document.getElementById('resetFilterBtn'),

  // Policy Briefing
  policyBriefingText: document.getElementById('policyBriefingText'),
  copyBriefingBtn: document.getElementById('copyBriefingBtn'),

  // Table & Pagination
  tableBody: document.getElementById('tableBody'),
  emptyTableState: document.getElementById('emptyTableState'),
  pageSizeSelect: document.getElementById('pageSizeSelect'),
  paginationInfo: document.getElementById('paginationInfo'),
  paginationControls: document.getElementById('paginationControls'),

  // Modal Elements
  detailModal: document.getElementById('detailModal'),
  modalBackdrop: document.getElementById('modalBackdrop'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  modalGradeIcon: document.getElementById('modalGradeIcon'),
  modalFacilityName: document.getElementById('modalFacilityName'),
  modalFacilityType: document.getElementById('modalFacilityType'),
  modalScoreText: document.getElementById('modalScoreText'),
  modalGradeBadge: document.getElementById('modalGradeBadge'),
  modalCctvScore: document.getElementById('modalCctvScore'),
  modalCctvDetail: document.getElementById('modalCctvDetail'),
  modalFacilityScore: document.getElementById('modalFacilityScore'),
  modalFacilityDetail: document.getElementById('modalFacilityDetail'),
  modalRoadScore: document.getElementById('modalRoadScore'),
  modalRoadDetail: document.getElementById('modalRoadDetail'),
  modalAddress: document.getElementById('modalAddress'),
  modalManagingInfo: document.getElementById('modalManagingInfo'),
  modalKakaoMapBtn: document.getElementById('modalKakaoMapBtn'),
  modalNaverMapBtn: document.getElementById('modalNaverMapBtn'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

/**
 * 1. Vulnerability Score & Grade Calculation Engine
 */
function calculateVulnerability(cctvCount, cctvStatus, facilityType, roadWidth) {
  let score = 0;
  let cctvScore = 0;
  let facilityScore = 0;
  let roadScore = 0;

  const numCctv = Number(cctvCount) || 0;
  const status = String(cctvStatus || '').trim().toUpperCase();

  // 1. CCTV Score (0대/N: +50, 1대: +30, 2대: +15, 3대+: 0)
  if (status === 'N' || numCctv === 0) {
    cctvScore = 50;
  } else if (numCctv === 1) {
    cctvScore = 30;
  } else if (numCctv === 2) {
    cctvScore = 15;
  } else {
    cctvScore = 0;
  }
  score += cctvScore;

  // 2. Facility Type Weight (어린이집/유치원: +25, 초등/특수: +15, 기타: +10)
  const typeStr = String(facilityType || '');
  if (typeStr.includes('어린이집') || typeStr.includes('유치원')) {
    facilityScore = 25;
  } else if (typeStr.includes('초등학교') || typeStr.includes('특수학교')) {
    facilityScore = 15;
  } else {
    facilityScore = 10;
  }
  score += facilityScore;

  // 3. Road Width Weight (< 6m or unspecified: +25, 6~12m: +15, >= 12m: +5)
  const widthStr = String(roadWidth || '');
  const match = widthStr.match(/(\d+(\.\d+)?)/);
  const widthNum = match ? parseFloat(match[1]) : 0;

  if (!roadWidth || roadWidth === '정보 없음' || widthNum < 6 || widthNum === 0) {
    roadScore = 25;
  } else if (widthNum >= 6 && widthNum < 12) {
    roadScore = 15;
  } else {
    roadScore = 5;
  }
  score += roadScore;

  const finalScore = Math.min(100, score);
  let grade = 'S';
  if (finalScore >= 80) grade = 'F';
  else if (finalScore >= 60) grade = 'D';
  else if (finalScore >= 40) grade = 'B';
  else if (finalScore >= 20) grade = 'A';

  return {
    score: finalScore,
    grade: grade,
    breakdown: { cctvScore, facilityScore, roadScore, widthNum, numCctv, status }
  };
}

/**
 * 2. Data Loading & CSV Parser Engine
 */
async function initDataset() {
  try {
    showLoading(true);
    elements.dataStatusText.textContent = 'CSV 데이터 다운로드 중...';

    const response = await fetch('전국어린이보호구역표준데이터.csv');
    if (!response.ok) {
      throw new Error(`CSV Fetch failed HTTP status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    elements.dataStatusText.textContent = 'EUC-KR 디코딩 및 CSV 파싱 중...';
    
    // Decode EUC-KR
    const decoder = new TextDecoder('euc-kr');
    let csvText = decoder.decode(arrayBuffer);

    parseAndLoadCsv(csvText);
  } catch (err) {
    console.warn('Auto fetch dataset error or fallback required:', err);
    showToast('기본 CSV 로딩에 실패하였습니다. 직접 CSV 파일을 선택해 주세요.', 'error');
    elements.dataStatusText.textContent = 'CSV 파일 업로드 필요';
    showLoading(false);
  }
}

function parseAndLoadCsv(csvContent) {
  Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      processRecords(results.data);
    },
    error: (err) => {
      console.error('PapaParse error:', err);
      showToast('CSV 데이터를 파싱하는 중 오류가 발생했습니다.', 'error');
      showLoading(false);
    }
  });
}

function processRecords(rawData) {
  const records = [];
  
  rawData.forEach((row, index) => {
    // Find fields with flexible key matching
    const facilityType = row['시설종류'] || row['시설 종류'] || '기타';
    const name = row['대상시설명'] || row['시설명'] || '미상';
    const address = row['소재지도로명주소'] || row['소재지지번주소'] || row['주소'] || '주소 정보 없음';
    const lat = parseFloat(row['위도']) || null;
    const lng = parseFloat(row['경도']) || null;
    const managingAgency = row['관리기관명'] || row['관리기관'] || '미지정';
    const policeStation = row['관할경찰서명'] || row['관할경찰서'] || '미지정';
    const cctvStatus = (row['CCTV설치여부'] || 'N').toUpperCase() === 'Y' ? 'Y' : 'N';
    const cctvCount = parseInt(row['CCTV설치대수']) || 0;
    const roadWidth = row['보호구역도로폭'] || '정보 없음';
    const provider = row['제공기관명'] || '';

    const vuln = calculateVulnerability(cctvCount, cctvStatus, facilityType, roadWidth);

    records.push({
      id: index + 1,
      facilityType,
      name,
      address,
      lat,
      lng,
      managingAgency,
      policeStation,
      cctvStatus,
      cctvCount,
      roadWidth,
      provider,
      vulnerabilityScore: vuln.score,
      safetyGrade: vuln.grade,
      breakdown: vuln.breakdown
    });
  });

  state.allRecords = records;
  state.filteredRecords = [...records];

  populateDropdownOptions();
  applyFiltersAndRender();

  showLoading(false);
  elements.dataStatusBadge.classList.remove('hidden');
  elements.dataStatusText.textContent = `100% 정상 로드 (${records.length.toLocaleString()}건)`;
  showToast(`${records.length.toLocaleString()}개 보호구역 데이터가 정상 로드되었습니다.`, 'success');
}

/**
 * 3. Dropdown Population
 */
function populateDropdownOptions() {
  const agencies = new Set();
  const policeStations = new Set();
  const types = new Set();

  state.allRecords.forEach(r => {
    if (r.managingAgency && r.managingAgency !== '미지정') agencies.add(r.managingAgency);
    if (r.policeStation && r.policeStation !== '미지정') policeStations.add(r.policeStation);
    if (r.facilityType) types.add(r.facilityType);
  });

  populateSelect(elements.agencySelect, Array.from(agencies).sort(), '전체 지자체/기관');
  populateSelect(elements.policeSelect, Array.from(policeStations).sort(), '전체 경찰서');
  populateSelect(elements.typeSelect, Array.from(types).sort(), '전체 시설종류');
}

function populateSelect(selectElement, items, defaultLabel) {
  selectElement.innerHTML = `<option value="">${defaultLabel}</option>`;
  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    selectElement.appendChild(opt);
  });
}

/**
 * 4. Filtering, Searching & Sorting Logic
 */
function applyFiltersAndRender() {
  let list = [...state.allRecords];

  // 1. Quick Filter Tab
  if (state.currentQuickFilter === 'no_cctv') {
    list = list.filter(r => r.cctvStatus === 'N' || r.cctvCount === 0);
  } else if (state.currentQuickFilter === 'f_grade') {
    list = list.filter(r => r.safetyGrade === 'F');
  } else if (state.currentQuickFilter === 'vulnerable') {
    list = list.filter(r => r.safetyGrade === 'D' || r.safetyGrade === 'F');
  }

  // 2. Dropdown Filters
  if (state.selectedAgency) {
    list = list.filter(r => r.managingAgency === state.selectedAgency);
  }
  if (state.selectedPolice) {
    list = list.filter(r => r.policeStation === state.selectedPolice);
  }
  if (state.selectedType) {
    list = list.filter(r => r.facilityType === state.selectedType);
  }
  if (state.selectedGrade) {
    list = list.filter(r => r.safetyGrade === state.selectedGrade);
  }

  // 3. Keyword Search Query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase().trim();
    list = list.filter(r => 
      r.name.toLowerCase().includes(query) || 
      r.address.toLowerCase().includes(query) ||
      r.policeStation.toLowerCase().includes(query) ||
      r.managingAgency.toLowerCase().includes(query)
    );
  }

  // 4. Sorting
  list.sort((a, b) => {
    let valA = a[state.sortField];
    let valB = b[state.sortField];

    if (typeof valA === 'string') {
      const cmp = valA.localeCompare(valB, 'ko');
      return state.sortOrder === 'asc' ? cmp : -cmp;
    }

    if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  state.filteredRecords = list;
  state.currentPage = 1; // Reset to page 1

  renderDashboardUI();
}

/**
 * 5. Dashboard UI Update Engine
 */
function renderDashboardUI() {
  updateKPICards();
  updatePolicyBriefing();
  renderCharts();
  renderTableAndPagination();
}

// KPI Cards
function updateKPICards() {
  const total = state.allRecords.length;
  const filteredTotal = state.filteredRecords.length;

  const noCctvCount = state.filteredRecords.filter(r => r.cctvStatus === 'N' || r.cctvCount === 0).length;
  const noCctvRatio = filteredTotal > 0 ? ((noCctvCount / filteredTotal) * 100).toFixed(1) : '0.0';
  const fGradeCount = state.filteredRecords.filter(r => r.safetyGrade === 'F').length;

  elements.kpiTotalCount.innerHTML = `${filteredTotal.toLocaleString()} <span class="text-xs text-slate-400 font-normal">/ 전체 ${total.toLocaleString()}</span>`;
  elements.kpiNoCctvCount.innerHTML = `${noCctvCount.toLocaleString()} <span class="text-xs text-slate-400 font-normal">개소</span>`;
  elements.kpiNoCctvRatio.textContent = `${noCctvRatio}%`;
  elements.kpiFGradeCount.innerHTML = `${fGradeCount.toLocaleString()} <span class="text-xs text-slate-400 font-normal">개소</span>`;

  elements.filteredCountText.textContent = filteredTotal.toLocaleString();
}

// Policy Briefing Text Generator
function updatePolicyBriefing() {
  const total = state.filteredRecords.length;
  if (total === 0) {
    elements.policyBriefingText.textContent = "선택한 필터 조건에 해당하는 데이터가 존재하지 않습니다.";
    return;
  }

  const noCctvCount = state.filteredRecords.filter(r => r.cctvStatus === 'N' || r.cctvCount === 0).length;
  const noCctvRatio = ((noCctvCount / total) * 100).toFixed(1);
  const fGradeCount = state.filteredRecords.filter(r => r.safetyGrade === 'F').length;

  let locationContext = "전국 대상 분석 결과,";
  if (state.selectedAgency) locationContext = `[${state.selectedAgency}] 관할 지역 분석 결과,`;
  else if (state.selectedPolice) locationContext = `[${state.selectedPolice}] 관할 지역 분석 결과,`;

  const briefingText = `${locationContext} 현재 검색된 총 ${total.toLocaleString()}개 어린이 보호구역 중 CCTV 미설치 구역은 ${noCctvCount.toLocaleString()}개소(${noCctvRatio}%)이며, 취약지수 80점 이상의 F등급(고위험) 사각지대는 ${fGradeCount.toLocaleString()}개소입니다. 고위험 구역을 중심으로 CCTV 추가 설치 및 보안 예산의 시급한 배정이 요구됩니다.`;

  elements.policyBriefingText.textContent = briefingText;
}

/**
 * 6. Chart.js Visualization Engine
 */
function renderCharts() {
  renderPoliceBarChart();
  renderFacilityDoughnutChart();
  renderLocationMap();
}

// Chart 1: TOP 10 No-CCTV Police Stations
function renderPoliceBarChart() {
  const ctx = document.getElementById('chartPoliceBar').getContext('2d');

  // Aggregate no-cctv counts per police station
  const policeCounts = {};
  state.filteredRecords.forEach(r => {
    if (r.cctvStatus === 'N' || r.cctvCount === 0) {
      const station = r.policeStation || '미지정';
      policeCounts[station] = (policeCounts[station] || 0) + 1;
    }
  });

  const sorted = Object.entries(policeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const labels = sorted.map(item => item[0]);
  const data = sorted.map(item => item[1]);

  if (state.charts.policeBar) {
    state.charts.policeBar.destroy();
  }

  state.charts.policeBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length > 0 ? labels : ['데이터 없음'],
      datasets: [{
        label: 'CCTV 미설치 수 (개소)',
        data: data.length > 0 ? data : [0],
        backgroundColor: 'rgba(2, 132, 199, 0.8)',
        borderColor: 'rgb(2, 132, 199)',
        borderWidth: 1,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` 미설치 구역: ${ctx.raw}개소`
          }
        }
      },
      scales: {
        x: {
          ticks: { font: { size: 10 }, color: '#94a3b8' },
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          ticks: { precision: 0, font: { size: 10 }, color: '#94a3b8' },
          grid: { color: 'rgba(148, 163, 184, 0.15)' }
        }
      }
    }
  });
}

// Chart 2: No-CCTV Distribution by Facility Type
function renderFacilityDoughnutChart() {
  const ctx = document.getElementById('chartFacilityDoughnut').getContext('2d');

  const typeCounts = {};
  state.filteredRecords.forEach(r => {
    if (r.cctvStatus === 'N' || r.cctvCount === 0) {
      const type = r.facilityType || '기타';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
  });

  const labels = Object.keys(typeCounts);
  const data = Object.values(typeCounts);

  if (state.charts.facilityDoughnut) {
    state.charts.facilityDoughnut.destroy();
  }

  const colors = [
    'rgba(239, 68, 68, 0.8)',   // Crimson Red
    'rgba(245, 158, 11, 0.8)',  // Amber
    'rgba(99, 102, 241, 0.8)',  // Indigo
    'rgba(16, 185, 129, 0.8)',  // Emerald
    'rgba(14, 165, 233, 0.8)',  // Sky
    'rgba(168, 85, 247, 0.8)'   // Purple
  ];

  state.charts.facilityDoughnut = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels.length > 0 ? labels : ['미설치 없음'],
      datasets: [{
        data: data.length > 0 ? data : [1],
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#1e293b'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 10 }, boxWidth: 12, color: '#94a3b8' }
        }
      },
      cutout: '65%'
    }
  });
}

// Chart 3 (Map): 위/경도 실제 지도 표출 (Leaflet + OpenStreetMap, API 키 불필요)
function initMap() {
  if (state.map) return;

  state.map = L.map('chartScatterMap', {
    center: [36.5, 127.8], // 대한민국 중심 좌표
    zoom: 7,
    scrollWheelZoom: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(state.map);

  // 대용량(14,640건) 마커도 부드럽게 처리하는 클러스터링 레이어
  state.markerClusterGroup = L.markerClusterGroup({
    chunkedLoading: true,
    maxClusterRadius: 45,
    spiderfyOnMaxZoom: true
  });
  state.map.addLayer(state.markerClusterGroup);
}

function renderLocationMap() {
  if (!state.map) initMap();

  state.markerClusterGroup.clearLayers();

  // Filter records with valid lat/lng coordinates (Korea bounds approx: Lat 33~39, Lng 124~132)
  const validPoints = state.filteredRecords.filter(r =>
    r.lat && r.lng && r.lat >= 33 && r.lat <= 39 && r.lng >= 124 && r.lng <= 132
  );

  // Performance cap: 클러스터링 덕분에 대량 마커도 가능하지만, 안전하게 상한선 유지
  const CAP = 8000;
  const sampled = validPoints.length > CAP
    ? validPoints.filter((_, idx) => idx % Math.ceil(validPoints.length / CAP) === 0)
    : validPoints;

  const markers = sampled.map(r => {
    const isInstalled = r.cctvStatus === 'Y' && r.cctvCount > 0;

    const marker = L.circleMarker([r.lat, r.lng], {
      radius: isInstalled ? 5 : 6,
      color: isInstalled ? '#059669' : '#b91c1c',
      weight: 1,
      fillColor: isInstalled ? '#10b981' : '#ef4444',
      fillOpacity: isInstalled ? 0.55 : 0.85
    });

    marker.bindPopup(`
      <div style="font-size:12px; line-height:1.6; min-width:180px;">
        <div style="font-weight:700; margin-bottom:2px;">${escapeHtml(r.name)}</div>
        <div style="color:#94a3b8;">${escapeHtml(r.address)}</div>
        <div style="margin-top:4px;">
          등급: <strong>${r.safetyGrade}</strong> ·
          CCTV: <strong>${r.cctvCount}대</strong> (${isInstalled ? '설치' : '미설치'})
        </div>
        <div style="color:#94a3b8;">관할: ${escapeHtml(r.policeStation)}</div>
      </div>
    `);

    return marker;
  });

  state.markerClusterGroup.addLayers(markers);

  // 최초 데이터 로드시에만 전체 마커가 보이도록 자동 확대/축소 (필터링마다 시점 이동 방지)
  if (!state.mapBoundsFitted && markers.length > 0) {
    state.map.fitBounds(state.markerClusterGroup.getBounds(), { padding: [20, 20] });
    state.mapBoundsFitted = true;
  }
}

/**
 * 7. Table Rendering & Pagination Controls
 */
function renderTableAndPagination() {
  const total = state.filteredRecords.length;
  
  if (total === 0) {
    elements.tableBody.innerHTML = '';
    elements.emptyTableState.classList.remove('hidden');
    elements.paginationInfo.textContent = 'Showing 0 to 0 of 0 entries';
    elements.paginationControls.innerHTML = '';
    return;
  }

  elements.emptyTableState.classList.add('hidden');

  const totalPages = Math.ceil(total / state.pageSize);
  if (state.currentPage > totalPages) state.currentPage = totalPages;
  if (state.currentPage < 1) state.currentPage = 1;

  const startIndex = (state.currentPage - 1) * state.pageSize;
  const endIndex = Math.min(startIndex + state.pageSize, total);
  const pageRecords = state.filteredRecords.slice(startIndex, endIndex);

  // Render Table Rows
  let html = '';
  pageRecords.forEach(r => {
    const gradeBadgeClass = getGradeBadgeStyle(r.safetyGrade);
    const cctvBadge = r.cctvStatus === 'Y' && r.cctvCount > 0
      ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"><i class="fa-solid fa-video mr-1 text-[10px]"></i> ${r.cctvCount}대</span>`
      : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-red-500/15 text-red-400 border border-red-500/30"><i class="fa-solid fa-video-slash mr-1 text-[10px]"></i> 미설치</span>`;

    html += `
      <tr class="data-row hover:bg-slate-800 transition-colors cursor-pointer" data-id="${r.id}">
        <td class="py-3 px-3 font-medium text-slate-400">${escapeHtml(r.facilityType)}</td>
        <td class="py-3 px-4 font-bold text-slate-100">${escapeHtml(r.name)}</td>
        <td class="py-3 px-4 text-slate-400 max-w-xs truncate" title="${escapeHtml(r.address)}">${escapeHtml(r.address)}</td>
        <td class="py-3 px-3 text-slate-400">${escapeHtml(r.policeStation)}</td>
        <td class="py-3 px-3 text-center">${cctvBadge}</td>
        <td class="py-3 px-3 text-center text-slate-400">${escapeHtml(r.roadWidth)}</td>
        <td class="py-3 px-3 text-center font-black ${r.vulnerabilityScore >= 80 ? 'text-red-400' : 'text-slate-200'}">${r.vulnerabilityScore}점</td>
        <td class="py-3 px-3 text-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${gradeBadgeClass}">
            ${r.safetyGrade}등급
          </span>
        </td>
        <td class="py-3 px-3 text-center">
          <button class="w-7 h-7 rounded-lg bg-slate-700 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 flex items-center justify-center transition-colors mx-auto">
            <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </td>
      </tr>
    `;
  });

  elements.tableBody.innerHTML = html;

  // Pagination Info
  elements.paginationInfo.textContent = `Showing ${(startIndex + 1).toLocaleString()} to ${endIndex.toLocaleString()} of ${total.toLocaleString()} entries`;

  // Render Pagination Buttons
  renderPaginationControls(totalPages);
}

function getGradeBadgeStyle(grade) {
  switch (grade) {
    case 'S': return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
    case 'A': return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
    case 'B': return 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30';
    case 'D': return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
    case 'F': return 'bg-red-500/15 text-red-400 border border-red-500/40 font-black animate-pulse-red';
    default: return 'bg-slate-700 text-slate-300';
  }
}

function renderPaginationControls(totalPages) {
  let btnHtml = '';

  // Prev Button
  btnHtml += `
    <button class="px-3 py-1 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold" 
      ${state.currentPage === 1 ? 'disabled' : ''} onclick="changePage(${state.currentPage - 1})">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
  `;

  // Page Numbers (Show window around current page)
  let startPage = Math.max(1, state.currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let p = startPage; p <= endPage; p++) {
    const active = p === state.currentPage;
    btnHtml += `
      <button class="px-3 py-1 rounded-lg text-xs font-bold transition-all ${active ? 'bg-sky-600 text-white shadow-sm' : 'border border-slate-700 text-slate-300 hover:bg-slate-700'}"
        onclick="changePage(${p})">${p}</button>
    `;
  }

  // Next Button
  btnHtml += `
    <button class="px-3 py-1 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold"
      ${state.currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${state.currentPage + 1})">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;

  elements.paginationControls.innerHTML = btnHtml;
}

window.changePage = function(page) {
  state.currentPage = page;
  renderTableAndPagination();
};

/**
 * 8. Detail Modal Handling
 */
function openDetailModal(recordId) {
  const record = state.allRecords.find(r => r.id === recordId);
  if (!record) return;

  elements.modalFacilityName.textContent = record.name;
  elements.modalFacilityType.textContent = `${record.facilityType} | ID #${record.id}`;
  elements.modalScoreText.textContent = record.vulnerabilityScore;
  
  // Grade Styling in Modal Header
  elements.modalGradeIcon.textContent = record.safetyGrade;
  elements.modalGradeIcon.className = `w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white ${getGradeBgColor(record.safetyGrade)}`;
  
  elements.modalGradeBadge.textContent = `${record.safetyGrade}등급 (${getGradeTitle(record.safetyGrade)})`;
  elements.modalGradeBadge.className = `px-4 py-2 rounded-xl text-xs font-black ${getGradeBadgeStyle(record.safetyGrade)}`;

  // Score Factors Breakdown
  const b = record.breakdown;
  elements.modalCctvScore.textContent = `+${b.cctvScore}점`;
  elements.modalCctvDetail.textContent = `CCTV ${record.cctvCount}대 설치 (설치 여부: ${record.cctvStatus})`;

  elements.modalFacilityScore.textContent = `+${b.facilityScore}점`;
  elements.modalFacilityDetail.textContent = `시설 종류: ${record.facilityType} (영유아 및 어린이 이용 시설 가중치 적용)`;

  elements.modalRoadScore.textContent = `+${b.roadScore}점`;
  elements.modalRoadDetail.textContent = `도로 폭: ${record.roadWidth} (보행 안전 구역 너비 평가)`;

  elements.modalAddress.textContent = record.address;
  elements.modalManagingInfo.textContent = `${record.managingAgency} / ${record.policeStation}`;

  // Map Search Quick Links
  const encodedName = encodeURIComponent(`${record.name} ${record.address}`);
  elements.modalKakaoMapBtn.href = `https://map.kakao.com/?q=${encodedName}`;
  elements.modalNaverMapBtn.href = `https://map.naver.com/v5/search/${encodedName}`;

  elements.detailModal.classList.remove('hidden');
}

function closeDetailModal() {
  elements.detailModal.classList.add('hidden');
}

function getGradeBgColor(grade) {
  switch (grade) {
    case 'S': return 'bg-emerald-600';
    case 'A': return 'bg-blue-600';
    case 'B': return 'bg-indigo-600';
    case 'D': return 'bg-amber-600';
    case 'F': return 'bg-red-600';
    default: return 'bg-slate-600';
  }
}

function getGradeTitle(grade) {
  switch (grade) {
    case 'S': return '최상 안심';
    case 'A': return '양호 환경';
    case 'B': return '보안 주의';
    case 'D': return 'CCTV 시급';
    case 'F': return '극심 위험 사각지대';
    default: return '보통';
  }
}

/**
 * 9. UTF-8 BOM CSV Export Engine
 */
function exportFilteredToCSV() {
  if (state.filteredRecords.length === 0) {
    showToast('Export할 내보내기 데이터가 없습니다.', 'warning');
    return;
  }

  // Create header and rows
  const headers = ['ID', '시설종류', '대상시설명', '소재지주소', '위도', '경도', '관리기관명', '관할경찰서명', 'CCTV설치여부', 'CCTV설치대수', '보호구역도로폭', '안전취약지수', '안전등급'];
  
  const csvRows = [headers.join(',')];

  state.filteredRecords.forEach(r => {
    const row = [
      r.id,
      escapeCsvCell(r.facilityType),
      escapeCsvCell(r.name),
      escapeCsvCell(r.address),
      r.lat || '',
      r.lng || '',
      escapeCsvCell(r.managingAgency),
      escapeCsvCell(r.policeStation),
      r.cctvStatus,
      r.cctvCount,
      escapeCsvCell(r.roadWidth),
      r.vulnerabilityScore,
      r.safetyGrade
    ];
    csvRows.push(row.join(','));
  });

  // Attach UTF-8 BOM (\uFEFF)
  const csvString = '\uFEFF' + csvRows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `어린이보호구역_안전사각지대_분석결과_${getFormattedDate()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`${state.filteredRecords.length.toLocaleString()}건 데이터가 CSV(UTF-8 BOM)로 내보내기 되었습니다.`, 'success');
}

function escapeCsvCell(text) {
  if (!text) return '""';
  const str = String(text).replace(/"/g, '""');
  return `"${str}"`;
}

function getFormattedDate() {
  const d = new Date();
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}_${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`;
}

/**
 * 10. Event Listeners Setup
 */
function setupEventListeners() {
  // Home Buttons (헤더 로고 아이콘 버튼 + 텍스트 버튼) -> 외부 홈페이지로 이동
  const HOME_URL = 'https://dlehdrhksdlehdrhksdlehdrhks.github.io/AI2026/index.html';
  const goHome = () => {
    window.location.href = HOME_URL;
  };
  if (elements.homeBtn) elements.homeBtn.addEventListener('click', goHome);
  if (elements.homeLinkBtn) elements.homeLinkBtn.addEventListener('click', goHome);

  // Manual File Upload Button
  elements.uploadCsvBtn.addEventListener('click', () => {
    elements.csvFileInput.click();
  });

  elements.csvFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    showLoading(true);
    elements.dataStatusText.textContent = '수동 업로드 파일 읽는 중...';

    const reader = new FileReader();
    reader.onload = (evt) => {
      const arrayBuffer = evt.target.result;
      const decoder = new TextDecoder('euc-kr');
      const csvText = decoder.decode(arrayBuffer);
      parseAndLoadCsv(csvText);
    };
    reader.onerror = () => {
      showToast('파일을 읽는 중 오류가 발생했습니다.', 'error');
      showLoading(false);
    };
    reader.readAsArrayBuffer(file);
  });

  // Export CSV Button
  elements.exportCsvBtn.addEventListener('click', exportFilteredToCSV);

  // Quick Filter Tabs
  elements.quickFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.quickFilterBtns.forEach(b => {
        b.className = 'quick-filter-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700 transition-all border border-slate-700';
      });
      btn.className = 'quick-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-sky-600 text-white shadow-sm';
      
      state.currentQuickFilter = btn.dataset.filter;
      applyFiltersAndRender();
    });
  });

  // Keyword Search Input
  let searchDebounceTimer;
  elements.searchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val.trim()) {
      elements.clearSearchBtn.classList.remove('hidden');
    } else {
      elements.clearSearchBtn.classList.add('hidden');
    }

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      state.searchQuery = val;
      applyFiltersAndRender();
    }, 200);
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    state.searchQuery = '';
    applyFiltersAndRender();
  });

  // Dropdown Select Filters
  elements.agencySelect.addEventListener('change', (e) => {
    state.selectedAgency = e.target.value;
    applyFiltersAndRender();
  });

  elements.policeSelect.addEventListener('change', (e) => {
    state.selectedPolice = e.target.value;
    applyFiltersAndRender();
  });

  elements.typeSelect.addEventListener('change', (e) => {
    state.selectedType = e.target.value;
    applyFiltersAndRender();
  });

  elements.gradeSelect.addEventListener('change', (e) => {
    state.selectedGrade = e.target.value;
    applyFiltersAndRender();
  });

  // Reset Filters
  elements.resetFilterBtn.addEventListener('click', () => {
    state.currentQuickFilter = 'all';
    state.searchQuery = '';
    state.selectedAgency = '';
    state.selectedPolice = '';
    state.selectedType = '';
    state.selectedGrade = '';
    state.sortField = 'vulnerabilityScore';
    state.sortOrder = 'desc';
    state.currentPage = 1;

    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    elements.agencySelect.value = '';
    elements.policeSelect.value = '';
    elements.typeSelect.value = '';
    elements.gradeSelect.value = '';

    elements.quickFilterBtns.forEach((b, i) => {
      b.className = i === 0 
        ? 'quick-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-sky-600 text-white shadow-sm'
        : 'quick-filter-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700 transition-all border border-slate-700';
    });

    applyFiltersAndRender();
    showToast('모든 검색 및 필터 조건이 초기화되었습니다.', 'info');
  });

  // Policy Briefing One-Click Copy Button
  elements.copyBriefingBtn.addEventListener('click', () => {
    const text = elements.policyBriefingText.textContent.trim();
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      showToast('정책 보고서 브리핑 문장이 클립보드에 복사되었습니다!', 'success');
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
      showToast('클립보드 복사에 실패했습니다.', 'error');
    });
  });

  // Page Size Selector
  elements.pageSizeSelect.addEventListener('change', (e) => {
    state.pageSize = parseInt(e.target.value);
    state.currentPage = 1;
    renderTableAndPagination();
  });

  // Column Header Sorting
  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.dataset.sort;
      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortField = field;
        state.sortOrder = 'desc';
      }
      applyFiltersAndRender();
    });
  });

  // Table Row Click Delegation -> Open Detail Modal
  elements.tableBody.addEventListener('click', (e) => {
    const row = e.target.closest('tr.data-row');
    if (row) {
      const recordId = parseInt(row.dataset.id);
      openDetailModal(recordId);
    }
  });

  // Close Modal Events
  elements.closeModalBtn.addEventListener('click', closeDetailModal);
  elements.modalBackdrop.addEventListener('click', closeDetailModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !elements.detailModal.classList.contains('hidden')) {
      closeDetailModal();
    }
  });
}

/**
 * Helper Utilities
 */
function showLoading(isLoading) {
  if (isLoading) {
    elements.loadingOverlay.classList.remove('hidden');
    elements.mainDashboard.classList.add('hidden');
  } else {
    elements.loadingOverlay.classList.add('hidden');
    elements.mainDashboard.classList.remove('hidden');

    // 대시보드가 hidden 상태일 때 생성된 Leaflet 지도는 타일 크기 계산이 어긋나므로
    // 화면에 표시된 직후 크기를 재계산해준다.
    if (state.map) {
      setTimeout(() => state.map.invalidateSize(), 100);
    }
  }
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-emerald-800 text-white' 
    : type === 'error' ? 'bg-red-800 text-white'
    : type === 'warning' ? 'bg-amber-700 text-white'
    : 'bg-slate-800 text-white';

  const iconClass = type === 'success' ? 'fa-circle-check text-emerald-300'
    : type === 'error' ? 'fa-circle-xmark text-red-300'
    : type === 'warning' ? 'fa-triangle-exclamation text-amber-300'
    : 'fa-circle-info text-sky-300';

  toast.className = `${bgClass} animate-slide-in px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-xs font-semibold max-w-sm z-50 border border-white/10`;
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-sm"></i>
    <span class="flex-1">${escapeHtml(message)}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Application Entry Point
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initDataset();
});
