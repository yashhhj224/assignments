const leaderboardKey = "quizLeaderboard";
export function saveScoreToLeaderboard(playerName, playerScore) {
    const list = JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
    list.push({ playerName, playerScore });
    list.sort((a, b) => b.playerScore - a.playerScore);
    localStorage.setItem(leaderboardKey, JSON.stringify(list));
}
export function loadLeaderboard() {
    return JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
}
