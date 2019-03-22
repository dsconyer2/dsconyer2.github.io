import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SchedulerState } from '../../reducers';
import { Player, SchedulerSettings, Match, RoundData } from '../../models';


@Component({
  selector: 'app-schedule-tournament',
  templateUrl: './schedule-tournament.component.html',
  styleUrls: ['./schedule-tournament.component.css']
})
export class ScheduleTournamentComponent implements OnInit {

  @Input() myPlayers: Player[];
  @Input() schedulerSettings: SchedulerSettings;

  nbrOfPlayers: number;
  nbrOfCourts: number;
  playersPerCourt: number;
  nbrOfByePlayers: number;

  playerList1: Player[] = [];
  playerList2: Player[] = [];
  useEvenPlayerLogic: boolean = false;
  isScheduleTypeKing: boolean = true;
  
  rounds: RoundData[] = [];
  
  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
    this.schedulePLayers();
  }

  createByePlayer(playerId: number) {
    return {
      playerId: playerId,
      isPlayerAvailable: true,
      isByeAvailable: true,
      byeRound: 0,
      id: (playerId)
    };
   }

  initialize() {
    this.nbrOfPlayers = this.schedulerSettings.nbrOfPlayers;
    this.nbrOfCourts = this.schedulerSettings.nbrOfCourts;
    this.playersPerCourt = this.schedulerSettings.nbrOfPlayersPerCourt;
    this.nbrOfByePlayers = this.nbrOfPlayers -
                  (this.nbrOfCourts * this.playersPerCourt);
    this.myPlayers.forEach(aPlayer => this.playerList1.push(aPlayer));
    // console.log('My Players = ', this.myPlayers);
    // console.table(this.myPlayers);
    // console.log('Player List 1 = ', this.playerList1);
    // console.table(this.playerList1);
    this.useEvenPlayerLogic = (this.playerList1.length % 2 === 0);
  }
  
  
  processRounds() {
    let indexBreak: number = Math.trunc(this.playerList1.length/2);
    // console.log('indexBreak = ', indexBreak);
    if (!this.useEvenPlayerLogic) {
        indexBreak++; 
    }
    this.playerList2 = this.playerList1.slice(indexBreak);
    // for (let index = (indexBreak); index < this.playerList1.length; index++) {
    //   this.playerList2.push(this.playerList1[index]);
    // }
    this.playerList1.length = indexBreak;
  //   console.log('Player list 1');
  //  console.table(this.playerList1);
  //  console.log('Player list 2');
  //  console.table(this.playerList2);

   let byeIndexes = [];
   if (this.nbrOfByePlayers > 0) {
      let byesNeeded = Math.round(this.nbrOfByePlayers/2);
      let byeIncrement = indexBreak /byesNeeded;
      // console.log('Nbr of Bye Players = ', this.nbrOfByePlayers);
      // console.log('Byes Needed = ', byesNeeded);
      // console.log('Index break = ', indexBreak);
      let byeIndex = 0;
      for (let index = 0; index < byesNeeded; index++) {
        byeIndexes.push(Math.trunc((indexBreak - 1) - byeIndex));
        byeIndex = byeIndex + byeIncrement;
      }
   }
  //  console.log('Bye indexes');
  //  console.table(byeIndexes);

   for (let rounds = 0; rounds < this.nbrOfPlayers; rounds++) {
     //Gather data for the round.
     let thisRound: RoundData = { roundId: rounds, matches: [], byes: []};
     for (let index = 0; index < indexBreak; index++) {
      //  console.log('index = ', index);
       if (byeIndexes.includes(index)) {
        //  console.log('bye ', this.playerList1[index].playerId);
         thisRound.byes.push(this.playerList1[index]);
         if (index <= this.playerList2.length - 1) {
          thisRound.byes.push(this.playerList2[index]);
         }
       } else {
        // console.log('match ', this.playerList1[index].playerId);
          if (this.isScheduleTypeKing) {
            thisRound.matches.push({matchId: index, team1:[this.playerList1[index], this.playerList2[index]], team2: []});
          } else {
            thisRound.matches.push({matchId: index, team1:[this.playerList1[index]], team2: [this.playerList2[index]]});
          }
       }
     }
     this.rounds.push(thisRound);

     // rotate player lists
     this.playerList1.push(this.playerList2.pop());
     let newList: Player[] = [];
     if (this.useEvenPlayerLogic) {
       newList = this.playerList1.splice(1,1);
     } else {
      newList = this.playerList1.splice(0,1);
     }
     
     this.playerList2 = newList.concat(this.playerList2);
   }

   if (this.isScheduleTypeKing) {this.scheduleOpponents();}
  }

  scheduleOpponents() {
    let matchPriority = [];
    this.rounds.forEach(aRound => {
      aRound.matches.forEach(aMatch => {
        let matchPriorityEntry = {id:aMatch.matchId , matchList: []}
        aMatch.team1.forEach(aPlayer => {
          aRound.matches.forEach(secondMatch => {
            if (secondMatch.matchId !== aMatch.matchId) {
              let playCount = 0;
              secondMatch.team1.forEach(anOpponent => {
                aPlayer.playedAgainst[anOpponent.playerId]
              })
            }
          })
        })
      })
    })
  }

  runAnalysisReport() {
    this.rounds.forEach(aRound => {
      console.log('Round = ', aRound.roundId);
      // console.log('Matches');
      // aRound.matches.forEach(aMatch => {
      //   console.log(aMatch.team1[0], ' v ', aMatch.team2[0])
      // })
      console.log('Byes');
      let byeString = '';
      aRound.byes.forEach(aBye => {
        byeString += aBye.playerId + ', ';
      })
      console.log(byeString);
    })
  }
  
  
  schedulePLayers() {
    this.initialize();
    this.processRounds();
    this.runAnalysisReport();
  }
  
}
