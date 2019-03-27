import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NbrOfCourtsUpdated, NbrOfPlayersPerCourtUpdated, NbrOfPlayersUpdated, PlayerAdded, SchedulerTypeUpdated } from '../../actions/scheduler.actions';
import { SchedulerState } from '../../reducers';

@Component({
  selector: 'app-schedule-entry',
  templateUrl: './schedule-entry.component.html',
  styleUrls: ['./schedule-entry.component.css']
})
export class ScheduleEntryComponent implements OnInit {

  seType = 'King';
  sePlayers: number;
  seCourts: number;
  sePlayersPerCourt: number;

  constructor(private store: Store<SchedulerState>, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    for (let index = 0; index < this.sePlayers; index++) {
      this.store.dispatch(new PlayerAdded(index, true, true, 0, {}, {}));
    }
    this.store.dispatch(new SchedulerTypeUpdated(this.seType));
    this.store.dispatch(new NbrOfPlayersUpdated(this.sePlayers));
    this.store.dispatch(new NbrOfCourtsUpdated(this.seCourts));
    this.store.dispatch(new NbrOfPlayersPerCourtUpdated(this.sePlayersPerCourt));

    this.router.navigate(['/scheduleTournament']);
  }

  onClickScheduleType(value: string) {
    this.seType = value;
  }
}
