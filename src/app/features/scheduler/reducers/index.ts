import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Player } from '../models';
import * as fromPlayerManager from './player.reducer';

export interface SchedulerState {
  players: fromPlayerManager.State;
  // schedulerSettings: fromBookLoanManager.State;
}

export const reducers = {
  players: fromPlayerManager.reducer,
  // schedulerSettings: fromBookLoanManager.reducer
};

// 1. Create a Feature Selector
const selectPlayerFeature = createFeatureSelector<SchedulerState>('schedulerFeature');
// 2. Create a Selector for Each Branch of the Feature
const selectPlayers = createSelector(selectPlayerFeature, f => f.players);

// 3. Create any "helpers" you might need (optional)
const { selectAll: selectPlayerEntityArray } = fromPlayerManager.adapter.getSelectors(selectPlayers);

// 4. Create a selector for waht the component needs.

// TodoEntity[] => TodoListItem[]
export const selectPlayerEntities = createSelector(selectPlayerEntityArray, t => t.map(x => x as Player));

