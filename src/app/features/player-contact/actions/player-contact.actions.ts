import { Action } from '@ngrx/store';
import { PlayerContactEntity } from '../reducers/player-contact.reducer';

export const ADD_PLAYER_CONTACT = '[playerContactFeature] add  playerContact';
export class PlayerContactAdded implements Action {
  readonly type = ADD_PLAYER_CONTACT;
  payload: PlayerContactEntity;
  constructor(playerContactId: number, name: string) {
    this.payload = {
      id: playerContactId,
      playerContactId,
    name
    };
   }
}

export const REMOVE_PLAYER_CONTACT = '[playerContactFeature] remove  playerContact';
export class PlayerContactRemoved implements Action {
  readonly type = REMOVE_PLAYER_CONTACT;
  payload: PlayerContactEntity;
  constructor(playerContactId: number) {
    this.payload = {
      id: playerContactId,
      playerContactId
    };
   }
}

export type All = PlayerContactAdded | PlayerContactRemoved;
