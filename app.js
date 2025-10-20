let tg = window.Telegram.WebApp;
let game = new GameEngine();

// Инициализация Telegram
tg.expand();
tg.ready();

// Основной рендер
window.renderGame = function(gameEngine) {
    const app = document.getElementById('app');
    
    switch(gameEngine.currentScreen) {
        case 'welcome':
            app.innerHTML = renderWelcomeScreen();
            break;
        case 'specialization':
            app.innerHTML = renderSpecializationScreen();
            break;
        case 'stage1':
            app.innerHTML = renderStage1Screen(gameEngine);
            break;
    }
}

// Экран приветствия
function renderWelcomeScreen() {
    return `
        <div class="screen welcome-screen">
            <div class="academy-logo">🛰️</div>
            <h1>КиберШтаб</h1>
            <p>Академия имени Можайского</p>
            <div class="welcome-text">
                <p>Абитуриент! Военно-космическая академия проводит набор в спецподразделение "КиберШтаб".</p>
                <p>Тебе предстоит пройти испытания и доказать свои знания в физике и кибернетике.</p>
            </div>
            <button class="btn-primary" onclick="game.showScreen('specialization')">
                Начать испытания
            </button>
        </div>
    `;
}

// Экран выбора специализации
function renderSpecializationScreen() {
    return `
        <div class="screen specialization-screen">
            <h2>Выбери специализацию</h2>
            
            <div class="specialization-cards">
                <div class="spec-card" onclick="game.chooseSpecialization('physicist')">
                    <h3>🧮 Физик-теоретик</h3>
                    <p>Расчеты, анализ, фундаментальные законы</p>
                </div>
                
                <div class="spec-card" onclick="game.chooseSpecialization('engineer')">
                    <h3>🔧 Кибер-инженер</h3>
                    <p>Системы, алгоритмы, практическая реализация</p>
                </div>
                
                <div class="spec-card" onclick="game.chooseSpecialization('operator')">
                    <h3>📡 Оператор связи</h3>
                    <p>Сигналы, протоколы, коммуникации</p>
                </div>
                
                <div class="spec-card" onclick="game.chooseSpecialization('analyst')">
                    <h3>📊 Аналитик данных</h3>
                    <p>Обработка, визуализация, прогнозирование</p>
                </div>
            </div>
        </div>
    `;
}

// Запуск игры
document.addEventListener('DOMContentLoaded', function() {
    game.render();
});