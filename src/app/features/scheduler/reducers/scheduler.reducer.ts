import * as actions from '../actions/scheduler.actions';

export interface SchedulerSettings {
  schedulerType: string;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

export interface State {
  schedulerType: string;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
}

const initialState: State = {
  schedulerType: 'King',
  nbrOfPlayers: 0,
  nbrOfCourts: 0,
  nbrOfPlayersPerCourt: 0
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.UPDATE_SCHEDULER_TYPE:
      return {
        schedulerType: action.payload.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt

      };
      case actions.UPDATE_NBR_OF_PLAYERS:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: action.payload.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt

      };
      case actions.UPDATE_NBR_OF_COURTS:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: action.payload.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt

      };
      case actions.UPDATE_NBR_OF_PLAYERS_PER_COURT:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: action.payload.nbrOfPlayersPerCourt

      };
    default: {
      return state;
    }
  }
}
