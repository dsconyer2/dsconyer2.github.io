import { Action } from '@ngrx/store';
import { PlayerEntity } from '../reducers/player.reducer';
import { SchedulerSettingsEntity } from '../reducers/scheduler-settings.reducer';

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


export const UPDATE_SCHEDULER_SETTINGS = '[schedulerFeature] update  settings';
export class SchedulerSettingsUpdated implements Action {
  readonly type = UPDATE_SCHEDULER_SETTINGS;
  payload: SchedulerSettingsEntity;
  constructor(id: number, courts: number, playersPerCourt: number) {
    this.payload = {
      id,
    courts,
    playersPerCourt
    };
   }
}


// Discriminated Union Type  http://www.typescriptlang.org/docs/handbook/advanced-types.html
export type All = PlayerAdded | SchedulerSettingsUpdated;
