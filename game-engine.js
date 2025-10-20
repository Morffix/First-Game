class GameEngine {
    constructor() {
        this.currentScreen = 'welcome';
        this.specialization = null;
        this.rank = 'Абитуриент';
        this.completedTasks = [];
        this.score = 0;
        
        // Управление этапами и заданиями
        this.currentStage = 'stage1';
        this.currentTaskIndex = 0;
        this.stages = Tasks;
    }

    // Получить задачи для текущей специализации
    getCurrentTasks() {
        return this.stages[this.currentStage][this.specialization] || [];
    }

    // Получить текущее задание
    getCurrentTask() {
        const tasks = this.getCurrentTasks();
        return tasks[this.currentTaskIndex];
    }

    // Проверить ответ
    checkAnswer(userAnswer) {
        const task = this.getCurrentTask();
        let isCorrect = false;

        if (task.type === 'multiple_choice') {
            isCorrect = userAnswer === task.answer;
        } else {
            // Для текстовых ответов - приводим к нижнему регистру и убираем пробелы
            isCorrect = userAnswer.toString().toLowerCase().trim() === task.answer.toString().toLowerCase().trim();
        }

        if (isCorrect && !this.completedTasks.includes(task.id)) {
            this.completedTasks.push(task.id);
            this.score += task.points;
            this.checkRankUp();
            return { correct: true, solution: task.solution };
        }
        
        return { correct: false, solution: task.solution };
    }

    // Перейти к следующему заданию
    nextTask() {
        const tasks = this.getCurrentTasks();
        if (this.currentTaskIndex < tasks.length - 1) {
            this.currentTaskIndex++;
            return true;
        }
        return false; // Задания закончились
    }

    // Проверить повышение звания
    checkRankUp() {
        const ranks = [
            'Абитуриент', 'Рядовой', 'Ефрейтор', 'Младший сержант',
            'Сержант', 'Старший сержант', 'Старшина', 'Лейтенант', 
            'Старший лейтенант', 'Капитан', 'Майор', 'Подполковник',
            'Полковник', 'Генерал'
        ];
        
        const rankThresholds = [0, 50, 100, 150, 200, 250, 300, 400, 500, 600, 750, 900, 1100, 1300];
        const newRankIndex = rankThresholds.findIndex(threshold => this.score < threshold) - 1;
        
        if (newRankIndex >= 0 && ranks[newRankIndex] !== this.rank) {
            const oldRank = this.rank;
            this.rank = ranks[newRankIndex];
            return { leveledUp: true, oldRank, newRank: this.rank };
        }
        return { leveledUp: false };
    }

    // Получить прогресс
    getProgress() {
        const tasks = this.getCurrentTasks();
        const completed = this.completedTasks.filter(id => 
            tasks.some(task => task.id === id)
        ).length;
        return {
            completed,
            total: tasks.length,
            percent: Math.round((completed / tasks.length) * 100)
        };
    }
}