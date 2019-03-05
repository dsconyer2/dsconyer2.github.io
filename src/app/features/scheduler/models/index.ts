export interface Player {
    playerId: number;
    isPlayerAvailable: boolean;
    isByeAvailable: boolean;
    byeRound: number;
}

export interface SchedulerSettings {
  id: number;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface SchedulerSettingsChanges {
  id: number;
  changes: {
    nbrOfPlayers: number;
    nbrOfCourts: number;
    nbrOfPlayersPerCourt: number;
  };
}
