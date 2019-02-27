import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
// import { map, switchMap } from 'rxjs/operators';
// import * as actions from '../actions/scheduler.actions';

@Injectable()
export class SchedulerEffects {

  // @Effect({ dispatch: false }) updateTheApi$ = this.actions$
  //   .pipe(
  //     ofType(actions.ADD_PLAYER),
  //     map(a => a as actions.PlayerAdded),
  //     switchMap(action => this.http.post('http://localhost:3000/books', action.payload))
  //   );


  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
