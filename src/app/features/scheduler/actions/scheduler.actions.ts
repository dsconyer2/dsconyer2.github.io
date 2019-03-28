import { Action } from '@ngrx/store';
import { PlayerEntity } from '../reducers/player.reducer';
import { SchedulerSettings } from '../reducers/scheduler.reducer';

let myId = 10;
export const ADD_PLAYER = '[schedulerFeature] add  player';
export class PlayerAdded implements Action {
  readonly type = ADD_PLAYER;
  payload: PlayerEntity;
  constructor(playerId: number, isPlayerAvailable: boolean, isByeAvailable: boolean,
              byeRound: number, playedAgainst: {}, courtsPlayed: {}) {
    this.payload = {
      playerId,
    isPlayerAvailable,
    isByeAvailable,
    byeRound,
    playedAgainst,
    courtsPlayed,
    id: myId++
    };
   }
}

export const REMOVE_ALL_PLAYER = '[schedulerFeature] removeAll  player';
export class PlayerRemoveAll implements Action {
  readonly type = REMOVE_ALL_PLAYER;
  // payload: PlayerEntity;
  constructor() {
    // this.payload = {};
   }
}

export const UPDATE_SCHEDULER_TYPE = '[schedulerFeature] update  schedulerType';
export class SchedulerTypeUpdated implements Action {
  readonly type =  UPDATE_SCHEDULER_TYPE;
  payload: SchedulerSettings;
  constructor(schedulerType: string) {
    this.payload = {
      schedulerType,
      nbrOfPlayers: 0,
      nbrOfCourts: 0,
      nbrOfPlayersPerCourt: 0
    };
   }
}

export const UPDATE_NBR_OF_PLAYERS = '[schedulerFeature] update  nbrOfPlayers';
export class NbrOfPlayersUpdated implements Action {
  readonly type =  UPDATE_NBR_OF_PLAYERS;
  payload: SchedulerSettings;
  constructor(nbrOfPlayers: number) {
    this.payload = {
      schedulerType: '',
      nbrOfPlayers,
      nbrOfCourts: 0,
      nbrOfPlayersPerCourt: 0
    };
   }
}

export const UPDATE_NBR_OF_COURTS = '[schedulerFeature] update  nbrOfCourts';
export class NbrOfCourtsUpdated implements Action {
  readonly type =  UPDATE_NBR_OF_COURTS;
  payload: SchedulerSettings;
  constructor(nbrOfCourts: number) {
    this.payload = {
      schedulerType: '',
      nbrOfPlayers: 0,
      nbrOfCourts,
      nbrOfPlayersPerCourt: 0
    };
   }
}

export const UPDATE_NBR_OF_PLAYERS_PER_COURT = '[schedulerFeature] update  nbrOfPlayersPerCourt';
export class NbrOfPlayersPerCourtUpdated implements Action {
  readonly type =  UPDATE_NBR_OF_PLAYERS_PER_COURT;
  payload: SchedulerSettings;
  constructor(nbrOfPlayersPerCourt: number) {
    this.payload = {
      schedulerType: '',
      nbrOfPlayers: 0,
      nbrOfCourts: 0,
      nbrOfPlayersPerCourt
    };
   }
}


// Discriminated Union Type  http://www.typescriptlang.org/docs/handbook/advanced-types.html
export type All = PlayerAdded | PlayerRemoveAll | SchedulerTypeUpdated | NbrOfPlayersUpdated | NbrOfCourtsUpdated | NbrOfPlayersPerCourtUpdated;
