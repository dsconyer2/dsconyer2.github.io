import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerAdded } from '../../actions/scheduler.actions';
import { SchedulerState } from '../../reducers';

@Component({
  selector: 'app-schedule-entry',
  templateUrl: './schedule-entry.component.html',
  styleUrls: ['./schedule-entry.component.css']
})
export class ScheduleEntryComponent implements OnInit {

  sePlayers = 0;
  seCourts = 0;

  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
  }

  submit() {
    for (let index = 0; index < this.sePlayers; index++) {
      this.store.dispatch(new PlayerAdded(index, true, true, 0));
    }
  }
}
