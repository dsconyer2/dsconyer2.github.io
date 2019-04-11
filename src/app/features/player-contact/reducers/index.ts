import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerContact, Group, GroupPlayer } from '../models';
import * as fromPlayerContactManager from './player-contact.reducer';
import * as fromGroupManager from './group-manager.reducer';
import * as fromGroupPlayer from './group-player.reducer';
import { PlayerContactAdded } from '../actions/player-contact.actions';


export interface PlayerContactState {
  playerContacts: fromPlayerContactManager.State;
  groups: fromGroupManager.State;
  groupPlayers: fromGroupPlayer.State;
}

export const reducers = {
  playerContacts: fromPlayerContactManager.reducer,
  groups: fromGroupManager.reducer,
  groupPlayers: fromGroupPlayer.reducer
};

// 1. Create a Feature Selector
const selectPlayerContactFeature = createFeatureSelector<PlayerContactState>('playerContactFeature');
// 2. Create a Selector for Each Branch of the Feature
const selectPlayerContacts = createSelector(selectPlayerContactFeature, f => f.playerContacts);
const selectGroups = createSelector(selectPlayerContactFeature, f => f.groups);
const selectGroupPlayers = createSelector(selectPlayerContactFeature, f => f.groupPlayers);

// 3. Create any "helpers" you might need (optional)
const { selectAll: selectPlayerContactEntityArray } = fromPlayerContactManager.adapter.getSelectors(selectPlayerContacts);
const { selectAll: selectGroupEntityArray } = fromGroupManager.adapter.getSelectors(selectGroups);
const { selectAll: selectGroupPlayerEntityArray } = fromGroupPlayer.adapter.getSelectors(selectGroupPlayers);

// 4. Create a selector for what the component needs.

// TodoEntity[] => TodoListItem[]
export const selectPlayerContactEntities = createSelector(selectPlayerContactEntityArray, t => t.map(x => x as PlayerContact));
const initPlayer: PlayerContact = {playerContactId: 0};
export const selectHighestPlayerId = createSelector(selectPlayerContactEntityArray, t => t.map(x => x as PlayerContact).reduce((a,c) => {let n = Math.max(a.playerContactId, c.playerContactId); if (n === a.playerContactId){return a} else {return c}}, initPlayer));

export const selectGroupEntities = createSelector(selectGroupEntityArray, t => t.map(x => x as Group));
const initGroup: Group = {groupId: 0};
export const selectHighestGroupId = createSelector(selectGroupEntityArray, t => t.map(x => x as Group).reduce((a,c) => {let n = Math.max(a.groupId, c.groupId); if (n === a.groupId){return a} else {return c}}, initGroup));

export const selectGroupPlayerEntities = createSelector(selectGroupPlayerEntityArray, t => t.map(x => x as GroupPlayer));
const initGroupPlayer: GroupPlayer = {groupPlayerId: 0};
export const selectHighestGroupPlayerId = createSelector(selectGroupPlayerEntityArray, t => t.map(x => x as GroupPlayer).reduce((a,c) => {let n = Math.max(a.groupPlayerId, c.groupPlayerId); if (n === a.groupPlayerId){return a} else {return c}}, initGroupPlayer));