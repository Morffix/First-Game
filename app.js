console.log("🎮 App.js started!");

let tg = window.Telegram.WebApp;
let game = null;

// Инициализация Telegram
function initTelegram() {
    try {
        tg.expand();
        tg.ready();
        console.log("✅ Telegram initialized");
    } catch (e) {
        console.error("❌ Telegram init error:", e);
    }
}

// Простой движок для теста
class SimpleGame {
    constructor() {
        this.currentScreen = 'welcome';
        this.specialization = null;
        console.log("🎲 SimpleGame created");
    }

    chooseSpecialization(spec) {
        console.log("🎯 Choosing specialization:", spec);
        this.specialization = spec;
        this.currentScreen = 'stage1';
        this.render();
        return true;
    }

    render() {
        console.log("🔄 Rendering screen:", this.currentScreen);
        const app = document.getElementById('app');
        
        if (!app) {
            console.error("❌ App element not found!");
            return;
        }

        switch(this.currentScreen) {
            case 'welcome':
                app.innerHTML = this.renderWelcome();
                break;
            case 'specialization':
                app.innerHTML = this.renderSpecialization();
                break;
            case 'stage1':
                app.innerHTML = this.renderStage1();
                break;
        }
    }

    renderWelcome() {
        return `
            <div class="screen welcome-screen">
                <h1>🎯 ДЕБАГ РЕЖИМ</h1>
                <p>Если видишь этот текст - базовая загрузка работает!</p>
                <button onclick="game.showScreen('specialization')" class="btn-primary">
                    Тест перехода
                </button>
                <div style="margin-top: 20px; padding: 10px; background: #ff4444; color: white;">
                    <strong>Открой консоль разработчика (F12) и посмотри логи!</strong>
                </div>
            </div>
        `;
    }

    renderSpecialization() {
        return `
            <div class="screen specialization-screen">
                <h2>Выбери специализацию (Тест)</h2>
                <div class="specialization-cards">
                    <div class="spec-card" onclick="testClick('physicist')">
                        <h3>🧮 Физик-теоретик</h3>
                        <p>Кликни сюда и проверь консоль</p>
                    </div>
                    <div class="spec-card" onclick="testClick('engineer')">
                        <h3>🔧 Кибер-инженер</h3>
                        <p>Должен появиться лог в консоли</p>
                    </div>
                </div>
                <div id="debug-output" style="margin-top: 20px; padding: 10px; background: #333; color: #0f0;"></div>
            </div>
        `;
    }

    renderStage1() {
        return `
            <div class="screen stage-screen">
                <h2>🎉 УСПЕХ!</h2>
                <p>Ты выбрал: ${this.specialization}</p>
                <p>Навигация работает!</p>
                <button onclick="game.showScreen('welcome')" class="btn-primary">
                    Вернуться назад
                </button>
            </div>
        `;
    }

    showScreen(screen) {
        console.log("🔄 Changing screen to:", screen);
        this.currentScreen = screen;
        this.render();
    }
}

// Глобальная тестовая функция
window.testClick = function(spec) {
    console.log("🎯 testClick called with:", spec);
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = `Клик зарегистрирован: ${spec} | Время: ${new Date().toLocaleTimeString()}`;
    }
    
    if (window.game && window.game.chooseSpecialization) {
        window.game.chooseSpecialization(spec);
    } else {
        console.error("❌ Game not initialized!");
        debugOutput.innerHTML += '<br>❌ Game object not found!';
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM loaded!");
    
    initTelegram();
    
    // Создаём глобальную ссылку на игру
    window.game = new SimpleGame();
    console.log("🎲 Game instance created:", window.game);
    
    // Первый рендер
    window.game.render();
    
    // Проверяем элементы
    const app = document.getElementById('app');
    console.log("📱 App element:", app);
});