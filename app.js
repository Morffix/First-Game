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
            app.innerHTML = renderStageScreen(gameEngine);
            break;
        case 'task_result':
            app.innerHTML = renderTaskResult(gameEngine);
            break;
    }
}

// Экран задания
function renderStageScreen(gameEngine) {
    const task = gameEngine.getCurrentTask();
    const progress = gameEngine.getProgress();
    
    if (!task) {
        return renderStageComplete(gameEngine);
    }

    let taskHTML = '';
    
    // Разные типы заданий
    switch(task.type) {
        case 'multiple_choice':
            taskHTML = renderMultipleChoiceTask(task);
            break;
        case 'calculation':
        case 'conceptual':
        case 'analysis':
        case 'text':
            taskHTML = renderTextInputTask(task);
            break;
    }

    return `
        <div class="screen stage-screen">
            <div class="stage-header">
                <div class="rank-badge">${gameEngine.rank}</div>
                <div class="score">Очки: ${gameEngine.score}</div>
            </div>
            
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress.percent}%"></div>
                <span class="progress-text">${progress.completed}/${progress.total}</span>
            </div>

            <div class="task-card">
                <div class="task-meta">
                    <span class="difficulty ${task.difficulty}">${getDifficultyText(task.difficulty)}</span>
                    <span class="specialization">${getSpecializationText(gameEngine.specialization)}</span>
                </div>
                
                <h2 class="task-question">${task.question}</h2>
                
                ${taskHTML}
            </div>
        </div>
    `;
}

// Рендер вариантов ответа
function renderMultipleChoiceTask(task) {
    const options = task.options.map((option, index) => `
        <button class="option-btn" onclick="handleAnswer('${option}')">
            ${option}
        </button>
    `).join('');

    return `<div class="options-container">${options}</div>`;
}

// Рендер поля для ввода
function renderTextInputTask(task) {
    return `
        <div class="input-container">
            <input type="text" id="answer-input" placeholder="Введите ваш ответ..." class="answer-input">
            <button onclick="handleAnswerFromInput()" class="submit-btn">Ответить</button>
        </div>
    `;
}

// Экран результата задания
function renderTaskResult(gameEngine) {
    const lastResult = gameEngine.lastResult;
    const task = gameEngine.getCurrentTask();
    
    return `
        <div class="screen result-screen">
            <div class="result-card ${lastResult.correct ? 'correct' : 'incorrect'}">
                <h2>${lastResult.correct ? '✅ Правильно!' : '❌ Неправильно'}</h2>
                
                ${lastResult.solution ? `
                    <div class="solution">
                        <h3>Решение:</h3>
                        <p>${lastResult.solution}</p>
                    </div>
                ` : ''}
                
                ${lastResult.leveledUp ? `
                    <div class="level-up">
                        <h3>🎉 Повышение звания!</h3>
                        <p>${lastResult.oldRank} → ${lastResult.newRank}</p>
                    </div>
                ` : ''}
                
                <button class="next-btn" onclick="handleNextTask()">
                    ${gameEngine.nextTask() ? 'Следующее задание' : 'Завершить этап'}
                </button>
            </div>
        </div>
    `;
}

// Обработчики ответов
function handleAnswer(answer) {
    const game = window.game;
    const result = game.checkAnswer(answer);
    game.lastResult = result;
    game.currentScreen = 'task_result';
    game.render();
}

function handleAnswerFromInput() {
    const input = document.getElementById('answer-input');
    const answer = input.value;
    handleAnswer(answer);
}

function handleNextTask() {
    const game = window.game;
    if (game.nextTask()) {
        game.currentScreen = 'stage1';
    } else {
        game.currentScreen = 'stage_complete';
    }
    game.render();
}

// Вспомогательные функции
function getDifficultyText(difficulty) {
    const texts = {
        easy: 'Легкая',
        medium: 'Средняя', 
        hard: 'Сложная'
    };
    return texts[difficulty] || difficulty;
}

function getSpecializationText(spec) {
    const texts = {
        physicist: 'Физик-теоретик',
        engineer: 'Кибер-инженер',
        operator: 'Оператор связи',
        analyst: 'Аналитик данных'
    };
    return texts[spec] || spec;
}

// Запуск игры
document.addEventListener('DOMContentLoaded', function() {
    window.game = new GameEngine();
    window.game.render();
});