import { quizPool } from "./questions.js";
import { saveScoreToLeaderboard, loadLeaderboard } from "./leaderboard.js";
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const leaderboardScreen = document.getElementById("leaderboardScreen");
startScreen.style.display = "block";
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const viewLeaderboardBtn = document.getElementById("viewLeaderboardBtn");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const restartBtn = document.getElementById("restartBtn");
const backToStartBtn = document.getElementById("backToStartBtn");
const categorySelect = document.getElementById("categorySelect");
const difficultySelect = document.getElementById("difficultySelect");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const progressText = document.getElementById("progressText");
const timerBox = document.getElementById("timerBox");
const scoreText = document.getElementById("scoreText");
const playerNameInput = document.getElementById("playerNameInput");
const leaderboardList = document.getElementById("leaderboardList");
let questionSet = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let selectedOption = null;
let quizTimer;
startBtn.onclick = () => {
    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;
    const availableQuestions = [...quizPool[selectedCategory][selectedDifficulty]];
    const questionCount = Math.min(availableQuestions.length, 10);
    const selectedCount = Math.max(7, questionCount);
    questionSet = availableQuestions.sort(() => Math.random() - 0.5).slice(0, selectedCount);
    currentScore = 0;
    currentQuestionIndex = 0;
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
};
function loadQuestion() {
    clearInterval(quizTimer);
    selectedOption = null;
    const q = questionSet[currentQuestionIndex];
    questionText.textContent = q.question;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questionSet.length}`;
    optionsContainer.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "optionBtn";
        btn.textContent = opt;
        btn.onclick = () => {
            document.querySelectorAll(".optionBtn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
            selectedOption = opt;
        };
        optionsContainer.appendChild(btn);
    });
    startTimer();
}
function startTimer() {
    let timeLeft = 10;
    timerBox.textContent = String(timeLeft);
    quizTimer = window.setInterval(() => {
        timeLeft--;
        timerBox.textContent = String(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            evaluateAnswer();
        }
    }, 1000);
}
nextBtn.onclick = () => evaluateAnswer();
function evaluateAnswer() {
    clearInterval(quizTimer);
    if (selectedOption === questionSet[currentQuestionIndex].answer) {
        currentScore++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex === questionSet.length) {
        endQuiz();
    }
    else {
        loadQuestion();
    }
}
function endQuiz() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    scoreText.textContent = `You scored ${currentScore} out of ${questionSet.length}`;
}
saveScoreBtn.onclick = () => {
    const name = playerNameInput.value.trim();
    if (!name)
        return;
    saveScoreToLeaderboard(name, currentScore);
    showLeaderboard();
};
viewLeaderboardBtn.onclick = () => showLeaderboard();
backToStartBtn.onclick = () => {
    leaderboardScreen.style.display = "none";
    startScreen.style.display = "block";
};
restartBtn.onclick = () => {
    resultScreen.style.display = "none";
    startScreen.style.display = "block";
};
function showLeaderboard() {
    leaderboardList.innerHTML = "";
    const list = loadLeaderboard();
    list.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${item.playerName}</span><span>${item.playerScore}</span>`;
        leaderboardList.appendChild(li);
    });
    startScreen.style.display = "none";
    resultScreen.style.display = "none";
    leaderboardScreen.style.display = "block";
}
