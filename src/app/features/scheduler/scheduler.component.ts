import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from './models/index';
import { SchedulerState } from './reducers';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  players$: Observable<Player[]>;
  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
  }

}
