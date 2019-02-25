import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-entry',
  templateUrl: './schedule-entry.component.html',
  styleUrls: ['./schedule-entry.component.css']
})
export class ScheduleEntryComponent implements OnInit {

  sePlayers: Number = 0;
  seCourts: Number= 0;

  constructor() { }

  ngOnInit() {
  }

}
