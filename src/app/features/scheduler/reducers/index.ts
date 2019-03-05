import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Player, SchedulerSettings } from '../models';
import * as fromPlayerManager from './player.reducer';
import * as fromSchedulerManager from './scheduler.reducer';

export interface SchedulerState {
  players: fromPlayerManager.State;
  schedulerSettings: fromSchedulerManager.State;
}

export const reducers = {
  players: fromPlayerManager.reducer,
  schedulerSettings: fromSchedulerManager.reducer
};

// 1. Create a Feature Selector
const selectSchedulerFeature = createFeatureSelector<SchedulerState>('schedulerFeature');
// 2. Create a Selector for Each Branch of the Feature
const selectPlayers = createSelector(selectSchedulerFeature, f => f.players);
const selectSchedulerSettings = createSelector(selectSchedulerFeature, f => f.schedulerSettings);

// 3. Create any "helpers" you might need (optional)
const { selectAll: selectPlayerEntityArray } = fromPlayerManager.adapter.getSelectors(selectPlayers);
const { selectAll: selectSchedulerSettingsEntityArray } = fromSchedulerManager.adapter.getSelectors(selectSchedulerSettings);

// 4. Create a selector for waht the component needs.

// TodoEntity[] => TodoListItem[]
export const selectPlayerEntities = createSelector(selectPlayerEntityArray, t => t.map(x => x as Player));
export const selectSchedulerSettingsEntities =
                createSelector(selectSchedulerSettingsEntityArray, t => t.map(x => x as SchedulerSettings));

