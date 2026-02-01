import { quizPool } from "./questions.js";
import { saveScoreToLeaderboard, loadLeaderboard } from "./leaderboard.js";
import { Category, Difficulty, Question } from "./types.js";

const startScreen = document.getElementById("startScreen") as HTMLElement;
const quizScreen = document.getElementById("quizScreen") as HTMLElement;
const resultScreen = document.getElementById("resultScreen") as HTMLElement;
const leaderboardScreen = document.getElementById("leaderboardScreen") as HTMLElement;

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const saveScoreBtn = document.getElementById("saveScoreBtn") as HTMLButtonElement;
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement;
const backToStartBtn = document.getElementById("backToStartBtn") as HTMLButtonElement;
const resultViewLeaderboardBtn = document.getElementById("resultViewLeaderboardBtn") as HTMLButtonElement;

const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;
const difficultySelect = document.getElementById("difficultySelect") as HTMLSelectElement;

const questionText = document.getElementById("questionText") as HTMLElement;
const optionsContainer = document.getElementById("optionsContainer") as HTMLElement;
const progressText = document.getElementById("progressText") as HTMLElement;
const timerBox = document.getElementById("timerBox") as HTMLElement;
const scoreText = document.getElementById("scoreText") as HTMLElement;
const leaderboardList = document.getElementById("leaderboardList") as HTMLElement;

let questionSet: Question[] = [];
let currentQuestionIndex = 0;
let currentScore = 0;
let selectedOption: string | null = null;
let quizTimer: number;

startScreen.style.display = "block";

startBtn.onclick = () => {
    const selectedCategory = categorySelect.value as Category;
    const selectedDifficulty = difficultySelect.value as Difficulty;

    const availableQuestions = [...quizPool[selectedCategory][selectedDifficulty]];
    const selectedCount = Math.min(Math.max(7, availableQuestions.length), 10);

    questionSet = availableQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, selectedCount);

    currentScore = 0;
    currentQuestionIndex = 0;

    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    loadQuestion();
};

function loadQuestion(): void {
    clearInterval(quizTimer);
    selectedOption = null;

    const q = questionSet[currentQuestionIndex];
    questionText.textContent = q.question;
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questionSet.length}`;

    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.className = "optionBtn";
        btn.textContent = option;

        btn.onclick = () => {
            document
                .querySelectorAll(".optionBtn")
                .forEach(b => b.classList.remove("selected"));

            btn.classList.add("selected");
            selectedOption = option;
        };

        optionsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer(): void {
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

function evaluateAnswer(): void {
    clearInterval(quizTimer);

    if (selectedOption === questionSet[currentQuestionIndex].answer) {
        currentScore++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questionSet.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function endQuiz(): void {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    scoreText.textContent = `You scored ${currentScore} out of ${questionSet.length}`;

    saveScoreBtn.style.display = "block";
    resultViewLeaderboardBtn.style.display = "none";
}

saveScoreBtn.onclick = () => {
    const loggedInUser = localStorage.getItem("loggedInUser"); 

    if (!loggedInUser) {
        alert("User is not logged in.");
        return;
    }

    saveScoreToLeaderboard(loggedInUser, currentScore);

    saveScoreBtn.style.display = "none";
    resultViewLeaderboardBtn.style.display = "block";

    showLeaderboard();
};

resultViewLeaderboardBtn.onclick = () => showLeaderboard();

function showLeaderboard(): void {
    leaderboardList.innerHTML = "";

    const list = loadLeaderboard();
    list.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.playerName}</span>
            <span>${item.playerScore}</span>
        `;
        leaderboardList.appendChild(li);
    });

    startScreen.style.display = "none";
    resultScreen.style.display = "none";
    leaderboardScreen.style.display = "block";
}

backToStartBtn.onclick = () => {
    leaderboardScreen.style.display = "none";
    startScreen.style.display = "block";
};

restartBtn.onclick = () => {
    resultScreen.style.display = "none";
    startScreen.style.display = "block";
};
