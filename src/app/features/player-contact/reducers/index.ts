import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerContact } from '../models';
import * as fromPlayerContactManager from './player-contact.reducer';


export interface PlayerContactState {
  playerContacts: fromPlayerContactManager.State;
}

export const reducers = {
  playerContacts: fromPlayerContactManager.reducer
};

// 1. Create a Feature Selector
const selectPlayerContactFeature = createFeatureSelector<PlayerContactState>('playerContactFeature');
// 2. Create a Selector for Each Branch of the Feature
const selectPlayerContacts = createSelector(selectPlayerContactFeature, f => f.playerContacts);

// 3. Create any "helpers" you might need (optional)
const { selectAll: selectPlayerContactEntityArray } = fromPlayerContactManager.adapter.getSelectors(selectPlayerContacts);

// 4. Create a selector for what the component needs.

// TodoEntity[] => TodoListItem[]
export const selectPlayerContactEntities = createSelector(selectPlayerContactEntityArray, t => t.map(x => x as PlayerContact));
export const selectHighestPlayerId = createSelector(selectPlayerContactEntityArray, t => t.reduce((a,c) => {let n = Math.max(a.playerContactId, c.playerContactId); if (n === a.playerContactId){return a} else {return c}}));


