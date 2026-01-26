import { LeaderboardEntry } from "./types.js"

const leaderboardKey = "quizLeaderboard"

export function saveScoreToLeaderboard(playerName: string, playerScore: number): void {
    const list: LeaderboardEntry[] = JSON.parse(localStorage.getItem(leaderboardKey) || "[]")
    list.push({ playerName, playerScore })
    list.sort((a, b) => b.playerScore - a.playerScore)
    localStorage.setItem(leaderboardKey, JSON.stringify(list))
}

export function loadLeaderboard(): LeaderboardEntry[] {
    return JSON.parse(localStorage.getItem(leaderboardKey) || "[]")
}
