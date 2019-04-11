import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/group-player-actions';
import { PlayerContact } from '../models';

export interface GroupPlayerEntity {
  id: number;
  groupPlayerId: number;
  players?: PlayerContact[];
}

export interface GroupPlayerUpdateEntity {
  id: number;
  changes: Partial<GroupPlayerEntity>;
}

export interface State extends EntityState<GroupPlayerEntity> { }

const initialState: State = {
  ids: ['1', '2', '3', '4'],
  entities: {
    1: { id: 1, groupPlayerId: 1, players: []},
    2: { id: 2, groupPlayerId: 2, players: []},
    3: { id: 3, groupPlayerId: 3, players: []},
    4: { id: 4, groupPlayerId: 4, players: []}
  }
};

// const initialState: State = {
//   ids: [],
//   entities: {
//   }
// };

export const adapter = createEntityAdapter<GroupPlayerEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.CREATE_GROUP_PLAYER: {
      return adapter.addOne(action.payload, state);
    }
    case actions.DELETE_GROUP_PLAYER: {
      return adapter.removeOne(action.payload.id, state);
    }
    case actions.ADD_GROUP_PLAYER: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload.changes}, state);
    }
    case actions.REMOVE_GROUP_PLAYER: {
      return adapter.updateOne({id: action.payload.id, changes: action.payload.changes}, state);
    }
    default: {
      return state;
    }
  }
}
