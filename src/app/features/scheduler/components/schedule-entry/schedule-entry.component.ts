import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NbrOfCourtsUpdated, NbrOfPlayersPerCourtUpdated, NbrOfPlayersUpdated, PlayerAdded, PlayerRemoveAll, RandomizeOrderUpdated, SchedulerTypeUpdated } from '../../actions/scheduler.actions';
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
  seRandomizeOrder = false;

  constructor(private store: Store<SchedulerState>, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    if (this.seType === 'King') {
      this.sePlayersPerCourt = 4;
    } else {
      this.seCourts = 0;
      this.sePlayersPerCourt = 2;
    }
    this.store.dispatch(new PlayerRemoveAll());
    for (let index = 0; index < this.sePlayers; index++) {
      this.store.dispatch(new PlayerAdded(index + 1, true, true, 0, {}, {}));
    }
    this.store.dispatch(new SchedulerTypeUpdated(this.seType));
    this.store.dispatch(new NbrOfPlayersUpdated(this.sePlayers));
    this.store.dispatch(new NbrOfCourtsUpdated(this.seCourts));
    this.store.dispatch(new NbrOfPlayersPerCourtUpdated(this.sePlayersPerCourt));
    this.store.dispatch(new RandomizeOrderUpdated(this.seRandomizeOrder));

    this.router.navigate(['/scheduleTournament']);
  }

  onClickScheduleType(value: string) {
    this.seType = value;
  }
}
