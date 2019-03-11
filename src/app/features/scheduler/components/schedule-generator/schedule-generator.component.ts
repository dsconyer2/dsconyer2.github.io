import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Player, SchedulerSettings, RowObject, ColumnObject, Level1RoundDataObject } from '../../models';
import { SchedulerState } from '../../reducers';


@Component({
  selector: 'app-schedule-generator',
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.css']
})
export class ScheduleGeneratorComponent implements OnInit {


  @Input() myPlayers: Player[];
  @Input() schedulerSettings: SchedulerSettings;

  nbrOfPlayers: number;
  nbrOfCourts: number;
  playersPerCourt: number;
  nbrOfByePlayers: number;

  byeList: Player[] = [];
  byeRound = 0;
  round = 0;
  level1Array: RowObject[];
  unavailableIndexes: number[];
  numberOfPairings: number;
  level1RoundData: Level1RoundDataObject[];

  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
    this.schedulePLayers();
  }

  initialize() {
    this.nbrOfByePlayers = this.schedulerSettings.nbrOfPlayers -
                  (this.schedulerSettings.nbrOfCourts * this.schedulerSettings.nbrOfPlayersPerCourt);
    this.nbrOfPlayers = this.schedulerSettings.nbrOfPlayers;
    this.nbrOfCourts = this.schedulerSettings.nbrOfCourts;
    this.playersPerCourt = this.schedulerSettings.nbrOfPlayersPerCourt;
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

  createLevel1Array() {
    for (let rowIndex = 0; rowIndex < this.nbrOfPlayers; rowIndex++) {
      let row:RowObject = {
        id: rowIndex,
        isAvailable: true,
        columns: []
      }
      for (let colIndex = rowIndex + 1; colIndex < this.nbrOfPlayers; colIndex++) {
        let col:ColumnObject = {
          id: colIndex,
          isAvailable: true,
          isPicked: false,
          round: 0,
          playerIds: []
        }
        col.playerIds.push(rowIndex);
        col.playerIds.push(colIndex);
        row.columns.push(col);
      }
      this.level1Array.push(row);
    }
  }

  initializeUnavailableIndexes() {
    //load all bye players into the unavailable list
    this.byeList.forEach(byePlayer => 
    this.unavailableIndexes.push(this.myPlayers.findIndex(p => p.playerId === byePlayer.playerId)))
  }

  setRowsAndColumnsUnavailable(array:RowObject[], unavailableIndexes: number[]) {
    array.forEach((row) => {
      if(unavailableIndexes.find(ui => ui === row.id)) {row.isAvailable = false;}
      row.columns.forEach((col) => {
        if(unavailableIndexes.find(ui => ui === col.id)) {
          col.isAvailable = false;
          col.isPicked = true;
        }
      })
    })
  }

  schedulePLayers() {
    this.initialize();
    this.determineByePlayers();
    console.log('Number of bye players = ', this.nbrOfByePlayers);
    console.log('Bye Round = ', this.byeRound);
    console.table(this.byeList);
    this.createLevel1Array();
    // this.initializeUnavailableIndexes();
    // this.setRowsAndColumnsUnavailable(this.level1Array, this.unavailableIndexes);
    this.numberOfPairings = (this.nbrOfPlayers - this.nbrOfByePlayers) / 2;

    // for (let index = 0; index < this.numberOfPairings; index++) {
    //   let pairingArray: RowObject[] = this.level1Array.filter(row => row.isAvailable);
    //   pairingArray.forEach(row => {
    //     for (let colIndex = 0; colIndex < row.columns.length; colIndex++) {
    //       const col = row.columns[colIndex];
    //       if(col.isPicked || !col.isAvailable || this.unavailableIndexes.find(ui => ui === col.id)) {
    //         continue;
    //       } else {
    //         let roundData: Level1RoundDataObject = {
    //           round: this.round,
    //           id: index,
    //           playerIds: col.playerIds
    //         }
    //         this.level1RoundData.push(roundData);
    //         col.isAvailable = false;
    //         col.isPicked = true;
    //         row.isAvailable = false;
    //         col.playerIds.forEach(playerId => {
    //           if(!this.unavailableIndexes.find(ui => ui === playerId)){
    //             this.unavailableIndexes.push(playerId);
    //           }
    //         })
    //       }
          
    //     }

    //   })
    // }

    console.log('Round data');
    console.table(this.level1RoundData);
    console.log("Player data");
    console.table(this.myPlayers);
  }
}
