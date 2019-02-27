import { Component, OnInit } from '@angular/core';
import { Player } from '../../models';


@Component({
  selector: 'app-schedule-generator',
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.css']
})
export class ScheduleGeneratorComponent implements OnInit {

  nbrOfPlayers = 17;
  nbrOfCourts = 3;
  playersPerCourt = 4;
  players: Player[] = [];

  nbrOfByePlayers: number = this.nbrOfPlayers - (this.nbrOfCourts * this.playersPerCourt);
  byeList: Player[] = [];
  byeRound = 0;

  constructor() { }

  ngOnInit() {
    this.schedulePLayers();
  }

  initializePlayers() {
    for (let i = 0; i < this.nbrOfPlayers; i++) {
      this.players.push({
        playerId: i + 1,
        isPlayerAvailable: true,
        isByeAvailable: true,
        byeRound: 0
      });
    }
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
    return this.players.filter( aPlayer => aPlayer.isByeAvailable);
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
    this.initializePlayers();
    this.determineByePlayers();
    console.log('Number of bye players = ', this.nbrOfByePlayers);
    console.log('Bye Round = ', this.byeRound);
    console.table(this.byeList);
  }
}
