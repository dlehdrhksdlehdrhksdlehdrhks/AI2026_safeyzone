<!DOCTYPE html>
<html lang="ko" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>양정고 이동관 | 인공지능일반 포트폴리오</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Tailwind Config for Dark Mode and Fonts -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#f0f7ff',
                            100: '#e0effe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        },
                        ai: {
                            purple: '#8b5cf6',
                            emerald: '#10b981',
                            amber: '#f59e0b',
                            rose: '#f43f5e'
                        }
                    },
                    fontFamily: {
                        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Chart.js for Interactive Data Graphics -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        /* Custom Smooth Scroll & Glassmorphic Styling */
        html {
            scroll-behavior: smooth;
        }
        .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .light .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .glow-hover:hover {
            box-shadow: 0 0 25px -5px rgba(59, 130, 246, 0.4);
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #475569;
        }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen selection:bg-brand-500 selection:text-white transition-colors duration-300 light:bg-slate-50 light:text-slate-900">

    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors duration-300">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-ai-purple flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-brand-500/20">
                    AI
                </div>
                <div>
                    <span class="font-bold text-lg tracking-tight block leading-tight">양정고 이동관</span>
                    <span class="text-xs text-slate-400 font-medium">2026학년도 인공지능일반 포트폴리오</span>
                </div>
            </div>

            <!-- Header Quick Controls -->
            <div class="flex items-center space-x-3">
                <button id="themeToggleBtn" onclick="toggleTheme()" class="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/50" title="화면 테마 변경">
                    <i data-lucide="sun" class="w-5 h-5 hidden dark:block"></i>
                    <i data-lucide="moon" class="w-5 h-5 block dark:hidden text-slate-700"></i>
                </button>
                <a href="#reflection" class="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-medium text-sm transition-all shadow-md shadow-brand-600/30">
                    <i data-lucide="award" class="w-4 h-4"></i>
                    <span>최종 성찰 보기</span>
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Profile Section -->
    <header class="relative pt-10 pb-16 px-4 lg:px-8 overflow-hidden">
        <!-- Background Ambient Glows -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div class="absolute top-1/3 right-10 w-[300px] h-[300px] bg-ai-purple/15 blur-[100px] rounded-full pointer-events-none"></div>

        <div class="max-w-7xl mx-auto">
            <div class="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                    
                    <!-- Profile Picture with Dynamic Fallback -->
                    <div class="relative group flex-shrink-0">
                        <div class="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden ring-4 ring-brand-500/30 shadow-2xl relative bg-slate-800">
                            <!-- Image tries profile.png first, falls back to KakaoTalk style minimalist default profile icon on error -->
                            <img id="userProfileImg" src="profile.png" 
                                 onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><rect width=\'100\' height=\'100\' fill=\'%23a0aec0\'/><circle cx=\'50\' cy=\'38\' r=\'18\' fill=\'%23edf2f7\'/><path d=\'M 18 88 C 18 68 32 60 50 60 C 68 60 82 68 82 88 Z\' fill=\'%23edf2f7\'/></svg>';" 
                                 alt="양정고 이동관 프로필 사진" 
                                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        </div>
                        <span class="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full border-2 border-slate-900 flex items-center gap-1 shadow-md">
                            <span class="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
                            양정고 2학년
                        </span>
                    </div>

                    <!-- Profile Info & Bio -->
                    <div class="flex-1 text-center md:text-left space-y-4 w-full">
                        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                            <div>
                                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-2">
                                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                                    AI & Data Science Student Portfolio
                                </div>
                                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                                    이동관 <span class="text-slate-400 font-normal text-2xl sm:text-3xl">(Lee Dong-kwan)</span>
                                </h1>
                                <p class="text-slate-400 text-sm sm:text-base mt-1 font-medium">
                                    🏫 양정고등학교 &nbsp;|&nbsp; 📘 교과목: <strong class="text-brand-400">인공지능일반</strong>
                                </p>
                            </div>

                            <!-- 집가고 싶다 버튼 -->
                            <a href="zip.html" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl border border-slate-700/50 transition-all shadow-lg hover:shadow-brand-500/20 group shrink-0 mx-auto md:mx-0">
                                <i data-lucide="home" class="w-4 h-4 text-brand-400 group-hover:-translate-y-0.5 transition-transform"></i>
                                <span class="font-medium text-sm">집가고 싶다</span>
                            </a>
                        </div>

                        <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                            "인공지능의 단순한 소비자를 넘어, <strong>기술적 윤리의식</strong>과 <strong>데이터 기반 사고력</strong>으로 
                            우리 사회 및 학교의 문제를 정의하고 해결하는 창의적 AI 인재로 성장하고 있습니다."
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Portfolio Section Header & Interactive Filters -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 pb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
                    <i data-lucide="layout-grid" class="w-7 h-7 text-brand-500"></i>
                    포트폴리오 프로젝트 모음
                </h2>
                <p class="text-slate-400 text-sm mt-1">한 학기 동안 탐구하고 제작한 8개 핵심 성과 카드입니다. 각 카드를 클릭하면 상세보고서를 확인하실 수 있습니다.</p>
            </div>

            <!-- Search and Category Filter -->
            <div class="flex flex-col sm:flex-row gap-2.5">
                <!-- Search input -->
                <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    <input type="text" id="searchInput" oninput="filterCards()" placeholder="키워드 검색 (예: 데이터, 웹앱)" 
                           class="w-full sm:w-56 bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500 transition-colors">
                </div>
                
                <!-- Category buttons -->
                <div class="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 gap-1 text-xs">
                    <button onclick="setFilter('all')" class="filter-btn active px-3 py-1.5 rounded-lg font-medium transition-all bg-brand-600 text-white" data-cat="all">전체</button>
                    <button onclick="setFilter('ai')" class="filter-btn px-3 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white transition-all" data-cat="ai">AI윤리/활용</button>
                    <button onclick="setFilter('data')" class="filter-btn px-3 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white transition-all" data-cat="data">데이터분석</button>
                    <button onclick="setFilter('app')" class="filter-btn px-3 py-1.5 rounded-lg font-medium text-slate-400 hover:text-white transition-all" data-cat="app">웹앱/개발</button>
                </div>
            </div>
        </div>

        <!-- Portfolio Cards Grid -->
        <div id="portfolioGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- Card 1: 생성형 AI 활용 원칙 -->
            <a href="./notebooklm/index.html" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="ai" data-keywords="생성형 AI 활용 원칙 윤리 프롬프트 가이드라인">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                            01. AI 윤리 & 원칙
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                            <i data-lucide="shield-check" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">생성형 AI 활용 원칙</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        올바른 인공지능 활용을 위한 나만의 5대 윤리 원칙 설정. 데이터 프라이버시, 출처 명시, 할루시네이션(환각) 검증 체계를 정립한 헌장 선언.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#AI윤리헌장</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#환각검증</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#저작권</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>상세 보고서 및 원칙 보기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 2: AI 스토리와 영상 -->
            <a href="./storybook/index.html" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="ai" data-keywords="AI 스토리 영상 바이브코딩 부산대정컴 시네마틱 스토리북 영앤리치">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-purple/20 text-ai-purple border border-ai-purple/30">
                            02. AI 멀티미디어
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-purple/10 flex items-center justify-center text-ai-purple group-hover:bg-ai-purple group-hover:text-white transition-colors">
                            <i data-lucide="video" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-purple transition-colors">AI 스토리와 영상</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        부산대 정보컴퓨터공학부 입학부터 독보적인 '바이브 코딩' 기술로 업계를 흔들고, 펜트하우스와 럭셔리 라이프, 운명의 여자친구까지 모두 거머쥔 동관이의 시네마틱 성공기 스토리.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#바이브코딩</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#부산대정컴</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#시네마틱스토리</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-purple font-semibold group-hover:translate-x-1 transition-transform">
                        <span>시네마틱 스토리북 보기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 3: 진로 데이터 분석 (Swapped Title) -->
            <a href="./uni/index.html" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="data" data-keywords="나의 진로 리포트 커리어 로드맵 역량 레이더 차트 비전">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-emerald/20 text-ai-emerald border border-ai-emerald/30">
                            03. 데이터 탐구
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-emerald/10 flex items-center justify-center text-ai-emerald group-hover:bg-ai-emerald group-hover:text-white transition-colors">
                            <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-emerald transition-colors">진로 데이터 분석</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        'AI 시대의 이동관' 역량 진단 보고서. SW 개발 능력, 인공지능 윤리관, 데이터 해석력 등 5가지 핵심 지표 레이더 차트 진단 및 10년 로드맵.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#역량레이더</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#10년로드맵</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#AI서비스기획자</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-emerald font-semibold group-hover:translate-x-1 transition-transform">
                        <span>상세 분석 보고서 보기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 4: 나의 진로 리포트 (Swapped Title) -->
            <a href="./data1/index.html" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="data" data-keywords="진로 데이터 분석 부산대학교 정보컴퓨터공학부 인공지능전공 컴퓨터공학전공 비교 분석">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-amber/20 text-ai-amber border border-ai-amber/30">
                            04. 커리어 플랜
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-amber/10 flex items-center justify-center text-ai-amber group-hover:bg-ai-amber group-hover:text-white transition-colors">
                            <i data-lucide="user-check" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-amber transition-colors">나의 진로 리포트</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        부산대학교 정보컴퓨터공학부의 <strong>인공지능전공</strong>과 <strong>컴퓨터공학전공</strong> 커리큘럼 및 진로 방향을 심층 비교 분석하여 적성에 맞는 전공을 탐색한 보고서.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#부산대정컴</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#인공지능전공</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#컴퓨터공학전공</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-amber font-semibold group-hover:translate-x-1 transition-transform">
                        <span>진로 비전 & 역량 평가 열람</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 5: 지역 문제 데이터 분석 -->
            <a href="https://dlehdrhksdlehdrhksdlehdrhks.github.io/AI2026_safeyzone/" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="data" data-keywords="지역 문제 데이터 분석 어린이 보호구역 전국 표준 데이터 안전 등급 FS급">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-rose/20 text-ai-rose border border-ai-rose/30">
                            05. 지역사회 탐구
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-rose/10 flex items-center justify-center text-ai-rose group-hover:bg-ai-rose group-hover:text-white transition-colors">
                            <i data-lucide="map-pin" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-rose transition-colors">지역 문제 데이터 분석</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        전국 어린이 보호구역 표준 데이터를 바탕으로 작성되었습니다. 처음엔 그냥 샘플의 반대로 만드는 것이 목표였지만 그렇게만 하면 조교님이 재미없다고 하셔서 각 구역별로 F~S급으로 등급을 매겨 독특한 요소를 추가했습니다.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#어린이보호구역</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#FS등급제</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#전국표준데이터</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-rose font-semibold group-hover:translate-x-1 transition-transform">
                        <span>어린이 보호구역 웹앱 바로가기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </a>

            <!-- Card 6: 학교 문제 해결 웹앱 -->
            <div class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="app" data-keywords="학교 문제 해결 웹앱 양정고 급식 매점 혼잡도 YJ-Smart" onclick="openModal(6)">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                            06. 교내 문제 해결
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                            <i data-lucide="smartphone" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">학교 문제 해결 웹앱</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        양정고 매점 대기시간 단축 및 급식 잔반 모니터링 서비스 <strong>"YJ-SmartSchool 웹앱"</strong> 프로토타입 설계 및 프론트엔드 구현.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#양정고매점앱</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#잔반줄이기</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#UIUX설계</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>웹앱 화면 및 아키텍처 보기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </div>

            <!-- Card 7: 공공데이터 앱 -->
            <div class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group"
                 data-category="app" data-keywords="공공데이터 앱 API 미세먼지 환경 실시간 대시보드" onclick="openModal(7)">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-emerald/20 text-ai-emerald border border-ai-emerald/30">
                            07. OpenAPI 개발
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-emerald/10 flex items-center justify-center text-ai-emerald group-hover:bg-ai-emerald group-hover:text-white transition-colors">
                            <i data-lucide="globe" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-emerald transition-colors">공공데이터 앱</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        공공데이터 포털 Open API 연동. 학교 주변 실시간 미세먼지 측정치 및 야외 체육 활동 위험 지수를 자동 산출하는 라이브 대시보드.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#공공데이터포털</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#API연동</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#미세먼지예보</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-emerald font-semibold group-hover:translate-x-1 transition-transform">
                        <span>API 연동 결과 및 구동 화면</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </div>

            <!-- Card 8: 최종 성찰 내용 -->
            <div id="reflection" class="portfolio-card glass-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 glow-hover cursor-pointer group border-ai-amber/30"
                 data-category="ai" data-keywords="최종 성찰 회고 KPT 인공지능일반 소감 이동관" onclick="openModal(8)">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-ai-amber/20 text-ai-amber border border-ai-amber/30">
                            08. 종합 성찰
                        </span>
                        <div class="w-9 h-9 rounded-xl bg-ai-amber/10 flex items-center justify-center text-ai-amber group-hover:bg-ai-amber group-hover:text-white transition-colors">
                            <i data-lucide="award" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-ai-amber transition-colors">최종 성찰 내용</h3>
                    <p class="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">
                        '인공지능일반' 한 학기 과정을 마치며: KPT 회고 모델(Keep, Problem, Try) 기반 학습 성찰과 앞으로의 고교/대학 진학 후 AI 탐구 방향.
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#KPT회고</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#학습소감</span>
                        <span class="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">#미래포부</span>
                    </div>
                    <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-ai-amber font-semibold group-hover:translate-x-1 transition-transform">
                        <span>성찰 전문 열람하기</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Interactive Visitor/Peer Reflection Section -->
    <section class="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-2xl font-bold flex items-center gap-2">
                        <i data-lucide="message-square" class="w-6 h-6 text-brand-500"></i>
                        동료 피드백 및 응원 한마디
                    </h3>
                    <p class="text-slate-400 text-sm mt-1">포트폴리오를 둘러보신 친구, 선생님의 피드백을 남겨주세요.</p>
                </div>
            </div>

            <!-- Comment Form -->
            <form onsubmit="addComment(event)" class="flex flex-col sm:flex-row gap-3 mb-6">
                <input type="text" id="commenterName" required placeholder="작성자 이름 (예: 김양정)" 
                       class="sm:w-44 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-500">
                <input type="text" id="commentText" required placeholder="이동관 학생에게 남길 한마디 메시지를 입력하세요" 
                       class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-500">
                <button type="submit" class="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20">
                    <i data-lucide="send" class="w-4 h-4"></i>
                    <span>등록</span>
                </button>
            </form>

            <!-- Comments Container -->
            <div id="commentsList" class="space-y-3">
                <div class="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start justify-between">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-sm text-slate-200">인공지능일반 담당 선생님</span>
                            <span class="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">Teacher</span>
                        </div>
                        <p class="text-slate-300 text-sm mt-1">"이동관 학생의 포트폴리오는 단순 AI 사용법에 그치지 않고 학교 문제 해결과 윤리적 검증까지 다각도로 접근한 점이 매우 인상적입니다."</p>
                    </div>
                    <span class="text-xs text-slate-500">2026.07</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <div class="max-w-7xl mx-auto px-4">
            <p>양정고등학교 이동관 | 2026학년도 인공지능일반 교과목 포트폴리오 랜딩페이지</p>
            <p class="mt-1">Built with HTML5, Tailwind CSS & Chart.js</p>
        </div>
    </footer>

    <!-- Detail View Modal Overlay -->
    <div id="detailModal" class="fixed inset-0 z-50 hidden bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div class="glass-card max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 max-h-[90vh] flex flex-col my-auto relative animate-in fade-in zoom-in duration-200">
            
            <!-- Modal Header -->
            <div class="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-10">
                <div class="flex items-center space-x-3">
                    <span id="modalBadge" class="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                        카테고리
                    </span>
                    <h3 id="modalTitle" class="text-xl font-bold text-white">프로젝트 제목</h3>
                </div>
                <button onclick="closeModal()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Modal Content (Scrollable) -->
            <div class="p-6 sm:p-8 space-y-6 overflow-y-auto text-slate-300 text-sm leading-relaxed" id="modalBody">
                <!-- Content dynamically injected via JS -->
            </div>

            <!-- Modal Footer -->
            <div class="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
                <span>양정고 이동관 AI 포트폴리오</span>
                <button onclick="closeModal()" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl transition-colors">
                    닫기
                </button>
            </div>
        </div>
    </div>

    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        // Theme Toggle Function
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            document.documentElement.classList.toggle('light');
        }

        // Search & Category Filter Logic
        let currentFilter = 'all';

        function setFilter(category) {
            currentFilter = category;
            
            // Update button UI
            document.querySelectorAll('.filter-btn').forEach(btn => {
                if (btn.dataset.cat === category) {
                    btn.classList.add('bg-brand-600', 'text-white');
                    btn.classList.remove('text-slate-400');
                } else {
                    btn.classList.remove('bg-brand-600', 'text-white');
                    btn.classList.add('text-slate-400');
                }
            });

            filterCards();
        }

        function filterCards() {
            const searchText = document.getElementById('searchInput').value.toLowerCase();
            const cards = document.querySelectorAll('.portfolio-card');

            cards.forEach(card => {
                const matchesCat = (currentFilter === 'all') || (card.dataset.category === currentFilter);
                const matchesSearch = card.dataset.keywords.toLowerCase().includes(searchText) || 
                                      card.textContent.toLowerCase().includes(searchText);

                if (matchesCat && matchesSearch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Comment Submission System
        function addComment(e) {
            e.preventDefault();
            const nameInput = document.getElementById('commenterName');
            const textInput = document.getElementById('commentText');
            
            const name = nameInput.value.trim();
            const text = textInput.value.trim();

            if (!name || !text) return;

            const list = document.getElementById('commentsList');
            const newComment = document.createElement('div');
            newComment.className = "p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-start justify-between animate-in fade-in duration-300";
            
            const today = new Date();
            const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}`;

            newComment.innerHTML = `
                <div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold text-sm text-slate-200">${escapeHtml(name)}</span>
                        <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Guest</span>
                    </div>
                    <p class="text-slate-300 text-sm mt-1">"${escapeHtml(text)}"</p>
                </div>
                <span class="text-xs text-slate-500">${dateStr}</span>
            `;

            list.prepend(newComment);
            nameInput.value = '';
            textInput.value = '';
        }

        function escapeHtml(text) {
            return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        // Active Chart Instance variable to clean up chart canvas on modal close
        let currentChart = null;

        // Portfolio Data Repository for Modals
        const portfolioDetails = {
            1: {
                badge: "01. AI 윤리 & 원칙",
                title: "생성형 AI 활용 원칙 (Ethics & Rules)",
                render: () => `
                    <div class="space-y-4">
                        <div class="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-300">
                            <h4 class="font-bold text-base mb-1">🎯 탐구 목적 및 개요</h4>
                            <p>생성형 AI 기술의 급격한 발전 속에서 무분별한 사용을 지양하고, 책임감 있는 고등학생 연구자로서 지켜야 할 **5대 프롬프트 윤리 원칙**을 직접 제정하였습니다.</p>
                        </div>

                        <h4 class="font-bold text-slate-100 text-base mt-4">📜 이동관의 생성형 AI 활용 5대 원칙</h4>
                        <div class="space-y-2.5">
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3 items-start">
                                <span class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                                <div>
                                    <strong class="text-slate-200">출처 명시 및 저작권 준수</strong>
                                    <p class="text-slate-400 text-xs mt-0.5">AI가 생성한 아이디어나 코드를 수용할 경우 반드시 프롬프트 및 인용 출처를 포트폴리오에 명기한다.</p>
                                </div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3 items-start">
                                <span class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                                <div>
                                    <strong class="text-slate-200">환각(Hallucination) 3단계 교차 검증</strong>
                                    <p class="text-slate-400 text-xs mt-0.5">AI 답변을 100% 신뢰하지 않고 교과서, 학술 논문, 공공데이터 포털을 통한 팩트체크를 필수적으로 거친다.</p>
                                </div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3 items-start">
                                <span class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                                <div>
                                    <strong class="text-slate-200">개인정보 및 교내 데이터 보안 유지</strong>
                                    <p class="text-slate-400 text-xs mt-0.5">학생 민감 정보, 교내 보안 데이터를 외부 대형 언어 모델(LLM)에 직접 입력하지 않는다.</p>
                                </div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3 items-start">
                                <span class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
                                <div>
                                    <strong class="text-slate-200">편향성 인식 및 공정성 확보</strong>
                                    <p class="text-slate-400 text-xs mt-0.5">AI 학습 데이터에 존재할 수 있는 사회적, 성별, 지역적 편향을 인지하고 균형 잡힌 프롬프트를 작성한다.</p>
                                </div>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex gap-3 items-start">
                                <span class="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">5</span>
                                <div>
                                    <strong class="text-slate-200">주도적 비판적 사고 유지</strong>
                                    <p class="text-slate-400 text-xs mt-0.5">AI는 보조 도구로만 활용하며, 문제 정의와 최종 문제해결의 주체는 나 자신임을 잊지 않는다.</p>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mt-4">
                            <h5 class="font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">실습 활동 사진/증빙</h5>
                            <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                                [Prompt Check Workflow]<br>
                                User Query ➔ LLM Response ➔ Fact-Checking via Public Data API ➔ Verified Portfolio Insight
                            </div>
                        </div>
                    </div>
                `
            },
            2: {
                badge: "02. AI 멀티미디어",
                title: "AI 스토리와 영상 (AI Storytelling & Video)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            생성형 AI 도구(ChatGPT, Midjourney, Runway Gen-2)를 융합하여 <strong>"2040년 스마트 양정고등학교의 하루"</strong>라는 SF 숏폼 시나리오를 기획하고 콘티를 제작했습니다.
                        </p>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                                <span class="text-xs font-bold text-ai-purple">SCENE #1</span>
                                <h5 class="font-bold text-white text-base mt-1">AI 자율 학습 클래스</h5>
                                <p class="text-slate-400 text-xs mt-2 leading-relaxed">
                                    학생 맞춤형 3D 홀로그램 AI 튜터가 양정고 교실에서 실시간 알고리즘 튜토링을 진행하는 장면 연출.
                                </p>
                                <div class="mt-3 p-2 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
                                    Prompt: /imagine cinematic shot, futuristic high school classroom in Seoul, holographic AI teacher, cyberpunk daylight, 8k --ar 16:9
                                </div>
                            </div>

                            <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                                <span class="text-xs font-bold text-ai-purple">SCENE #2</span>
                                <h5 class="font-bold text-white text-base mt-1">친환경 스마트 식당</h5>
                                <p class="text-slate-400 text-xs mt-2 leading-relaxed">
                                    비전 AI가 급식 잔반을 스캔하여 학생 건강 데이터를 분석하고 메뉴를 추천하는 미래 급식실.
                                </p>
                                <div class="mt-3 p-2 bg-slate-950 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
                                    Prompt: futuristic school cafeteria, AI camera scanning food plates, UI data overlay, clean glass design --v 6.0
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-2xl bg-ai-purple/10 border border-ai-purple/20">
                            <h4 class="font-bold text-ai-purple text-sm mb-1">🎬 프롬프트 엔지니어링 시사점</h4>
                            <p class="text-xs text-slate-300 leading-relaxed">
                                디테일한 카메라 앵글, 조명 조건, 스타일 키워드를 명시할 때 원하는 영상 스틸컷의 일관성이 유지됨을 확인하였습니다. AI 창작 도구는 연출자의 명확한 의도 파악이 가장 중요함을 깨달았습니다.
                            </p>
                        </div>
                    </div>
                `
            },
            3: {
                badge: "03. 데이터 탐구",
                title: "진로 데이터 분석 (Career Trend Analysis)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            SW 인공지능 분야의 일자리 트렌드 공공데이터를 Python Pandas로 정제하고, 미래 직무 수요 변화를 시각화하였습니다.
                        </p>

                        <!-- Chart Container -->
                        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                            <h4 class="font-bold text-sm text-slate-200 mb-3 text-center">📈 AI 및 SW 주요 직무 연도별 채용 공고 수 추이 (단위: 건)</h4>
                            <div class="w-full h-56">
                                <canvas id="careerChart"></canvas>
                            </div>
                        </div>

                        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                            <h4 class="font-bold text-sm text-ai-emerald mb-2">💡 데이터 분석 핵심 발견점</h4>
                            <ul class="list-disc list-inside text-xs text-slate-300 space-y-1.5">
                                <li>단순 코딩 프로그래머 수요 대비 **AI 엔지니어 및 데이터 분석가 채용 수요가 매년 약 35% 이상 급증**.</li>
                                <li>채용 우수 조건으로 'AI 윤리관', '도메인 지식 융합 능력', '프롬프트 설계 능력' 언급 비율 대폭 증가.</li>
                            </ul>
                        </div>
                    </div>
                `,
                initChart: () => {
                    const ctx = document.getElementById('careerChart').getContext('2d');
                    currentChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: ['2022', '2023', '2024', '2025', '2026(예상)'],
                            datasets: [{
                                label: 'AI SW 엔지니어',
                                data: [1200, 2100, 3800, 5900, 8500],
                                borderColor: '#10b981',
                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                fill: true,
                                tension: 0.3
                            }, {
                                label: '데이터 분석가',
                                data: [1500, 2300, 3400, 4800, 6700],
                                borderColor: '#3b82f6',
                                backgroundColor: 'transparent',
                                tension: 0.3
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { labels: { color: '#94a3b8' } } },
                            scales: {
                                x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                                y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
                            }
                        }
                    });
                }
            },
            4: {
                badge: "04. 커리어 플랜",
                title: "나의 진로 리포트 (My Career Radar)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            인공지능 시대를 주도하는 **AI 서비스 기획자 & 데이터 엔지니어**로 성장하기 위한 이동관의 자기 역량 평가 및 10년 로드맵 리포트입니다.
                        </p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <!-- Radar Chart -->
                            <div class="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                                <h4 class="font-bold text-xs text-center text-slate-300 mb-2">📊 이동관 5대 핵심 역량 평가</h4>
                                <div class="w-full h-52">
                                    <canvas id="radarChart"></canvas>
                                </div>
                            </div>

                            <div class="space-y-2 text-xs">
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                    <strong class="text-ai-amber">🎓 대학 진학 및 단기 목표 (1~3년)</strong>
                                    <p class="text-slate-400 mt-1">컴퓨터공학 / 인공지능학과 진학 후 Python, PyTorch 모델 구현 능력 심화 및 공공 데이터 활용 대항전 참가.</p>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                    <strong class="text-ai-amber">🚀 장기 비전 (5~10년)</strong>
                                    <p class="text-slate-400 mt-1">사회적 문제를 해결하는 헬스케어 & 에듀테크 기반 AI 서비스 리드 기획자로 성장.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                initChart: () => {
                    const ctx = document.getElementById('radarChart').getContext('2d');
                    currentChart = new Chart(ctx, {
                        type: 'radar',
                        data: {
                            labels: ['SW 개발능력', 'AI 윤리의식', '데이터 해석력', '창의적 문제해결', '협업/소통'],
                            datasets: [{
                                label: '이동관 역량 점수',
                                data: [88, 95, 90, 92, 85],
                                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                borderColor: '#f59e0b',
                                pointBackgroundColor: '#f59e0b'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: {
                                r: {
                                    angleLines: { color: '#334155' },
                                    grid: { color: '#334155' },
                                    pointLabels: { color: '#94a3b8', font: { size: 10 } },
                                    ticks: { display: false, backdropColor: 'transparent' },
                                    suggestedMin: 50,
                                    suggestedMax: 100
                                }
                            }
                        }
                    });
                }
            },
            5: {
                badge: "05. 지역사회 탐구",
                title: "지역 문제 데이터 분석 (어린이 보호구역 안전 지도)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            전국 어린이 보호구역 표준 데이터를 바탕으로 분석을 진행하였습니다. 처음엔 그냥 샘플의 반대로 만드는 것이 목표였지만, 그렇게만 하면 조교님이 재미없다고 하셔서 **각 구역별로 F~S급으로 등급**을 매겨 독특한 분석 요소를 추가하였습니다.
                        </p>

                        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                            <h4 class="font-bold text-slate-200 text-sm">📍 어린이 보호구역 F~S급 평가 프로젝트</h4>
                            
                            <div class="space-y-2">
                                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                                    <span class="text-slate-300 font-medium">구역별 F~S 등급 산정 알고리즘</span>
                                    <span class="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">등급 시스템 적용</span>
                                </div>
                                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                                    <span class="text-slate-300 font-medium">전국 어린이 보호구역 표준 데이터</span>
                                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Standard Data</span>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-2xl bg-ai-rose/10 border border-ai-rose/20">
                            <h4 class="font-bold text-ai-rose text-sm mb-1">🔗 외부 웹앱 서비스 이동</h4>
                            <p class="text-xs text-slate-300 leading-relaxed mb-3">
                                아래 버튼을 클릭하여 구축된 어린이 보호구역 안전 지도 사이트로 직접 접속할 수 있습니다.
                            </p>
                            <a href="https://dlehdrhksdlehdrhksdlehdrhks.github.io/AI2026_safeyzone/" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-ai-rose text-white rounded-xl font-bold text-xs hover:bg-rose-600 transition-colors">
                                <span>어린이 보호구역 웹앱 열기</span>
                                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </div>
                `
            },
            6: {
                badge: "06. 교내 문제 해결",
                title: "학교 문제 해결 웹앱 (YJ-SmartSchool)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            양정고등학교 학생들의 불편사항인 **'쉬는 시간 매점 줄 쏠림 현상'**과 **'급식 잔반 문제'**를 해결하기 위한 웹 애플리케이션 프로토타입을 제작했습니다.
                        </p>

                        <!-- Mock UI Display -->
                        <div class="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                            <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span class="font-bold text-xs text-brand-400">📱 YJ-SmartSchool App UI Preview</span>
                                <span class="text-[10px] text-slate-500">v1.0 Live</span>
                            </div>

                            <div class="grid grid-cols-2 gap-3 text-center">
                                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                                    <div class="text-xs text-slate-400">현재 매점 혼잡도</div>
                                    <div class="text-lg font-extrabold text-amber-400 mt-1">보통 (대기 4분)</div>
                                    <div class="text-[10px] text-slate-500 mt-0.5">AI 카메라 스캔 완료</div>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800">
                                    <div class="text-xs text-slate-400">오늘의 잔반 감소 포인트</div>
                                    <div class="text-lg font-extrabold text-emerald-400 mt-1">+150 pt</div>
                                    <div class="text-[10px] text-slate-500 mt-0.5">양정고 전체 3위</div>
                                </div>
                            </div>
                        </div>

                        <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs leading-relaxed space-y-1">
                            <strong class="text-slate-200">✨ 주요 구현 기능:</strong>
                            <p class="text-slate-400">· 매점 카메라 혼잡도 실시간 분석 알고리즘 (Computer Vision 아이디어)</p>
                            <p class="text-slate-400">· 급식 잔반 제로 인증 시 매점 쿠폰 포인트를 지급하는 게이미피케이션(Gamification)</p>
                        </div>
                    </div>
                `
            },
            7: {
                badge: "07. OpenAPI 개발",
                title: "공공데이터 앱 (Air Quality Dashboard)",
                render: () => `
                    <div class="space-y-4">
                        <p class="text-slate-300">
                            공공데이터 포털(data.go.kr)의 한국환경공단 실시간 미세먼지 API를 연동하여 양정고 운동장 체육 활동 가능 여부를 알려주는 실시간 대시보드입니다.
                        </p>

                        <!-- Live Interactive Data Simulation Widget -->
                        <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span class="font-bold text-xs text-slate-200">서울시 양천구 목동 측정소 (실시간)</span>
                                </div>
                                <button onclick="simulateApiRefresh()" class="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] text-slate-300 hover:text-white flex items-center gap-1">
                                    <i data-lucide="refresh-cw" class="w-3 h-3"></i> API 새로고침
                                </button>
                            </div>

                            <div class="grid grid-cols-2 gap-3 text-center">
                                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                    <span class="text-xs text-slate-400">미세먼지 (PM10)</span>
                                    <div id="pm10Val" class="text-2xl font-bold text-emerald-400 mt-1">28 ㎛/㎥</div>
                                    <span class="text-[10px] text-emerald-400 font-semibold">좋음 😀</span>
                                </div>
                                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                                    <span class="text-xs text-slate-400">초미세먼지 (PM2.5)</span>
                                    <div id="pm25Val" class="text-2xl font-bold text-emerald-400 mt-1">12 ㎛/㎥</div>
                                    <span class="text-[10px] text-emerald-400 font-semibold">좋음 😀</span>
                                </div>
                            </div>

                            <div id="statusAlert" class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs text-center font-medium">
                                ✅ 현재 야외 체육 활동 및 운동장 사용에 적합한 상태입니다.
                            </div>
                        </div>
                    </div>
                `
            },
            8: {
                badge: "08. 종합 성찰",
                title: "최종 성찰 내용 (Final Reflection)",
                render: () => `
                    <div class="space-y-4">
                        <div class="p-4 rounded-2xl bg-ai-amber/10 border border-ai-amber/20 text-ai-amber">
                            <h4 class="font-bold text-base mb-1">🎓 '인공지능일반' 한 학기를 마치며</h4>
                            <p class="text-xs text-slate-200 leading-relaxed">
                                인공지능은 단순한 미래 기술이 아니라, 지금 당장 양정고 교실과 양천구 지역사회의 문제를 해결할 수 있는 강력한 도구임을 배웠습니다.
                            </p>
                        </div>

                        <h4 class="font-bold text-slate-100 text-base mt-2">📋 KPT 회고 (Keep - Problem - Try)</h4>
                        
                        <div class="space-y-3 text-xs">
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <strong class="text-emerald-400 text-sm">🟢 Keep (지속할 점)</strong>
                                <p class="text-slate-300 mt-1">AI 도구를 쓸 때 팩트체크 원칙을 철저히 지킨 점과 데이터 기반으로 실질적 아이디어를 도출한 시도.</p>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <strong class="text-rose-400 text-sm">🔴 Problem (아쉬웠던 점)</strong>
                                <p class="text-slate-300 mt-1">실제 Python 머신러닝 라이브러리(Scikit-learn) 코딩 구현 시 복잡한 튜닝에 대한 이해도가 아직 부족했음.</p>
                            </div>
                            <div class="p-3 rounded-xl bg-slate-900 border border-slate-800">
                                <strong class="text-brand-400 text-sm">🔵 Try (앞으로의 시도)</strong>
                                <p class="text-slate-300 mt-1">다음 학기에는 양정고 실제 공공데이터를 수집하여 직접 머신러닝 모델을 학습시키고 배포하는 프로젝트 도전하기.</p>
                            </div>
                        </div>

                        <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                            <p class="text-slate-300 text-xs italic">
                                "기술을 깊이 이해하고, 사람을 향해 기술을 사용하는 온기 있는 AI 전문가 이동관이 되겠습니다."
                            </p>
                        </div>
                    </div>
                `
            }
        };

        // Open Modal Handler
        function openModal(id) {
            const modal = document.getElementById('detailModal');
            const data = portfolioDetails[id];

            if (!data) return;

            // Destroy previous chart if open
            if (currentChart) {
                currentChart.destroy();
                currentChart = null;
            }

            document.getElementById('modalBadge').textContent = data.badge;
            document.getElementById('modalTitle').textContent = data.title;
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = data.render();

            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Refresh Lucide icons in modal content
            lucide.createIcons();

            // Initialize Chart if card has one
            if (data.initChart) {
                setTimeout(() => {
                    data.initChart();
                }, 100);
            }
        }

        // Close Modal Handler
        function closeModal() {
            const modal = document.getElementById('detailModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';

            if (currentChart) {
                currentChart.destroy();
                currentChart = null;
            }
        }

        // Close modal on escape key press
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });

        // Interactive API Refresh Simulation Widget for Card 7 Modal
        function simulateApiRefresh() {
            const pm10 = Math.floor(Math.random() * 40) + 15;
            const pm25 = Math.floor(Math.random() * 20) + 5;

            const pm10El = document.getElementById('pm10Val');
            const pm25El = document.getElementById('pm25Val');

            if (pm10El && pm25El) {
                pm10El.textContent = `${pm10} ㎛/㎥`;
                pm25El.textContent = `${pm25} ㎛/㎥`;
            }
        }
    </script>
</body>
</html>
