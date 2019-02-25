import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Player } from '../models';
import * as fromBookLoanManager from './book-loan.reducer';
import * as fromPlayerManager from './player.reducer';

export interface PlayerState {
  players: fromPlayerManager.State;
  schedulerSettings: fromBookLoanManager.State;
}

export const reducers = {
  players: fromPlayerManager.reducer,
  onLoan: fromBookLoanManager.reducer
};

// 1. Create a Feature Selector
const selectPlayerFeature = createFeatureSelector<PlayerState>('bookManagerFeature'); // change bookManagerFeature
// 2. Create a Selector for Each Branch of the Feature
const selectPlayers = createSelector(selectPlayerFeature, f => f.books);  // change books
const selectOnLoan = createSelector(selectBookManagerFeature, f => f.onLoan);
// 3. Create any "helpers" you might need (optional)
const { selectAll: selectPlayerEntityArray } = fromPlayerManager.adapter.getSelectors(selectPlayers);
const { selectAll: selectBookLoanManagerEntityArray } = fromBookLoanManager.adapter.getSelectors(selectOnLoan);
// 4. Create a selector for waht the component needs.

// TodoEntity[] => TodoListItem[]
export const selectPlayerEntities = createSelector(selectPlayerEntityArray, t => t.map(x => x as Player));
export const selectBookManagerOnLoanItems =
    createSelector(selectBookLoanManagerEntityArray, t => t.map(x => x as Player));
