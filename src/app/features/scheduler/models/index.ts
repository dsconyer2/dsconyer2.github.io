export interface Player {
    playerId: number;
    isPlayerAvailable: boolean;
    isByeAvailable: boolean;
    byeRound: number;
}

export interface SchedulerSettings {
    id: number;
    courts: number;
    playersPerCourt: number;
}
