import { Action } from '@ngrx/store';
import { PlayerEntity } from '../reducers/player.reducer';

// let myId = 99;
export const ADD_PLAYER = '[schedulerFeature] add  player';
export class PlayerAdded implements Action {
  readonly type = ADD_PLAYER;
  payload: PlayerEntity;
  constructor(playerId: number, isPlayerAvailable: boolean, isByeAvailable: boolean, byeRound: number) {
    this.payload = {
      playerId,
    isPlayerAvailable,
    isByeAvailable,
    byeRound
    };
   }
}



// Discriminated Union Type  http://www.typescriptlang.org/docs/handbook/advanced-types.html
export type All = PlayerAdded;
