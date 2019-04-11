import { Action } from '@ngrx/store';
import { GroupPlayerEntity, GroupPlayerUpdateEntity } from '../reducers/group-player.reducer';
import { PlayerContact } from '../models';


export const CREATE_GROUP_PLAYER = '[groupFeature] create  groupPlayer';
export class GroupPlayerCreated implements Action {
  readonly type = CREATE_GROUP_PLAYER;
  payload: GroupPlayerEntity;
  constructor(groupPlayerId: number) {
    this.payload = {
      id: groupPlayerId,
      groupPlayerId,
      players: []
      
    };
   }
}

export const DELETE_GROUP_PLAYER = '[groupFeature] delete  groupPlayer';
export class GroupPlayerDeleted implements Action {
  readonly type = DELETE_GROUP_PLAYER;
  payload: GroupPlayerEntity;
  constructor(groupPlayerId: number) {
    this.payload = {
      id: groupPlayerId,
      groupPlayerId
    };
   }
}

export const ADD_GROUP_PLAYER = '[groupFeature] add  groupPlayer';
export class GroupPlayerAdded implements Action {
  readonly type = ADD_GROUP_PLAYER;
  payload: GroupPlayerUpdateEntity;
  constructor(groupPlayerId: number, players: PlayerContact[]) {
    this.payload = {
      id: groupPlayerId,
      changes: {players: players}
    };
   }
}

export const REMOVE_GROUP_PLAYER = '[groupFeature] remove  groupPlayer';
export class GroupPlayerRemoved implements Action {
  readonly type = REMOVE_GROUP_PLAYER;
  payload: GroupPlayerUpdateEntity;
  constructor(groupPlayerId: number, players: PlayerContact[]) {
    this.payload = {
      id: groupPlayerId,
      changes: {players: players}
    };
   }
}

export type All = GroupPlayerCreated | GroupPlayerDeleted | GroupPlayerAdded | GroupPlayerRemoved;
