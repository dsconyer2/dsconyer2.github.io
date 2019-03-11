import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnObject, Level1RoundDataObject, Player, RowObject, SchedulerSettings } from '../../models';
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
  byeReset = 0;
  round = 0;
  level1Array: RowObject[] = [];
  unavailableIndexes: number[] = [];
  numberOfPairings: number;
  level1RoundData: Level1RoundDataObject[] = [];

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
    this.numberOfPairings = (this.nbrOfPlayers - this.nbrOfByePlayers) / 2;
    this.byeReset = Math.trunc(this.schedulerSettings.nbrOfPlayers / this.nbrOfByePlayers) + 1;
    this.myPlayers.forEach(aPlayer => this.unavailableIndexes.push(aPlayer.playerId));
    this.createLevel1Array();
  }

  resetByeAvailable() {
    this.myPlayers.forEach(aPlayer => {
      if (!this.byeList.includes(aPlayer)) {aPlayer.isByeAvailable = true; }
    });
  }
  determineByePlayers() {
    // regular bye selection
    this.byeRound++;
    while (this.byeListNotFull() && this.playersAvailableForBye().length > 0) {
      this.pickByePlayers(this.playersAvailableForBye());
    }

    // need more players to pick from to fill the byeList
    if (this.byeListNotFull()) {
      this.resetByeAvailable();
      while (this.byeListNotFull()) {
        this.pickByePlayers(this.playersAvailableForBye());
      }
    }
  }

  byeListNotFull() {
    return this.byeList.length < this.nbrOfByePlayers;
  }

  playersAvailableForBye() {
    const byeHighIndex: number = Math.max(Math.trunc(this.byeRound - (this.byeReset / 2)), 0);
    return this.myPlayers.filter( aPlayer => aPlayer.isByeAvailable).filter(aPlayer => aPlayer.byeRound <= byeHighIndex);
  }

  pickByePlayers(availableByePlayers: Player[]) {
    const pickId: number = Math.trunc(availableByePlayers.length * Math.random());
    // console.log('Pick id =', pickId);
    // console.log('Available = ', availableByePlayers);
    const byePlayerPicked = availableByePlayers[pickId];
    byePlayerPicked.isByeAvailable = false;
    byePlayerPicked.byeRound = this.byeRound;
    this.byeList.push(byePlayerPicked);
  }

  createLevel1Array() {
    for (let rowIndex = 0; rowIndex < this.nbrOfPlayers; rowIndex++) {
      const row: RowObject = {
        id: rowIndex,
        isAvailable: true,
        columns: []
      };
      for (let colIndex = rowIndex + 1; colIndex < this.nbrOfPlayers; colIndex++) {
        const col: ColumnObject = {
          id: colIndex,
          isAvailable: true,
          isPicked: false,
          round: 0,
          playerIds: []
        };
        col.playerIds.push(rowIndex);
        col.playerIds.push(colIndex);
        row.columns.push(col);
      }
      this.level1Array.push(row);
    }
  }

  initializeUnavailableIndexes() {
    // load all bye players into the unavailable list
    this.byeList.forEach(byePlayer =>
    this.unavailableIndexes.push(this.myPlayers.findIndex(p => p.playerId === byePlayer.playerId)));
  }

  setRowsAndColumnsAvailability(array: RowObject[], unavailableIndexes: number[], availability: boolean) {
    unavailableIndexes.forEach(uId => {
      array.forEach((row) => {
        if (uId === row.id) {row.isAvailable = availability; }
        row.columns.forEach((col) => {
          if (uId === col.id) {
            col.isAvailable = availability;
          }
        });
      });
    });
  }

  isIdAvailable(id: number) {
    const isAvailable = this.unavailableIndexes.find(ui => ui === id);
    return isAvailable === undefined;
  }

  addUnavailableIndexes(ids: number[]) {
    ids.forEach(id => {
      if (this.isIdAvailable(id)) {
        this.unavailableIndexes.push(id);
      }
    });
  }

  processRound() {
    this.determineByePlayers();
    console.log('Bye Round = ', this.byeRound);
    let val = '';
    this.byeList.forEach(aPlayer => val += (aPlayer.playerId + ', '));
    console.log(val);
    this.initializeUnavailableIndexes();
    this.setRowsAndColumnsAvailability(this.level1Array, this.unavailableIndexes, false);

    for (let index = 0; index < this.numberOfPairings; index++) {
      const pairingArray: RowObject[] = this.level1Array.filter(row => row.isAvailable);
      let rowProcessingIsNotComplete = true;
      pairingArray.forEach(row => {
        if (rowProcessingIsNotComplete) {
          // for (let colIndex = 0; colIndex < row.columns.length; colIndex++) {
          for (const col of row.columns) {
            // const col = row.columns[colIndex];
            if (col.isPicked || !col.isAvailable || !this.isIdAvailable(col.id)) {
              continue;
            } else {
              const roundData: Level1RoundDataObject = {
                round: this.round,
                id: index,
                playerIds: col.playerIds
              };
              this.level1RoundData.push(roundData);
              col.isPicked = true;
              this.addUnavailableIndexes(col.playerIds);
              this.setRowsAndColumnsAvailability(this.level1Array, col.playerIds, false);
              rowProcessingIsNotComplete = false;
              break;
            }
          }
        }
      });
      // console.log('PairingArray, index = ', index);
      // console.table(pairingArray);
    }

    // console.log('Round data');
    // console.table(this.level1RoundData);
    // console.log('Player data');
    // console.table(this.myPlayers);
    // console.log('Unavailable Indexes');
    // console.table(this.unavailableIndexes);
    // console.log('Level1Array');
    // console.table(this.level1Array);
  }

  schedulePLayers() {
    this.initialize();
    for (let nbrOfRounds = 0; nbrOfRounds < this.nbrOfPlayers - 1; nbrOfRounds++) {
      this.round++;
      this.setRowsAndColumnsAvailability(this.level1Array, this.unavailableIndexes, true);
      this.unavailableIndexes.length = 0;
      this.byeList.length = 0;
      this.processRound();
    }
    console.log('Level1Array');
    console.table(this.level1Array);
  }
}
