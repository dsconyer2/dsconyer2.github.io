export interface Player {
    playerId: number;
    isPlayerAvailable: boolean;
    isByeAvailable: boolean;
    byeRound: number;
    playedAgainst: {};
}

export interface SchedulerSettings {
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface MatchPriorityEntry {
  matchId: number;
  matchCount: number;
}

export interface Match {
  matchId: number;
  team1: Player[];
  team2: Player[];
  matchPriority: {};
  opponentsAssigned: boolean;
  primary: boolean;
}

export interface RoundData {
  roundId: number;
  matches: Match[];
  byes: Player[];
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

