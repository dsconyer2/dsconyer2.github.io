export interface PlayerContact {
  playerContactId: number;
  name?: string;
}

export interface Group {
  groupId: number;
  name?: string;
  playerIds?: number;
  enabledPlayerIds?: number;
}

export interface GroupPlayer {
  groupPlayerId: number;
  players?: PlayerContact[];
}