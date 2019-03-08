import { Action } from '@ngrx/store';
import * as actions from '../actions/scheduler.actions';

export interface SchedulerSettings {
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface State {
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

const initialState: State = {
  nbrOfPlayers: 0,
  nbrOfCourts: 0,
  nbrOfPlayersPerCourt: 0
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.UPDATE_NBR_OF_PLAYERS:
      return {
        nbrOfPlayers: action.payload.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt
        
      };
      case actions.UPDATE_NBR_OF_COURTS:
      return {
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: action.payload.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt
        
      };
      case actions.UPDATE_NBR_OF_PLAYERS_PER_COURT:
      return {
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: action.payload.nbrOfPlayersPerCourt
        
      };
    default: {
      return state;
    }
  }
}
