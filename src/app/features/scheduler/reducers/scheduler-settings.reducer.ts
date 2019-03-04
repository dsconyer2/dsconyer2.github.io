import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/scheduler.actions';
export interface SchedulerSettingsEntity {
  id: number;
  courts: number;
  playersPerCourt: number;
}

export interface State extends EntityState<SchedulerSettingsEntity> { }

const initialState: State = {
  ids: ['1'],
  entities: {
    1: { id: 1, courts: 3, playersPerCourt: 2 }
  }
};

export const adapter = createEntityAdapter<SchedulerSettingsEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.UPDATE_SCHEDULER_SETTINGS: {
      return adapter.addOne(action.payload, state);
      // return adapter.updateOne({
      //   id: 1,
      //   changes: action.payload,
      // }, state);
    }
    default: {
      return state;
    }
  }
}
