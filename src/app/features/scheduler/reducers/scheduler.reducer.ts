import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/scheduler.actions';
export interface SchedulerSettingsEntity {
  id: number;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface State extends EntityState<SchedulerSettingsEntity> { }

const initialState: State = {
  ids: ['1'],
  entities: {
    1: { id: 1, nbrOfPlayers: 10, nbrOfCourts: 2, nbrOfPlayersPerCourt: 4 }
  }
};

export const adapter = createEntityAdapter<SchedulerSettingsEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.UPDATE_SCHEDULER_SETTINGS: {
      return adapter.updateOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
