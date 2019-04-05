import * as actions from '../actions/scheduler.actions';

export interface SchedulerSettings {
  schedulerType: string;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
  randomizeOrder: boolean;
}

export interface State {
  schedulerType: string;
  nbrOfPlayers: number;
  nbrOfCourts: number;
  nbrOfPlayersPerCourt: number;
  randomizeOrder: boolean;
}

const initialState: State = {
  schedulerType: 'King',
  nbrOfPlayers: 0,
  nbrOfCourts: 0,
  nbrOfPlayersPerCourt: 0,
  randomizeOrder: true
};

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.UPDATE_SCHEDULER_TYPE:
      return {
        schedulerType: action.payload.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt,
        randomizeOrder: state.randomizeOrder

      };
      case actions.UPDATE_NBR_OF_PLAYERS:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: action.payload.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt,
        randomizeOrder: state.randomizeOrder

      };
      case actions.UPDATE_NBR_OF_COURTS:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: action.payload.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt,
        randomizeOrder: state.randomizeOrder

      };
      case actions.UPDATE_NBR_OF_PLAYERS_PER_COURT:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: action.payload.nbrOfPlayersPerCourt,
        randomizeOrder: state.randomizeOrder

      };
      case actions.UPDATE_RANDOMIZE_ORDER:
      return {
        schedulerType: state.schedulerType,
        nbrOfPlayers: state.nbrOfPlayers,
        nbrOfCourts: state.nbrOfCourts,
        nbrOfPlayersPerCourt: state.nbrOfPlayersPerCourt,
        randomizeOrder: action.payload.randomizeOrder

      };
    default: {
      return state;
    }
  }
}
