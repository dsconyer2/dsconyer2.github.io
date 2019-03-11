import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/scheduler.actions';
export interface PlayerEntity {
  id: number;
  playerId: number;
  isPlayerAvailable: boolean;
  isByeAvailable: boolean;
  byeRound: number;
}

export interface State extends EntityState<PlayerEntity> { }

// const initialState: State = {
//   ids: ['1', '2'],
//   entities: {
//     1: { id: 1, playerId: 1, isPlayerAvailable: true, isByeAvailable: true, byeRound: 0 },
//     2: { id: 2, playerId: 2, isPlayerAvailable: true, isByeAvailable: true, byeRound: 0 }
//   }
// };
const initialState: State = {
  ids: [],
  entities: {
  }
};

export const adapter = createEntityAdapter<PlayerEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_PLAYER: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
