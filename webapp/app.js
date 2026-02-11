// ============================================
// DietLoop - Aplicación Principal
// ============================================

// Estado de la aplicación
const appState = {
    currentView: 'dashboard',
    currentMonth: 1,
    selectedDay: null,
    selectedWeek: 1,
    shoppingMonth: 1,
    shoppingWeek: 1,
    charts: {},
    currentProfile: null,
    menuComedor: null
};

// Perfiles: papa = dieta/ejercicio, bechita = menú comedor. third = reservado para futuro perfil.
const PROFILE_IDS = { PAPA: 'papa', BECHITA: 'bechita', THIRD: 'third' };
const MENU_JSON_PATH = 'data/menu_frutos_secos.json';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initProfileSelector();
    const saved = sessionStorage.getItem('dietloop_profile');
    if (saved === PROFILE_IDS.PAPA) {
        selectProfile(PROFILE_IDS.PAPA);
    } else if (saved === PROFILE_IDS.BECHITA) {
        selectProfile(PROFILE_IDS.BECHITA);
    }
});

// ============================================
// Selector de perfil
// ============================================

function initProfileSelector() {
    const selectorView = document.getElementById('profile-selector-view');
    const papaApp = document.getElementById('papa-app');
    const bechitaApp = document.getElementById('bechita-app');

    document.querySelectorAll('.profile-card:not([disabled])').forEach(card => {
        card.addEventListener('click', () => {
            const profile = card.dataset.profile;
            if (profile === PROFILE_IDS.THIRD) return;
            selectProfile(profile);
        });
    });

    document.getElementById('bechita-back-profile')?.addEventListener('click', () => showProfileSelector());
    document.getElementById('papa-back-profile')?.addEventListener('click', (e) => {
        e.preventDefault();
        showProfileSelector();
    });
}

function showProfileSelector() {
    sessionStorage.removeItem('dietloop_profile');
    appState.currentProfile = null;
    document.getElementById('profile-selector-view').classList.remove('hidden');
    document.getElementById('papa-app').setAttribute('hidden', '');
    document.getElementById('bechita-app').setAttribute('hidden', '');
}

function selectProfile(profileId) {
    appState.currentProfile = profileId;
    sessionStorage.setItem('dietloop_profile', profileId);
    document.getElementById('profile-selector-view').classList.add('hidden');

    if (profileId === PROFILE_IDS.PAPA) {
        document.getElementById('papa-app').removeAttribute('hidden');
        document.getElementById('bechita-app').setAttribute('hidden', '');
        initPapaApp();
    } else if (profileId === PROFILE_IDS.BECHITA) {
        document.getElementById('papa-app').setAttribute('hidden', '');
        document.getElementById('bechita-app').removeAttribute('hidden');
        initBechitaApp();
    }
    // Añadir aquí cuando definas el tercer perfil: else if (profileId === PROFILE_IDS.THIRD) { ... }
}

function initPapaApp() {
    initNavigation();
    initMobileMenu();
    initMonthSelectors();
    initWeekSelectors();
    initWeightForm();
    initShoppingSelectors();
    updateDashboard();
    renderCalendar();
    renderDietPlan();
    renderExercisePlan();
    renderProgress();
    renderHistory();
    renderShoppingList();
    setTodayDate();
}

// ============================================
// Bechita - Menú comedor
// ============================================

function initBechitaApp() {
    loadMenuComedor().then(() => {
        renderComedorInfo();
        renderComedorCalendar();
        initComedorMonthSelectors();
    }).catch(() => {
        document.getElementById('comedor-desc').textContent = 'No se pudo cargar el menú. Comprueba que exista webapp/data/menu_frutos_secos.json y que abras la app mediante un servidor (p. ej. desde la carpeta webapp: python -m http.server 8080).';
    });
}

function getMenuComedorMonthYear() {
    const key = 'comedor_month_year';
    const stored = sessionStorage.getItem(key);
    if (stored) {
        const [y, m] = stored.split('-').map(Number);
        return { year: y, month: m };
    }
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

function setMenuComedorMonthYear(year, month) {
    sessionStorage.setItem('comedor_month_year', `${year}-${month}`);
}

function loadMenuComedor() {
    return fetch(MENU_JSON_PATH)
        .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
        .then(data => {
            appState.menuComedor = data;
            return data;
        });
}

function renderComedorInfo() {
    const meta = appState.menuComedor?.metadata;
    const el = document.getElementById('comedor-desc');
    if (!meta) return;
    el.textContent = meta.descripcion || 'Menú escolar comedor';
}

function initComedorMonthSelectors() {
    let { year, month } = getMenuComedorMonthYear();
    const display = document.getElementById('comedor-month-display');

    function updateDisplay() {
        const names = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        if (display) display.textContent = `${names[month]} ${year}`;
        renderComedorCalendar();
    }

    document.getElementById('comedor-prev-month')?.addEventListener('click', () => {
        month--;
        if (month < 1) { month = 12; year--; }
        setMenuComedorMonthYear(year, month);
        updateDisplay();
    });
    document.getElementById('comedor-next-month')?.addEventListener('click', () => {
        month++;
        if (month > 12) { month = 1; year++; }
        setMenuComedorMonthYear(year, month);
        updateDisplay();
    });
    updateDisplay();
}

function renderComedorCalendar() {
    const grid = document.getElementById('comedor-calendar-grid');
    const detail = document.getElementById('comedor-day-detail');
    if (!grid || !appState.menuComedor?.calendario) return;

    const { year, month } = getMenuComedorMonthYear();
    const names = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    document.getElementById('comedor-month-display').textContent = `${names[month]} ${year}`;

    const calendario = appState.menuComedor.calendario;
    const monthStr = String(month).padStart(2, '0');
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lunesFirst = firstDay === 0 ? 6 : firstDay - 1;

    grid.innerHTML = '';
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    weekDays.forEach(d => {
        const h = document.createElement('div');
        h.style.cssText = 'text-align:center;font-weight:600;color:var(--text-secondary);padding:8px;';
        h.textContent = d;
        grid.appendChild(h);
    });

    const dayMap = {};
    calendario.forEach(entry => {
        const key = entry.fecha;
        dayMap[key] = entry;
    });

    let cellCount = lunesFirst;
    for (let i = 0; i < lunesFirst; i++) {
        const empty = document.createElement('div');
        empty.className = 'comedor-calendar-day';
        empty.style.visibility = 'hidden';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${monthStr}-${String(d).padStart(2, '0')}`;
        const entry = dayMap[dateStr];
        const cell = document.createElement('div');
        cell.className = 'comedor-calendar-day';
        if (entry) cell.classList.add('has-menu');
        cell.innerHTML = `<span class="comedor-day-num">${d}</span><span class="comedor-day-week">${entry ? entry.dia_semana : ''}</span>`;
        cell.dataset.fecha = dateStr;
        cell.addEventListener('click', () => {
            grid.querySelectorAll('.comedor-calendar-day').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            renderComedorDayDetail(dateStr, detail);
        });
        grid.appendChild(cell);
    }
}

function renderComedorDayDetail(fecha, container) {
    if (!container) container = document.getElementById('comedor-day-detail');
    const entry = appState.menuComedor?.calendario?.find(e => e.fecha === fecha);
    const placeholder = container.querySelector('.comedor-day-placeholder');
    if (!entry) {
        if (placeholder) placeholder.hidden = false;
        container.querySelectorAll('.comedor-menu-item').forEach(el => el.remove());
        const h3 = container.querySelector('h3');
        if (h3) h3.remove();
        return;
    }
    if (placeholder) placeholder.hidden = true;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const title = new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', options);
    let h3 = container.querySelector('h3');
    if (!h3) {
        h3 = document.createElement('h3');
        container.insertBefore(h3, container.firstChild);
    }
    h3.textContent = title.charAt(0).toUpperCase() + title.slice(1);
    const items = [
        { label: 'Primer plato', value: entry.primer_plato },
        { label: 'Segundo plato', value: entry.segundo_plato },
        { label: 'Guarnición', value: entry.guarnicion },
        { label: 'Postre', value: entry.postre }
    ];
    container.querySelectorAll('.comedor-menu-item').forEach(el => el.remove());
    items.forEach(({ label, value }) => {
        if (!value) return;
        const div = document.createElement('div');
        div.className = 'comedor-menu-item';
        div.innerHTML = `<div class="comedor-menu-label">${label}</div><div class="comedor-menu-value">${value}</div>`;
        container.appendChild(div);
    });
}

// ============================================
// Navegación
// ============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
            
            // Mostrar vista correspondiente
            showView(view);
        });
    });
}

// ============================================
// Menú Móvil
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeMobileMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Actualizar peso en header móvil
    updateMobileWeight();
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (sidebar && overlay && menuToggle) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

function updateMobileWeight() {
    const mobileWeight = document.getElementById('mobile-current-weight');
    if (mobileWeight) {
        const currentWeight = getLatestWeight();
        mobileWeight.textContent = `${currentWeight} kg`;
    }
}

function showView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        appState.currentView = viewName;
        
        // Actualizar gráficas si es necesario
        if (viewName === 'progress') {
            setTimeout(() => renderProgressCharts(), 100);
        }
        if (viewName === 'dashboard') {
            setTimeout(() => updateDashboard(), 100);
        }
    }
}

// ============================================
// Selectores de Mes
// ============================================

function initMonthSelectors() {
    const selectors = [
        { prev: 'prev-month', next: 'next-month', display: 'current-month-display' },
        { prev: 'cal-prev-month', next: 'cal-next-month', display: 'cal-month-display' },
        { prev: 'diet-prev-month', next: 'diet-next-month', display: 'diet-month-display' },
        { prev: 'ex-prev-month', next: 'ex-next-month', display: 'ex-month-display' }
    ];
    
    selectors.forEach(sel => {
        const prevBtn = document.getElementById(sel.prev);
        const nextBtn = document.getElementById(sel.next);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => changeMonth(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => changeMonth(1));
        }
    });
}

function changeMonth(delta) {
    const newMonth = appState.currentMonth + delta;
    if (newMonth >= 1 && newMonth <= 6) {
        appState.currentMonth = newMonth;
        updateAllMonthDisplays();
        updateDashboard();
        renderCalendar();
        renderDietPlan();
        renderExercisePlan();
    }
}

function updateAllMonthDisplays() {
    const displays = ['current-month-display', 'cal-month-display', 'diet-month-display', 'ex-month-display'];
    displays.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = `Mes ${appState.currentMonth}`;
        }
    });
}

// ============================================
// Selectores de Semana
// ============================================

function initWeekSelectors() {
    document.querySelectorAll('.week-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const week = parseInt(e.target.dataset.week);
            const container = e.target.closest('.view');
            
            // Actualizar botones activos en este contenedor
            container.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            appState.selectedWeek = week;
            
            // Actualizar contenido según la vista
            if (container.id === 'diet-view') {
                renderDietPlan();
            } else if (container.id === 'exercise-view') {
                renderExercisePlan();
            }
        });
    });
}

// ============================================
// Dashboard
// ============================================

function updateDashboard() {
    const month = appState.currentMonth;
    const goals = monthlyGoals[month];
    
    // Actualizar estadísticas del sidebar
    const currentWeight = getLatestWeight();
    document.getElementById('current-weight').textContent = `${currentWeight} kg`;
    document.getElementById('to-lose').textContent = `${(currentWeight - userData.targetWeight).toFixed(1)} kg`;
    
    // Actualizar peso en header móvil
    updateMobileWeight();
    
    // Actualizar detalles del mes
    document.getElementById('month-start-weight').textContent = `${goals.startWeight} kg`;
    document.getElementById('month-target-weight').textContent = `${goals.minTarget}-${goals.maxTarget} kg`;
    
    // Obtener peso actual del mes
    const monthWeights = weightLog.filter(w => w.month === month);
    const latestMonthWeight = monthWeights.length > 0 ? monthWeights[monthWeights.length - 1].weight : goals.startWeight;
    document.getElementById('month-current-weight').textContent = `${latestMonthWeight} kg`;
    
    // Calcular progreso del mes
    const targetLoss = goals.startWeight - goals.targetWeight;
    const actualLoss = goals.startWeight - latestMonthWeight;
    const progressPercent = Math.min(100, Math.max(0, (actualLoss / targetLoss) * 100));
    document.getElementById('month-progress').textContent = `${progressPercent.toFixed(0)}%`;
    
    // Actualizar estadísticas rápidas
    const daysCompleted = calculateDaysCompleted();
    document.getElementById('days-completed').textContent = daysCompleted;
    document.getElementById('workouts-done').textContent = calculateWorkoutsDone();
    document.getElementById('total-lost').textContent = `${(userData.initialWeight - currentWeight).toFixed(1)} kg`;
    
    // Renderizar gráfica semanal
    renderWeeklyChart();
    
    // Renderizar plan de hoy
    renderTodayPlan();
    
    // Renderizar anillo de progreso
    renderProgressRing(progressPercent);
}

function calculateDaysCompleted() {
    const startDate = new Date(userData.startDate);
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

function calculateWorkoutsDone() {
    const daysCompleted = calculateDaysCompleted();
    // 4 entrenamientos por semana
    return Math.floor(daysCompleted / 7) * 4 + Math.min(daysCompleted % 7, 4);
}

function setTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('es-ES', options);
    document.getElementById('today-date').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

function renderTodayPlan() {
    const today = new Date();
    const dayNum = getDayOfWeek(today);
    const dayName = getDayName(dayNum);
    
    const month = appState.currentMonth;
    const week = getWeekOfMonth(today.toISOString().split('T')[0], userData.startDate);
    const effectiveWeek = Math.min(Math.max(1, week), 4);
    
    // Renderizar comidas de hoy
    const mealsContainer = document.getElementById('today-meals');
    const monthDiet = monthData[month]?.diet[effectiveWeek]?.[dayName];
    
    if (monthDiet) {
        mealsContainer.innerHTML = `
            <div class="meal-item">
                <div class="meal-type">Desayuno</div>
                <div class="meal-content">${monthDiet.desayuno.food}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Comida</div>
                <div class="meal-content">${monthDiet.comida.food}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Cena</div>
                <div class="meal-content">${monthDiet.cena.food}</div>
            </div>
        `;
    } else {
        mealsContainer.innerHTML = '<p class="no-exercise">No hay plan disponible para hoy</p>';
    }
    
    // Renderizar ejercicio de hoy
    const exerciseContainer = document.getElementById('today-exercise');
    const monthExercise = monthData[month]?.exercise[effectiveWeek];
    
    let todayExercise = null;
    if (dayNum === 1) todayExercise = monthExercise?.monday;
    else if (dayNum === 3) todayExercise = monthExercise?.wednesday;
    else if (dayNum === 5) todayExercise = monthExercise?.friday;
    else if (dayNum === 7) todayExercise = monthExercise?.sunday;
    
    if (todayExercise) {
        exerciseContainer.innerHTML = `
            <div class="exercise-item">
                <span class="exercise-icon">💪</span>
                <div class="exercise-info">
                    <div class="exercise-type">${todayExercise.title}</div>
                    <div class="exercise-duration">${todayExercise.duration}</div>
                </div>
            </div>
        `;
    } else {
        exerciseContainer.innerHTML = '<p class="no-exercise">Día de descanso</p>';
    }
}

function renderProgressRing(percent) {
    const canvas = document.getElementById('progress-ring');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 70;
    const lineWidth = 12;
    
    // Limpiar
    ctx.clearRect(0, 0, size, size);
    
    // Fondo del anillo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    
    // Progreso
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * percent / 100);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function renderWeeklyChart() {
    const ctx = document.getElementById('weekly-chart');
    if (!ctx) return;
    
    // Destruir gráfica anterior si existe
    if (appState.charts.weekly) {
        appState.charts.weekly.destroy();
    }
    
    const month = appState.currentMonth;
    const goals = monthlyGoals[month];
    
    // Datos de ejemplo (se actualizarían con datos reales)
    const labels = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const targetWeights = [];
    const actualWeights = [];
    
    // Calcular pesos objetivo por semana
    const weeklyLoss = (goals.startWeight - goals.targetWeight) / 4;
    for (let i = 0; i < 4; i++) {
        targetWeights.push((goals.startWeight - weeklyLoss * (i + 1)).toFixed(1));
    }
    
    // Obtener pesos reales registrados
    for (let week = 1; week <= 4; week++) {
        const weekWeight = weightLog.find(w => w.month === month && w.week === week);
        actualWeights.push(weekWeight ? weekWeight.weight : null);
    }
    
    appState.charts.weekly = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Objetivo',
                    data: targetWeights,
                    borderColor: '#818CF8',
                    backgroundColor: 'rgba(129, 140, 248, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    fill: false
                },
                {
                    label: 'Real',
                    data: actualWeights,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94A3B8'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#94A3B8' },
                    grid: { color: '#334155' }
                },
                y: {
                    ticks: { color: '#94A3B8' },
                    grid: { color: '#334155' },
                    suggestedMin: goals.targetWeight - 1,
                    suggestedMax: goals.startWeight + 1
                }
            }
        }
    });
}

// ============================================
// Calendario
// ============================================

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const month = appState.currentMonth;
    const startDate = new Date(userData.startDate);
    
    // Calcular la fecha de inicio del mes seleccionado
    const monthStart = new Date(startDate);
    monthStart.setDate(monthStart.getDate() + (month - 1) * 28);
    
    // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
    let firstDayOfWeek = monthStart.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Convertir domingo a 7
    
    // Añadir días vacíos antes del primer día
    for (let i = 1; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }
    
    // Añadir los 28 días del mes
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= 28; day++) {
        const currentDate = new Date(monthStart);
        currentDate.setDate(monthStart.getDate() + day - 1);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Marcar día actual
        if (currentDate.getTime() === today.getTime()) {
            dayElement.classList.add('today');
        }
        
        const dayNum = document.createElement('span');
        dayNum.className = 'day-number';
        dayNum.textContent = day;
        dayElement.appendChild(dayNum);
        
        // Indicadores
        const indicators = document.createElement('div');
        indicators.className = 'day-indicators';
        
        // Indicador de comida (siempre)
        const mealIndicator = document.createElement('span');
        mealIndicator.className = 'day-indicator meal';
        indicators.appendChild(mealIndicator);
        
        // Indicador de ejercicio (L, M, V, D)
        const dayOfWeek = getDayOfWeek(currentDate);
        if ([1, 3, 5, 7].includes(dayOfWeek)) {
            const exerciseIndicator = document.createElement('span');
            exerciseIndicator.className = 'day-indicator exercise';
            indicators.appendChild(exerciseIndicator);
        }
        
        dayElement.appendChild(indicators);
        
        // Click para ver detalles
        dayElement.addEventListener('click', () => selectDay(day, month, currentDate));
        
        grid.appendChild(dayElement);
    }
}

function selectDay(day, month, date) {
    // Quitar selección anterior
    document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
    
    // Marcar día seleccionado
    event.currentTarget.classList.add('selected');
    
    appState.selectedDay = { day, month, date };
    renderDayDetail();
}

function renderDayDetail() {
    const container = document.getElementById('day-detail');
    if (!container || !appState.selectedDay) return;
    
    const { day, month, date } = appState.selectedDay;
    const dayOfWeek = getDayOfWeek(date);
    const dayName = getDayName(dayOfWeek);
    const dayNameSpanish = getDayNameSpanish(dayOfWeek);
    const week = Math.ceil(day / 7);
    
    const diet = monthData[month]?.diet[week]?.[dayName];
    const exercise = monthData[month]?.exercise[week];
    
    let exerciseData = null;
    if (dayOfWeek === 1) exerciseData = exercise?.monday;
    else if (dayOfWeek === 3) exerciseData = exercise?.wednesday;
    else if (dayOfWeek === 5) exerciseData = exercise?.friday;
    else if (dayOfWeek === 7) exerciseData = exercise?.sunday;
    
    let html = `<h3>${dayNameSpanish} - Día ${day} del Mes ${month}</h3>`;
    
    // Comidas
    html += '<div class="day-meals"><h4>🥗 Plan de Alimentación</h4>';
    if (diet) {
        html += `
            <div class="meal-item">
                <div class="meal-type">Desayuno</div>
                <div class="meal-content">${diet.desayuno.food}</div>
                <div class="meal-quantity">${diet.desayuno.quantity}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Almuerzo</div>
                <div class="meal-content">${diet.almuerzo.food}</div>
                <div class="meal-quantity">${diet.almuerzo.quantity}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Comida</div>
                <div class="meal-content">${diet.comida.food}</div>
                <div class="meal-quantity">${diet.comida.quantity}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Merienda</div>
                <div class="meal-content">${diet.merienda.food}</div>
                <div class="meal-quantity">${diet.merienda.quantity}</div>
            </div>
            <div class="meal-item">
                <div class="meal-type">Cena</div>
                <div class="meal-content">${diet.cena.food}</div>
                <div class="meal-quantity">${diet.cena.quantity}</div>
            </div>
        `;
    } else {
        html += '<p>No hay datos disponibles</p>';
    }
    html += '</div>';
    
    // Ejercicio
    html += '<div class="day-exercises"><h4>💪 Entrenamiento</h4>';
    if (exerciseData) {
        html += `<h5>${exerciseData.title} - ${exerciseData.duration}</h5>`;
        exerciseData.blocks.forEach(block => {
            html += `
                <div class="exercise-block">
                    <div class="exercise-block-header">
                        <span class="exercise-block-title">${block.name}</span>
                        <span class="exercise-block-duration">${block.duration}</span>
                    </div>
                    <ul class="exercise-list">
                        ${block.exercises.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
    } else {
        html += '<p class="no-exercise">Día de descanso activo. Puedes caminar o estirar suavemente.</p>';
    }
    html += '</div>';
    
    container.innerHTML = html;
}

// ============================================
// Plan de Dieta
// ============================================

function renderDietPlan() {
    const container = document.getElementById('diet-week-content');
    if (!container) return;
    
    const month = appState.currentMonth;
    const week = appState.selectedWeek;
    const diet = monthData[month]?.diet[week];
    
    if (!diet) {
        container.innerHTML = '<p>No hay datos disponibles para este mes</p>';
        return;
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const daysSpanish = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
    let html = '';
    
    days.forEach((day, index) => {
        const dayData = diet[day];
        if (!dayData) return;
        
        html += `
            <div class="day-plan">
                <div class="day-plan-header">${daysSpanish[index]}</div>
                <div class="day-plan-content">
                    <div class="meal-row">
                        <span class="meal-name">Desayuno</span>
                        <span class="meal-description">${dayData.desayuno.food}</span>
                        <span class="meal-quantity">${dayData.desayuno.quantity}</span>
                    </div>
                    <div class="meal-row">
                        <span class="meal-name">Almuerzo</span>
                        <span class="meal-description">${dayData.almuerzo.food}</span>
                        <span class="meal-quantity">${dayData.almuerzo.quantity}</span>
                    </div>
                    <div class="meal-row">
                        <span class="meal-name">Comida</span>
                        <span class="meal-description">${dayData.comida.food}</span>
                        <span class="meal-quantity">${dayData.comida.quantity}</span>
                    </div>
                    <div class="meal-row">
                        <span class="meal-name">Merienda</span>
                        <span class="meal-description">${dayData.merienda.food}</span>
                        <span class="meal-quantity">${dayData.merienda.quantity}</span>
                    </div>
                    <div class="meal-row">
                        <span class="meal-name">Cena</span>
                        <span class="meal-description">${dayData.cena.food}</span>
                        <span class="meal-quantity">${dayData.cena.quantity}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ============================================
// Plan de Ejercicio
// ============================================

function renderExercisePlan() {
    const container = document.getElementById('exercise-week-content');
    if (!container) return;
    
    const month = appState.currentMonth;
    const week = appState.selectedWeek;
    const exercise = monthData[month]?.exercise[week];
    
    if (!exercise) {
        container.innerHTML = '<p>No hay datos disponibles para este mes</p>';
        return;
    }
    
    const days = [
        { key: 'monday', name: 'Lunes', icon: '🚶' },
        { key: 'wednesday', name: 'Miércoles', icon: '💪' },
        { key: 'friday', name: 'Viernes', icon: '🚴' },
        { key: 'sunday', name: 'Domingo', icon: '🏃' }
    ];
    
    let html = '';
    
    days.forEach(day => {
        const dayData = exercise[day.key];
        if (!dayData) return;
        
        html += `
            <div class="day-plan">
                <div class="day-plan-header">${day.icon} ${day.name} - ${dayData.title}</div>
                <div class="day-plan-content">
        `;
        
        dayData.blocks.forEach(block => {
            html += `
                <div class="exercise-block">
                    <div class="exercise-block-header">
                        <span class="exercise-block-title">${block.name}</span>
                        <span class="exercise-block-duration">${block.duration}</span>
                    </div>
                    <ul class="exercise-list">
                        ${block.exercises.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        html += '</div></div>';
    });
    
    // Añadir días de descanso
    html += `
        <div class="day-plan" style="opacity: 0.7;">
            <div class="day-plan-header" style="background: #374151;">😴 Martes, Jueves, Sábado - Descanso Activo</div>
            <div class="day-plan-content">
                <div class="exercise-block">
                    <ul class="exercise-list">
                        <li>Caminata suave opcional (15-20 min)</li>
                        <li>Estiramientos suaves</li>
                        <li>Hidratación adecuada</li>
                        <li>Descanso reparador</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// Progreso y Gráficas
// ============================================

function renderProgress() {
    renderWeightTable();
    initWeightDateInput();
}

function renderWeightTable() {
    const tbody = document.getElementById('weight-table-body');
    if (!tbody) return;
    
    let html = '';
    
    // Generar filas para cada semana de cada mes
    for (let month = 1; month <= appState.currentMonth; month++) {
        const goals = monthlyGoals[month];
        const weeklyTarget = (goals.startWeight - goals.targetWeight) / 4;
        
        for (let week = 1; week <= 4; week++) {
            const targetWeight = (goals.startWeight - weeklyTarget * week).toFixed(1);
            const weightEntry = weightLog.find(w => w.month === month && w.week === week);
            const realWeight = weightEntry ? weightEntry.weight : '--';
            
            let diffClass = 'diff-neutral';
            let diffValue = '--';
            
            if (weightEntry) {
                const diff = weightEntry.weight - parseFloat(targetWeight);
                diffValue = diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
                diffClass = diff > 0 ? 'diff-positive' : diff < 0 ? 'diff-negative' : 'diff-neutral';
            }
            
            html += `
                <tr>
                    <td>Mes ${month}</td>
                    <td>Semana ${week}</td>
                    <td>${weightEntry?.date || '--'}</td>
                    <td>${targetWeight} kg</td>
                    <td>${realWeight} kg</td>
                    <td class="${diffClass}">${diffValue} kg</td>
                </tr>
            `;
        }
    }
    
    tbody.innerHTML = html;
}

function renderProgressCharts() {
    renderGlobalProgressChart();
    renderMonthlySummaryChart();
    renderGoalsChart();
}

function renderGlobalProgressChart() {
    const ctx = document.getElementById('global-progress-chart');
    if (!ctx) return;
    
    if (appState.charts.globalProgress) {
        appState.charts.globalProgress.destroy();
    }
    
    // Crear etiquetas para todos los meses
    const labels = [];
    const targetData = [];
    const realData = [];
    
    for (let month = 1; month <= 6; month++) {
        const goals = monthlyGoals[month];
        labels.push(`Mes ${month}`);
        targetData.push(goals.targetWeight);
        
        // Buscar el último peso registrado del mes
        const monthWeights = weightLog.filter(w => w.month === month);
        if (monthWeights.length > 0) {
            realData.push(monthWeights[monthWeights.length - 1].weight);
        } else if (month === 1 && weightLog.length === 0) {
            realData.push(userData.initialWeight);
        } else {
            realData.push(null);
        }
    }
    
    // Añadir punto inicial
    labels.unshift('Inicio');
    targetData.unshift(userData.initialWeight);
    realData.unshift(userData.initialWeight);
    
    appState.charts.globalProgress = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Objetivo',
                    data: targetData,
                    borderColor: '#818CF8',
                    backgroundColor: 'rgba(129, 140, 248, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Real',
                    data: realData,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94A3B8' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} kg`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#94A3B8' },
                    grid: { color: '#334155' }
                },
                y: {
                    ticks: { 
                        color: '#94A3B8',
                        callback: function(value) {
                            return value + ' kg';
                        }
                    },
                    grid: { color: '#334155' },
                    suggestedMin: 70,
                    suggestedMax: 86
                }
            }
        }
    });
}

function renderMonthlySummaryChart() {
    const ctx = document.getElementById('monthly-summary-chart');
    if (!ctx) return;
    
    if (appState.charts.monthlySummary) {
        appState.charts.monthlySummary.destroy();
    }
    
    const labels = [];
    const lostData = [];
    const goalData = [];
    
    for (let month = 1; month <= appState.currentMonth; month++) {
        labels.push(`Mes ${month}`);
        
        const goals = monthlyGoals[month];
        goalData.push(goals.startWeight - goals.targetWeight);
        
        // Calcular pérdida real del mes
        const monthWeights = weightLog.filter(w => w.month === month);
        if (monthWeights.length > 0) {
            const lastWeight = monthWeights[monthWeights.length - 1].weight;
            lostData.push(goals.startWeight - lastWeight);
        } else {
            lostData.push(0);
        }
    }
    
    appState.charts.monthlySummary = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Objetivo (kg)',
                    data: goalData,
                    backgroundColor: 'rgba(129, 140, 248, 0.7)',
                    borderColor: '#818CF8',
                    borderWidth: 1
                },
                {
                    label: 'Perdido (kg)',
                    data: lostData,
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: '#10B981',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94A3B8' }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#94A3B8' },
                    grid: { color: '#334155' }
                },
                y: {
                    ticks: { 
                        color: '#94A3B8',
                        callback: function(value) {
                            return value + ' kg';
                        }
                    },
                    grid: { color: '#334155' },
                    beginAtZero: true
                }
            }
        }
    });
}

function renderGoalsChart() {
    const ctx = document.getElementById('goals-chart');
    if (!ctx) return;
    
    if (appState.charts.goals) {
        appState.charts.goals.destroy();
    }
    
    // Calcular cumplimiento de objetivos
    let achieved = 0;
    let partial = 0;
    let notAchieved = 0;
    
    for (let month = 1; month <= appState.currentMonth; month++) {
        const goals = monthlyGoals[month];
        const monthWeights = weightLog.filter(w => w.month === month);
        
        if (monthWeights.length > 0) {
            const lastWeight = monthWeights[monthWeights.length - 1].weight;
            
            if (lastWeight <= goals.maxTarget) {
                achieved++;
            } else if (lastWeight <= goals.startWeight) {
                partial++;
            } else {
                notAchieved++;
            }
        }
    }
    
    appState.charts.goals = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Conseguido', 'Parcial', 'No conseguido'],
            datasets: [{
                data: [achieved, partial, notAchieved],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    '#10B981',
                    '#F59E0B',
                    '#EF4444'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94A3B8' }
                }
            }
        }
    });
}

// ============================================
// Formulario de Peso
// ============================================

function initWeightDateInput() {
    const dateInput = document.getElementById('weight-date');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
}

function initWeightForm() {
    const saveBtn = document.getElementById('save-weight');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveWeight);
    }
}

function saveWeight() {
    const dateInput = document.getElementById('weight-date');
    const weightInput = document.getElementById('weight-value');
    
    const date = dateInput.value;
    const weight = parseFloat(weightInput.value);
    
    if (!date || isNaN(weight)) {
        alert('Por favor, introduce una fecha y un peso válidos');
        return;
    }
    
    // Calcular mes y semana
    const startDate = new Date(userData.startDate);
    const selectedDate = new Date(date);
    const diffTime = selectedDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const month = Math.floor(diffDays / 28) + 1;
    const week = Math.floor((diffDays % 28) / 7) + 1;
    
    // Verificar si ya existe una entrada para esta fecha
    const existingIndex = weightLog.findIndex(w => w.date === date);
    if (existingIndex !== -1) {
        weightLog[existingIndex].weight = weight;
    } else {
        addWeight(date, weight, month, week);
    }
    
    // Actualizar vistas
    renderWeightTable();
    updateDashboard();
    renderProgressCharts();
    
    // Limpiar formulario
    weightInput.value = '';
    
    alert(`Peso guardado: ${weight} kg para el ${date}`);
}

// ============================================
// Histórico
// ============================================

function renderHistory() {
    const timeline = document.getElementById('history-timeline');
    if (!timeline) return;
    
    let html = '';
    
    for (let month = 1; month <= 6; month++) {
        const goals = monthlyGoals[month];
        const monthWeights = weightLog.filter(w => w.month === month);
        const isCompleted = monthWeights.length >= 4;
        const isCurrent = month === appState.currentMonth;
        
        let startWeight = goals.startWeight;
        let endWeight = monthWeights.length > 0 ? monthWeights[monthWeights.length - 1].weight : '--';
        let lost = monthWeights.length > 0 ? (goals.startWeight - monthWeights[monthWeights.length - 1].weight).toFixed(1) : '--';
        
        html += `
            <div class="history-month ${isCurrent ? 'current' : ''}" data-month="${month}">
                <h4>Mes ${month}</h4>
                <div class="month-stats">
                    <div class="month-stat">
                        <span class="label">Inicio</span>
                        <span class="value">${startWeight} kg</span>
                    </div>
                    <div class="month-stat">
                        <span class="label">Final</span>
                        <span class="value">${endWeight} kg</span>
                    </div>
                    <div class="month-stat">
                        <span class="label">Perdido</span>
                        <span class="value ${parseFloat(lost) >= 2 ? 'success' : 'warning'}">${lost} kg</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    timeline.innerHTML = html;
    
    // Añadir eventos de click
    timeline.querySelectorAll('.history-month').forEach(el => {
        el.addEventListener('click', () => {
            const month = parseInt(el.dataset.month);
            showHistoryDetail(month);
            
            // Actualizar selección visual
            timeline.querySelectorAll('.history-month').forEach(m => m.classList.remove('active'));
            el.classList.add('active');
        });
    });
}

function showHistoryDetail(month) {
    const container = document.getElementById('history-detail');
    if (!container) return;
    
    const goals = monthlyGoals[month];
    const data = monthData[month];
    const monthWeights = weightLog.filter(w => w.month === month);
    
    let html = `
        <h3>Detalle del Mes ${month}</h3>
        
        <div class="history-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
            <div class="param">
                <span class="param-label">Peso Inicial</span>
                <span class="param-value">${goals.startWeight} kg</span>
            </div>
            <div class="param">
                <span class="param-label">Objetivo</span>
                <span class="param-value">${goals.minTarget}-${goals.maxTarget} kg</span>
            </div>
            <div class="param">
                <span class="param-label">Calorías</span>
                <span class="param-value">${data?.calories || '1.800-1.900 kcal'}</span>
            </div>
            <div class="param">
                <span class="param-label">Ejercicio</span>
                <span class="param-value">${data?.exerciseHours || 3} horas/semana</span>
            </div>
        </div>
        
        <h4>Registro de Peso</h4>
        <table style="width: 100%; margin-top: 12px;">
            <thead>
                <tr>
                    <th>Semana</th>
                    <th>Fecha</th>
                    <th>Peso</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (let week = 1; week <= 4; week++) {
        const entry = monthWeights.find(w => w.week === week);
        html += `
            <tr>
                <td>Semana ${week}</td>
                <td>${entry?.date || '--'}</td>
                <td>${entry?.weight || '--'} kg</td>
            </tr>
        `;
    }
    
    html += '</tbody></table>';
    
    container.innerHTML = html;
}

// ============================================
// Lista de la Compra
// ============================================

function initShoppingSelectors() {
    const prevBtn = document.getElementById('shop-prev-week');
    const nextBtn = document.getElementById('shop-next-week');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changeShoppingWeek(-1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changeShoppingWeek(1));
    }
}

function changeShoppingWeek(delta) {
    let newWeek = appState.shoppingWeek + delta;
    let newMonth = appState.shoppingMonth;
    
    if (newWeek > 4) {
        newWeek = 1;
        newMonth++;
    } else if (newWeek < 1) {
        newWeek = 4;
        newMonth--;
    }
    
    // Limitar a meses disponibles
    if (newMonth < 1) {
        newMonth = 1;
        newWeek = 1;
    } else if (newMonth > 6) {
        newMonth = 6;
        newWeek = 4;
    }
    
    appState.shoppingMonth = newMonth;
    appState.shoppingWeek = newWeek;
    
    renderShoppingList();
}

function renderShoppingList() {
    const month = appState.shoppingMonth;
    const week = appState.shoppingWeek;
    
    // Actualizar display del selector
    const display = document.getElementById('shop-week-display');
    if (display) {
        display.textContent = `Mes ${month} - Semana ${week}`;
    }
    
    // Actualizar info del período
    const periodEl = document.getElementById('shopping-period');
    if (periodEl) {
        periodEl.textContent = `Mes ${month}, Semana ${week}`;
    }
    
    // Renderizar alimentos prohibidos
    renderForbiddenFoods();
    
    // Obtener lista de compra
    const shoppingData = shoppingLists[month]?.[week];
    
    if (!shoppingData) {
        const container = document.getElementById('shopping-categories');
        if (container) {
            container.innerHTML = '<div class="card"><p>Lista de compra no disponible para este período. Se generará cuando se cree el plan del mes correspondiente.</p></div>';
        }
        return;
    }
    
    // Actualizar precio estimado
    const priceEl = document.getElementById('shopping-price');
    if (priceEl) {
        priceEl.textContent = shoppingData.priceEstimate;
    }
    
    // Renderizar categorías
    renderShoppingCategories(shoppingData.categories);
    
    // Renderizar consejos
    renderShoppingTips(shoppingData.tips);
}

function renderForbiddenFoods() {
    const container = document.getElementById('forbidden-list');
    if (!container) return;
    
    let html = '';
    forbiddenFoods.forEach(food => {
        html += `<span class="forbidden-item">${food}</span>`;
    });
    
    container.innerHTML = html;
}

function renderShoppingCategories(categories) {
    const container = document.getElementById('shopping-categories');
    if (!container) return;
    
    let html = '';
    
    categories.forEach(category => {
        html += `
            <div class="shopping-category">
                <div class="category-header">
                    <span class="category-icon">${category.icon}</span>
                    ${category.name}
                </div>
                <div class="category-items">
        `;
        
        category.items.forEach(item => {
            html += `
                <div class="shopping-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">${item.quantity}</span>
                    <span class="item-notes">${item.notes}</span>
                </div>
            `;
        });
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
}

function renderShoppingTips(tips) {
    const container = document.getElementById('shopping-tips');
    if (!container || !tips) return;
    
    let html = '';
    tips.forEach(tip => {
        html += `<li>${tip}</li>`;
    });
    
    container.innerHTML = html;
}
