
export interface Question {
    question: string,
    options: string[],
    answer: string,
}

export interface LeaderboardEntry {
    playerName: string,
    playerScore: number,
}

export type Category = "general" | "tech" | "science";
export type Difficulty = "easy" | "medium" | "hard";
