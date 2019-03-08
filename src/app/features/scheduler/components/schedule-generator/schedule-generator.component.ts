import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, SchedulerSettings } from '../../models';
import { SchedulerState } from '../../reducers';


@Component({
  selector: 'app-schedule-generator',
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.css']
})
export class ScheduleGeneratorComponent implements OnInit {


  @Input() myPlayers: Player[];
  @Input() schedulerSettings: SchedulerSettings;

  nbrOfByePlayers: number;

  byeList: Player[] = [];
  byeRound = 0;

  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
    this.schedulePLayers();
  }

  initialize() {
    this.nbrOfByePlayers = this.schedulerSettings.nbrOfPlayers -
                  (this.schedulerSettings.nbrOfCourts * this.schedulerSettings.nbrOfPlayersPerCourt);
    // this.mySchedulerSettings = this.schedulerSettings[0];
    // this.nbrOfPlayers = this.mySchedulerSettings.nbrOfPlayers;
    // this.nbrOfCourts = this.mySchedulerSettings.nbrOfCourts;
    // this.playersPerCourt = this.mySchedulerSettings.nbrOfPlayersPerCourt;
  }

  determineByePlayers() {
    // regular bye selection
    this.byeRound++;
    while (this.byeListNotFull() && this.playersAvailableForBye().length > 0) {
      this.pickByePlayers(this.playersAvailableForBye());
    }

    // need more players to pick from to fill the byeList
    if (this.byeListNotFull()) {
      const byeIndex: number = this.byeRound - 2;
      this.byeRound = 1;
      while (this.byeListNotFull()) {
        for (let i = 1; i < byeIndex; i++) {
          this.pickByePlayers(this.playersAvailableForBye().filter(aPlayer => aPlayer.byeRound === i));
        }
      }
    }
  }

  byeListNotFull() {
    return this.byeList.length < this.nbrOfByePlayers;
  }

  playersAvailableForBye() {
    return this.myPlayers.filter( aPlayer => aPlayer.isByeAvailable);
  }

  pickByePlayers(availableByePlayers: Player[]) {
    const pickId: number = Math.trunc(availableByePlayers.length * Math.random());
    console.log('Pick id =', pickId);
    const byePlayerPicked = availableByePlayers[pickId];
    byePlayerPicked.isByeAvailable = false;
    byePlayerPicked.byeRound = this.byeRound;
    this.byeList.push(byePlayerPicked);
  }

  schedulePLayers() {
    // this.initialize();
    // this.determineByePlayers();
    console.log('Number of bye players = ', this.nbrOfByePlayers);
    console.log('Bye Round = ', this.byeRound);
    console.table(this.byeList);
  }
}
