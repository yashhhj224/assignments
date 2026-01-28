const leaderboardKey = "quizLeaderboard";
export function saveScoreToLeaderboard(playerName, playerScore) {
    const list = JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
    const existing = list.find(e => e.playerName === playerName);
    if (existing) {
        existing.playerScore = Math.max(existing.playerScore, playerScore);
    }
    else {
        list.push({ playerName, playerScore });
    }
    list.sort((a, b) => b.playerScore - a.playerScore);
    localStorage.setItem(leaderboardKey, JSON.stringify(list));
}
export function loadLeaderboard() {
    return JSON.parse(localStorage.getItem(leaderboardKey) || "[]");
}
