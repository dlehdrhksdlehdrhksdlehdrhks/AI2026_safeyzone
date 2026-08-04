# PRD: 전국 어린이 보호구역 안전 사각지대 탐색기 (Child Safety Zone Blind Spot Visualizer)

> **Document Version**: 2.1.0  
> **Author**: Senior Product Manager & Lead Architect  
> **Core Architecture**: **Pure Vanilla JavaScript (ES6+)** Single File Application  
> **Status**: Approved for Implementation  
> **Target Dataset**: `전국어린이보호구역표준데이터.csv` (~14,640 records)

---

## 1. 프로젝트 개요 및 배경 (Executive Summary & Background)

### 1.1 프로젝트 개요
**'전국 어린이 보호구역 안전 사각지대 탐색기'**는 대한민국 공공데이터(`전국어린이보호구역표준데이터.csv`)를 활용하여, 전국 14,640여 개 어린이 보호구역의 CCTV 미설치 구역, 인프라 취약 구역, 위치 분포 및 종합 위험도를 분석하고 시각화하는 **바닐라 자바스크립트(Vanilla JS) 기반의 완결형 반응형 웹 대시보드 애플리케이션**입니다.

### 1.2 프레임워크 없는 순수 바닐라 JS 채택 이유
- **Zero-Dependency Core & 경량화**: React, Vue, Angular 등 무거운 프레임워크 빌드 과정 없이, 브라우저 표준 기술만으로 100% 실행 가능하도록 제작.
- **초고속 14,640건 대용량 데이터 처리**: Virtual DOM 오버헤드 없이 **Vanilla JS 메모리 배열 연산** 및 **네이티브 DOM 렌더링**을 통해 필터링/정렬 지연 시간을 1초 미만으로 단축.
- **폐쇄망 및 호환성 극대화**: 공공기관 내부망 등 별도의 Node/NPM 빌드 환경이 없는 환경에서도 `index.html` 단일 파일 실행으로 완벽 동작.

---

## 2. 타겟 사용자 및 주요 활용 시나리오 (Target Users & Scenarios)

| 사용자 구분 | 주요 페르소나 및 니즈 | 핵심 사용 시나리오 |
| :--- | :--- | :--- |
| **지자체 & 경찰서 담당자** | 공공 안전 예산 집행 우선순위 설정 및 보고서 작성 필요 | - 관할 구역 내 **F등급(고위험) 사각지대** 즉시 필터링<br>- **원클릭 정책 보고서 브리핑 문장 자동 생성** 후 공문 첨부 |
| **학부모 & 교육자** | 등하굣길 스쿨존의 실제 안전 수준 및 CCTV 인프라 확인 | - 시설명/주소 검색을 통해 자녀 통학로 보호구역의 **안전 취약 지수(0~100점)** 및 CCTV 설치 여부 확인 |
| **공공데이터 분석가** | 전국 어린이 보호구역 2D 위치 좌표 분석 및 데이터 추출 | - **2D 위/경도 위치 분포 산점도(Scatter Chart)**를 통해 지역별 밀집도 확인<br>- 필터링 결과 **UTF-8 BOM CSV 내보내기** |

---

## 3. 기술 스택 및 개발 아키텍처 (Vanilla JS Tech Stack)

### 3.1 기술 스택 명세

```
[Browser Runtime]
  ├── HTML5 Semantic Shell (index.html)
  ├── CSS: Tailwind CSS (CDN) - Light UI Mode
  └── JavaScript: Pure Vanilla JS (ES6+)
        ├── DOM Engine: document.querySelector, Element.innerHTML, EventListeners
        ├── State Engine: Native JS Arrays, Set, Array.prototype.filter/sort
        ├── Encoding API: native TextDecoder('euc-kr') & FileReader
        └── Library Adapters:
              ├── PapaParse (v5.3.2) - CSV Streaming Parser
              ├── Chart.js (v4.x) - Bar, Doughnut, Scatter (2D Map)
              └── FontAwesome 6 - Vector Icons
```

| 영역 | 사용 기술 / 라이브러리 | 세부 구현 설명 (Vanilla JS 중심) |
| :--- | :--- | :--- |
| **Core Scripting** | **Vanilla JavaScript (ES6+)** | `class`, `const/let`, Arrow Functions, `async/await`, Array Methods (`filter`, `reduce`, `map`, `sort`) |
| **DOM & Event Handling** | **Native DOM API** | `document.getElementById`, `addEventListener`, `element.classList`, Event Delegation |
| **State Management** | **Native In-Memory State** | `allRecords`, `filteredRecords`, `currentQuickFilter`, `currentPage` 등 순수 JS 변수로 상태 관리 |
| **File & Encoding API** | **Native Web API** | `fetch()`, `ArrayBuffer`, `TextDecoder('euc-kr')`, `FileReader`, `Blob`, `URL.createObjectURL` |
| **Styling** | **Tailwind CSS (CDN)** | Light UI Mode 시스템 (Slate/Indigo/Red/Amber/Emerald) |
| **Charts & Icons** | **Chart.js + FontAwesome** | Canvas 기반 렌더링 컨트롤 및 UI 아이콘 |

### 3.2 데이터 컬럼 인터페이스 (TypeScript/JSDoc 타입 명세)

```javascript
/**
 * @typedef {Object} ChildSafetyZoneRecord
 * @property {string} facilityType - 시설종류 (어린이집, 유치원, 초등학교 등)
 * @property {string} name - 대상시설명
 * @property {string} address - 통합 표시 주소
 * @property {number} lat - 위도 (Latitude)
 * @property {number} lng - 경도 (Longitude)
 * @property {string} managingAgency - 관리기관명
 * @property {string} policeStation - 관할경찰서명
 * @property {'Y'|'N'} cctvStatus - CCTV설치여부
 * @property {number} cctvCount - CCTV설치대수
 * @property {string} roadWidth - 보호구역도로폭
 * @property {string} provider - 제공기관명
 * @property {number} vulnerabilityScore - [가공] 안전 취약 지수 (0~100점)
 * @property {'S'|'A'|'B'|'D'|'F'} safetyGrade - [가공] 5단계 안전 등급
 */
```

---

## 4. 3대 핵심 차별화 요소 (Vanilla JS Implementation Specs)

### 4.1 🚨 순수 바닐라 JS 기반 '안전 취약 지수(Vulnerability Score)' 연산 엔진

#### [연산 가중치 산식 및 코드 구조]
어린이 보호구역의 위험도를 종합 평가하여 **0점(최상 안전) ~ 100점(극심 위험)**으로 정량화하는 바닐라 JS 함수입니다.

$$\text{Vulnerability Score} = \min(100, S_{\text{CCTV}} + W_{\text{Facility}} + W_{\text{Road}})$$

```javascript
// Vanilla JS 취약지수 연산 함수
function calculateVulnerability(cctvCount, cctvStatus, facilityType, roadWidth) {
  let score = 0;

  // 1. CCTV 점수 (0대: 50점, 1대: 30점, 2대: 15점)
  if (cctvStatus === 'N' || cctvCount === 0) score += 50;
  else if (cctvCount === 1) score += 30;
  else if (cctvCount === 2) score += 15;

  // 2. 시설 종류 영유아 가중치 (어린이집/유치원: +25점, 초등/특수: +15점)
  const typeStr = String(facilityType || '');
  if (typeStr.includes('어린이집') || typeStr.includes('유치원')) score += 25;
  else if (typeStr.includes('초등학교') || typeStr.includes('특수학교')) score += 15;
  else score += 10;

  // 3. 도로폭 가중치 (6m 미만/미기재: +25점, 6~12m: +15점)
  const widthNum = parseFloat(String(roadWidth).match(/(\d+(\.\d+)?)/)?.[1] || 0);
  if (!roadWidth || roadWidth === '정보 없음' || widthNum < 6) score += 25;
  else if (widthNum >= 6 && widthNum < 12) score += 15;
  else score += 5;

  const finalScore = Math.min(100, score);
  let grade = 'S';
  if (finalScore >= 80) grade = 'F';
  else if (finalScore >= 60) grade = 'D';
  else if (finalScore >= 40) grade = 'B';
  else if (finalScore >= 20) grade = 'A';

  return { score: finalScore, grade };
}
```

#### [5단계 안전 등급 체계]
- **S등급 (0 ~ 19점)**: 🟢 최상 안심 (CCTV 충분, 넓은 도로)
- **A등급 (20 ~ 39점)**: 🔵 양호 (양호한 보행 환경)
- **B등급 (40 ~ 59점)**: 🟣 주의 (보안 보강 필요)
- **D등급 (60 ~ 79점)**: 🟡 경고 (CCTV 추가 설치 시급)
- **F등급 (80 ~ 100점)**: 🚨 **고위험 (안전 사각지대, 긴급 예산 배정 대상)**

---

### 4.2 🗺️ 지도 API 없는 2D 위치 분포 차트 (Chart.js Scatter Chart)

- **구현 방식**: 외부 지도 API 키 등록 없이 Chart.js의 `scatter` 타입을 활용해 바닐라 JS 배열의 위/경도 객체 데이터(`{x: lng, y: lat}`) 시각화.
- **데이터 분치 오버레이**:
  - **CCTV 설치 구역 (`Y`)**: 에메랄드/블루 점 (`rgba(16, 185, 129, 0.5)`)
  - **CCTV 미설치 구역 (`N`)**: 크림슨 레드 점 (`rgba(239, 68, 68, 0.7)`)
- **성능 최적화**: 14,640건 데이터 중 최대 1,500건 표출 제한으로 60fps 렌더링 유지.

---

### 4.3 📝 원클릭 정책 보고서 브리핑 텍스트 자동 생성기

- **구현 방식**: 바닐라 JS 템플릿 리터럴(Template Literal)을 이용하여 필터 변경 시 `textContent` 동적 생성.
- **클립보드 저장**: `navigator.clipboard.writeText()` API 기반의 100% 순수 JS 복사 및 UI 피드백.

---

## 5. 세부 기능 및 레이아웃 명세 (Detailed Layout & Components)

1. **Header & File Upload**:
   - `fetch()` + `TextDecoder('euc-kr')` 자동 로딩 및 `input[type="file"]` 수동 변경 이벤트 리스너.
2. **KPI Cards (4종)**:
   - 총 보호구역 수 | 🔴 CCTV 미설치 구역 수 | ⚠️ 미설치 비율(%) | 🚨 F등급(고위험) 구역 수
3. **Smart Filters & Policy Brief Panel**:
   - 퀵 필터 4종 (`전체`, `🔴 미설치`, `🚨 F등급 고위험`, `🟡 취약구역`), 드롭다운 3종, 검색창.
   - **정책 브리핑 박스 & 바닐라 JS 복사 버튼**.
   - **UTF-8 BOM CSV Export (`Blob` 생성)**.
4. **Visualization Dashboard (3개 차트)**:
   - **Chart 1 (Bar)**: TOP 10 미설치 관할 경찰서
   - **Chart 2 (Doughnut)**: 시설 종류별 미설치 비율
   - **Chart 3 (Scatter)**: 2D 위경도 위치 분포도
5. **Interactive Data Table & Modal**:
   - 바닐라 JS `document.createElement('tr')` 동적 DOM 생성.
   - 컬럼 클릭 정렬 (`Array.prototype.sort`), 페이징 (`Array.prototype.slice`), 행 클릭 모달.

---

## 6. UI/UX 디자인 가이드라인 (Light UI System)

- **Main Theme**: White & Slate Clean Light Mode (`bg-slate-50`, `bg-white`, `border-slate-200`)
- **Badge Colors**:
  - **S등급**: `bg-emerald-100 text-emerald-800 border-emerald-300`
  - **A등급**: `bg-blue-100 text-blue-800 border-blue-300`
  - **B등급**: `bg-indigo-100 text-indigo-800 border-indigo-300`
  - **D등급**: `bg-amber-100 text-amber-800 border-amber-300`
  - **F등급**: `bg-red-100 text-red-700 border-red-200 font-extrabold animate-pulse`

---

## 7. 검증 및 품질 테스트 요건 (Verification Standards)

1. **바닐라 JS 순수 동작 검증**: 외부 JS 프레임워크(React/Vue 등) 없이 브라우저 단독 실행 100% 정상 작동 검증.
2. **EUC-KR 자동 디코딩 검증**: `TextDecoder('euc-kr')`로 `전국어린이보호구역표준데이터.csv` 14,640건 한글 깨짐 없이 정상 로드.
3. **취약 지수 계산 검증**: CCTV 0대, 영유아 시설, 협소 도로 폭 조건 시 80점 이상 F등급 산출 확인.
4. **2D Scatter Chart 좌표 검증**: 위도 33~39, 경도 124~132 좌표 범위 산점도 표출 확인.
5. **CSV Export 검증**: `Blob` 기반 UTF-8 BOM 다운로드 파일 엑셀 한글 정상 출력 확인.
