class GameEngine {
    constructor() {
        this.currentScreen = 'welcome';
        this.specialization = null;
        this.rank = 'Абитуриент';
        this.completedTasks = [];
        this.score = 0;
    }

    // Смена экранов
    showScreen(screenName) {
        this.currentScreen = screenName;
        this.render();
    }

    // Выбор специализации
    chooseSpecialization(spec) {
        this.specialization = spec;
        this.showScreen('stage1');
    }

    // Завершение задания
    completeTask(taskId, points) {
        if (!this.completedTasks.includes(taskId)) {
            this.completedTasks.push(taskId);
            this.score += points;
            this.checkRankUp();
        }
    }

    // Проверка повышения звания
    checkRankUp() {
        const ranks = [
            'Абитуриент', 'Рядовой', 'Ефрейтор', 'Младший сержант',
            'Сержант', 'Старший сержант', 'Старшина', 'Лейтенант',
            'Старший лейтенант', 'Капитан', 'Майор', 'Подполковник',
            'Полковник', 'Генерал'
        ];
        
        const currentIndex = ranks.indexOf(this.rank);
        const targetIndex = Math.min(currentIndex + Math.floor(this.score / 100), ranks.length - 1);
        
        if (targetIndex > currentIndex) {
            this.rank = ranks[targetIndex];
            return true;
        }
        return false;
    }

    // Рендер интерфейса
    render() {
        // Будет реализовано в app.js
        window.renderGame(this);
    }
}