export interface Player {
    playerId: number;
    isPlayerAvailable: boolean;
    isByeAvailable: boolean;
    byeRound: number;
}

export interface SchedulerSettings {
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface RowObject {
  id: number;
  isAvailable: boolean;
  columns: ColumnObject[];
}

export interface ColumnObject {
  id: number;
  isAvailable: boolean;
  isPicked: boolean;
  round: number;
  playerIds: number[];
}

export interface Level1RoundDataObject {
  round: number;
  id: number;
  playerIds: number[];
}

