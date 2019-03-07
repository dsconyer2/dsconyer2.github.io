import { Action } from '@ngrx/store';
import { PlayerEntity } from '../reducers/player.reducer';
import { SchedulerSettingsChanges } from '../reducers/scheduler.reducer';

let myId = 10;
export const ADD_PLAYER = '[schedulerFeature] add  player';
export class PlayerAdded implements Action {
  readonly type = ADD_PLAYER;
  payload: PlayerEntity;
  constructor(playerId: number, isPlayerAvailable: boolean, isByeAvailable: boolean, byeRound: number) {
    this.payload = {
      playerId,
    isPlayerAvailable,
    isByeAvailable,
    byeRound,
    id: myId++
    };
   }
}

export const UPDATE_SCHEDULER_SETTINGS = '[schedulerFeature] update  schedulerSettings';
export class SchedulerSettingsUpdated implements Action {
  readonly type =  UPDATE_SCHEDULER_SETTINGS;
  payload: SchedulerSettingsChanges;
  constructor(id: number, nbrOfPlayers: number, nbrOfCourts: number, nbrOfPlayersPerCourt: number) {
    this.payload = {
      id,
      changes: {
        nbrOfPlayers,
        nbrOfCourts,
        nbrOfPlayersPerCourt
      }

    };
   }
}


// Discriminated Union Type  http://www.typescriptlang.org/docs/handbook/advanced-types.html
export type All = PlayerAdded | SchedulerSettingsUpdated;
