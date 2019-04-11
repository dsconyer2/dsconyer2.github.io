import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/group-manager.actions';

export interface GroupEntity {
  id: number;
  groupId: number;
  name?: string;
  playerIds?: number;
  enabledPlayerIds?: number;
}

export interface State extends EntityState<GroupEntity> { }

const initialState: State = {
  ids: ['1', '2'],
  entities: {
    1: { id: 1, groupId: 1, name: 'Monday at Mentor', playerIds: 1, enabledPlayerIds: 2},
    2: { id: 2, groupId: 2, name: 'YMCA Tuesday', playerIds: 3, enabledPlayerIds: 4}
  }
};
// const initialState: State = {
//   ids: [],
//   entities: {
//   }
// };

export const adapter = createEntityAdapter<GroupEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_GROUP: {
      return adapter.addOne(action.payload, state);
    }
    case actions.REMOVE_GROUP: {
      return adapter.removeOne(action.payload.groupId, state);
    }
    default: {
      return state;
    }
  }
}
