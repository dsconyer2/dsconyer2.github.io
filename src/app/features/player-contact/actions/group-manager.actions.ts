import { Action } from '@ngrx/store';
import { GroupEntity } from '../reducers/group-manager.reducer';

export const ADD_GROUP = '[groupFeature] add  group';
export class GroupAdded implements Action {
  readonly type = ADD_GROUP;
  payload: GroupEntity;
  constructor(groupId: number, name: string, playerIds: number, enabledPlayerIds: number) {
    this.payload = {
      id: groupId,
      groupId: groupId,
      name: name,
      playerIds: playerIds,
      enabledPlayerIds: enabledPlayerIds
    };
   }
}

export const REMOVE_GROUP = '[groupFeature] remove  group';
export class GroupRemoved implements Action {
  readonly type = REMOVE_GROUP;
  payload: GroupEntity;
  constructor(groupId: number) {
    this.payload = {
      id: groupId,
      groupId: groupId
    };
   }
}


export type All = GroupAdded | GroupRemoved;
