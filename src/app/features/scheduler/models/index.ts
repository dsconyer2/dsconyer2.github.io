export interface Player {
    playerId: number;
    isPlayerAvailable: boolean;
    isByeAvailable: boolean;
    byeRound: number;
    playedAgainst: {};
    courtsPlayed: {};
}

export interface SchedulerSettings {
  schedulerType: string;
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
  matchLabel: string;
  team1: Player[];
  team2: Player[];
  matchPriority: {};
  courtPriority: {};
  courtAssigned: number;
  opponentsAssigned: boolean;
  isPrimary: boolean;
}

export interface RoundData {
  roundId: number;
  matches: Match[];
  byes: Player[];
  byeLabel: string;
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

