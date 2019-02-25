import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/book-mgr.actions';
export interface BookManagerEntity {
  id: string;
  title: string;
  author: string;
  format: string;
  onLoan: boolean;
}

export interface State extends EntityState<BookManagerEntity> { }

const initialState: State = {
  ids: ['1', '2'],
  entities: {
    1: { id: '1', title: 'Clean Garage', author: 'Jay Leno', format: 'Paperback', onLoan: false },
    2: { id: '2', title: 'Fix Downspout', author: 'Rain Day', format: 'Hardcover', onLoan: false }
  }
};

export const adapter = createEntityAdapter<BookManagerEntity>();

export function reducer(state: State = initialState, action: actions.All): State {
  switch (action.type) {
    case actions.ADD_BOOK: {
      return adapter.addOne(action.payload, state);
    }
    case actions.LOAN_BOOK: {
      return adapter.removeOne(action.payload.id, state);
    }
    case actions.RETURN_BOOK: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
