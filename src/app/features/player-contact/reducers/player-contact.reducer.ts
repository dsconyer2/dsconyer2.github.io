import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/player-contact.actions';
export interface PlayerContactEntity {
  id: number;
  playerContactId: number;
  name?: string;
}

export interface State extends EntityState<PlayerContactEntity> { }

// const initialState: State = {
//   ids: ['1', '2'],
//   entities: {
//     1: { id: 1, playerContactId: 1, name: 'Daryl Sconyers'},
//     2: { id: 2, playerContactId: 2, name: 'Rose Sconyers'}
//   }
// };
const initialState: State = {
  ids: [],
  entities: {
  }
};

export const adapter = createEntityAdapter<PlayerContactEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_PLAYER_CONTACT: {
      return adapter.addOne(action.payload, state);
    }
    case actions.REMOVE_PLAYER_CONTACT: {
      return adapter.removeOne(action.payload.playerContactId, state);
    }
    default: {
      return state;
    }
  }
}
