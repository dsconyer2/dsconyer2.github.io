import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Match, Player, RoundData, SchedulerSettings } from '../../models';
import { SchedulerState } from '../../reducers';


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
  useEvenPlayerLogic = false;
  isScheduleTypeKing = true;

  rounds: RoundData[] = [];

  constructor(private store: Store<SchedulerState>) { }

  ngOnInit() {
    this.schedulePLayers();
  }

  createByePlayer(playerId: number) {
    return {
      playerId,
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
    console.log('My Players = ', this.myPlayers);
    console.table(this.myPlayers);
    console.log('Player List 1 = ', this.playerList1);
    console.table(this.playerList1);
    this.useEvenPlayerLogic = (this.playerList1.length % 2 === 0);
  }


  processRounds() {
    let indexBreak: number = Math.trunc(this.playerList1.length / 2);
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

    const byeIndexes = [];
    if (this.nbrOfByePlayers > 0) {
        const byesNeeded = Math.round(this.nbrOfByePlayers / 2);
        const byeIncrement = indexBreak / byesNeeded;
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
      // Gather data for the round.
      const thisRound: RoundData = { roundId: rounds, matches: [], byes: []};
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
              // console.log('Adding King match');
              // console.table([this.playerList1[index],
                // this.playerList2[index]]);
              thisRound.matches.push(
                {matchId: index,
                  team1: [this.playerList1[index],
                  this.playerList2[index]],
                  team2: [],
                  matchPriority: [],
                  opponentsAssigned: false,
                  primary: false});
            } else {
              thisRound.matches.push(
                {matchId: index,
                  team1: [this.playerList1[index]],
                  team2: [this.playerList2[index]],
                  matchPriority: [],
                  opponentsAssigned: true,
                  primary: true});
            }
        }
      }
      this.rounds.push(thisRound);

      // console.log('Calling schedule opponents');
      if (this.isScheduleTypeKing) {this.scheduleOpponents(thisRound); }

      // rotate player lists
      this.playerList1.push(this.playerList2.pop());
      let newList: Player[] = [];
      if (this.useEvenPlayerLogic) {
        newList = this.playerList1.splice(1, 1);
      } else {
        newList = this.playerList1.splice(0, 1);
      }

      this.playerList2 = newList.concat(this.playerList2);
    }


  }

  countPlayedAgainst(aPlayer: Player, opponents: Player[]) {
    let playCount = 0;
    opponents.forEach(anOpponent => {
      const oppCount: number = aPlayer.playedAgainst[anOpponent.playerId];
      // console.log('aPlayer id = ', aPlayer.playerId);
      // console.log('OppCount = ', oppCount);
      // console.table(aPlayer.playedAgainst);
      if (oppCount) { playCount += oppCount; }
    });
    return playCount;
  }

  updateMatchPriority(aMatch: Match, secondMatch: Match, playCount: number) {
    let matchCount: number = aMatch.matchPriority[secondMatch.matchId];
    // console.log('aMatch = ', aMatch.matchId);
    // console.log('2Match = ', secondMatch.matchId);
    // console.log('PlayCount = ', playCount);
    // console.log('MatchCount = ', matchCount);
    if (matchCount) {
      matchCount += playCount;
      aMatch.matchPriority[secondMatch.matchId] = matchCount;
    } else {
      aMatch.matchPriority[secondMatch.matchId] = playCount;
    }
  }

  prioritizeMatches(aRound: RoundData) {
      aRound.matches.forEach(aMatch => {
        aMatch.team1.forEach(aPlayer => {
          aRound.matches.forEach(secondMatch => {
            if (secondMatch.matchId !== aMatch.matchId) {
              const playCount = this.countPlayedAgainst(aPlayer, secondMatch.team1);
              this.updateMatchPriority(aMatch, secondMatch, playCount);
            }
          });
        });
      });
  }

  updateMatchPlayedAgainst(aMatch: Match) {
    this.updateTeamPlayedAgainst(aMatch.team1, aMatch.team2);
    this.updateTeamPlayedAgainst(aMatch.team2, aMatch.team1);
  }

  updateTeamPlayedAgainst(teamA: Player[], teamB: Player[]) {
    teamA.forEach(aPlayer => {
      teamB.forEach(opponent => {
        const playedEntry: number = aPlayer.playedAgainst[opponent.playerId];
        // console.log('PlayedEntry = ', playedEntry);
        if (playedEntry) {
          aPlayer.playedAgainst[opponent.playerId] = (playedEntry + 1);
        } else {
          aPlayer.playedAgainst[opponent.playerId] = 1;
        }
      });
    });
  }

  getPriorityMatch(aMatch: Match, matches: Match[]) {
    let highCount = this.nbrOfPlayers * 2;
    let priorityMatch;
    // tslint:disable-next-line:forin
    for (const matchId in aMatch.matchPriority) {
      const matchCount = aMatch.matchPriority[matchId];
      const oppMatch = matches.find(m => m.matchId === parseInt(matchId, 10));
      if (!oppMatch) {console.log('Match not found = ', matchId); }
      if ((!oppMatch.opponentsAssigned) && matchCount <= highCount) {
        highCount = matchCount;
        priorityMatch = oppMatch;
      }
    }
    return priorityMatch;
  }

  pickOpponents(aRound: RoundData) {
      console.log('Match Round = ', aRound.roundId);
      aRound.matches.forEach(aMatch => {
          if (!aMatch.opponentsAssigned) {
            const oppMatch = this.getPriorityMatch(aMatch, aRound.matches);
            aMatch.primary = true;
            aMatch.opponentsAssigned = true;
            oppMatch.opponentsAssigned = true;
            aMatch.team2 = oppMatch.team1;
            oppMatch.team2 = aMatch.team1;
            this.updateMatchPlayedAgainst(aMatch);
            console.log('Match id = ', aMatch.matchId);
            console.table(aMatch.matchPriority);
          }
      });
  }

  scheduleOpponents(aRound: RoundData) {
    console.log('scheduleOpponents');
    this.prioritizeMatches(aRound);
    this.pickOpponents(aRound);
  }

  runAnalysisReport() {
    console.log('Tournement type is King = ', this.isScheduleTypeKing);
    this.rounds.forEach(aRound => {
      console.log('Round = ', aRound.roundId);
      console.log('Matches');
      aRound.matches.forEach(aMatch => {
        if (aMatch.primary) {
          const team1 = aMatch.team1.reduce((a, c) => {a = a + c.playerId + ', '; return a; }, '');
          const team2 = aMatch.team2.reduce((a, c) => {a = a + c.playerId + ', '; return a; }, '');
          console.log(team1, ' v ', team2);
        }
      });
      console.log('Byes');
      let byeString = '';
      aRound.byes.forEach(aBye => {
        byeString += aBye.playerId + ', ';
      });
      console.log(byeString);
    });
    console.log('My Players = ', this.myPlayers);

  }


  schedulePLayers() {
    this.initialize();
    this.processRounds();
    this.runAnalysisReport();
  }

}
