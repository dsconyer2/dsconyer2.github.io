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
  courtHeaders: string[] = [];

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
    this.isScheduleTypeKing = this.schedulerSettings.schedulerType === 'King';
    this.nbrOfPlayers = this.schedulerSettings.nbrOfPlayers;
    this.nbrOfCourts = this.schedulerSettings.nbrOfCourts;
    this.playersPerCourt = this.schedulerSettings.nbrOfPlayersPerCourt;

    this.myPlayers.forEach(aPlayer => this.playerList1.push(aPlayer));
    // console.log('My Players = ', this.myPlayers);
    // console.table(this.myPlayers);
    // console.log('Player List 1 = ', this.playerList1);
    // console.table(this.playerList1);
    this.useEvenPlayerLogic = (this.playerList1.length % 2 === 0);
    if (this.isScheduleTypeKing) {
      this.nbrOfByePlayers = this.nbrOfPlayers -
                  (this.nbrOfCourts * this.playersPerCourt);
      this.courtHeaders.push('Round');
      for (let index = 1; index < this.nbrOfCourts + 1; index++) {
        const header = 'Court ' + index;
        this.courtHeaders.push(header);
      }
      this.courtHeaders.push('Byes');
    } else {
      if (this.useEvenPlayerLogic) {
        this.nbrOfByePlayers = 0;
      } else {
        this.nbrOfByePlayers = 1;
      }
    }
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
      const thisRound: RoundData = { roundId: rounds, matches: [], byes: [], byeLabel: ''};
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
                  matchLabel: '',
                  team1: [this.playerList1[index],
                  this.playerList2[index]],
                  team2: [],
                  matchPriority: {},
                  courtPriority: {},
                  courtAssigned: 0,
                  opponentsAssigned: false,
                  isPrimary: false});
            } else {
              thisRound.matches.push(
                {matchId: index,
                  matchLabel: (' ' + this.playerList1[index].playerId + ' v ' + this.playerList2[index].playerId),
                  team1: [this.playerList1[index]],
                  team2: [this.playerList2[index]],
                  matchPriority: {},
                  courtPriority: {},
                  courtAssigned: 0,
                  opponentsAssigned: true,
                  isPrimary: true});
            }
        }
      }
      this.rounds.push(thisRound);

      // console.log('Calling schedule opponents');
      if (this.isScheduleTypeKing) {
        this.scheduleOpponents(thisRound);
        this.removeNonPrimaryMatches(thisRound);
        this.scheduleCourts(thisRound);
        this.updateMatchLabels(thisRound);
        this.updateByeLabels(thisRound);
      }

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

  removeNonPrimaryMatches(aRound: RoundData) {
    aRound.matches = aRound.matches.filter(m => m.isPrimary);
  }

  updateMatchLabels(aRound: RoundData) {
    aRound.matches.forEach(aMatch => {
      let matchLabel = ' ';
      aMatch.team1.forEach(aPlayer => matchLabel += (aPlayer.playerId + ', '));
      matchLabel = matchLabel.slice(0, matchLabel.length - 2);
      matchLabel += '  vs  ';
      aMatch.team2.forEach(aPlayer => matchLabel += (aPlayer.playerId + ', '));
      matchLabel = matchLabel.slice(0, matchLabel.length - 2);
      aMatch.matchLabel = matchLabel;
    });
  }

  updateByeLabels(aRound: RoundData) {
    let byeLabel = ' ';
    aRound.byes.forEach(aByePlayer => {
      byeLabel += (aByePlayer.playerId + ', ');
    });
    byeLabel = byeLabel.slice(0, byeLabel.length - 2);
    aRound.byeLabel = byeLabel;
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
            aMatch.isPrimary = true;
            aMatch.opponentsAssigned = true;
            oppMatch.opponentsAssigned = true;
            aMatch.team2 = oppMatch.team1;
            oppMatch.team2 = aMatch.team1;
            this.updateMatchPlayedAgainst(aMatch);
            // console.log('Match id = ', aMatch.matchId);
            // console.table(aMatch.matchPriority);
          }
      });
  }

  scheduleOpponents(aRound: RoundData) {
    // console.log('scheduleOpponents');
    this.prioritizeMatches(aRound);
    this.pickOpponents(aRound);
  }

  teamCountCourt(team: Player[], courtNbr: number) {
    let teamCourtCount = 0;
    team.forEach(aPlayer => {
      const playerCourtCount = aPlayer.courtsPlayed[courtNbr];
      if (playerCourtCount) {
        teamCourtCount += playerCourtCount;
      }
    });
    return teamCourtCount;
  }

  prioritizeCourts(aRound: RoundData) {
    for (let courtNbr = 1; courtNbr < this.nbrOfCourts + 1; courtNbr++) {
      aRound.matches.forEach(aMatch => {
        if (aMatch.isPrimary) {
          let matchCourtCount = 0;
          matchCourtCount += this.teamCountCourt(aMatch.team1, courtNbr);
          matchCourtCount += this.teamCountCourt(aMatch.team2, courtNbr);
          aMatch.courtPriority[courtNbr] = matchCourtCount;
        }
      });
    }
  }

  playerUpdateCourtCount(aPlayer: Player, courtNbr: number) {
    let count = 1;
    const playerCount = aPlayer.courtsPlayed[courtNbr];
    // console.log('Player', aPlayer.playerId, ' Court ', courtNbr, ' Count = ', playerCount);
    if (!isNaN(playerCount)) {
      count += playerCount;
    }
    aPlayer.courtsPlayed[courtNbr] = count;
    // console.log('Player court counts');
    // console.table(aPlayer.courtsPlayed);
  }

  assignCourtToMatch(aMatch: Match, courtNbr: number) {
    aMatch.courtAssigned = courtNbr;
    aMatch.team1.forEach(aPlayer => {
      this.playerUpdateCourtCount(aPlayer, courtNbr);
    });
    aMatch.team2.forEach(aPlayer => {
      this.playerUpdateCourtCount(aPlayer, courtNbr);
    });
    // console.log('CourtAssigned = ', courtNbr);
    // console.table(aMatch.courtPriority);
  }

  minCourtPriority(aMatch: Match) {
    let leastCount = this.nbrOfPlayers * 2;
    // tslint:disable-next-line:forin
    for (const courtId in aMatch.courtPriority) {
      const courtCount = aMatch.courtPriority[courtId];
      if (!isNaN(courtCount) && courtCount <= leastCount) {
        leastCount = courtCount;
      }
    }
    return leastCount;
  }

  pickCourts(aRound: RoundData) {
    for (let courtNbr = 1; courtNbr < this.nbrOfCourts + 1; courtNbr++) {
      let matchAssigned: Match;
      let leastCount = this.nbrOfPlayers * 2;
      const orderedMatches = aRound.matches.filter(m => m.isPrimary && m.courtAssigned === 0 )
                        .sort((a, b) => this.minCourtPriority(a) - this.minCourtPriority(b));
      orderedMatches.forEach(aMatch => {
          if (matchAssigned === undefined) {
            matchAssigned = aMatch;
          }
          // tslint:disable-next-line:forin
          // for (const courtId in aMatch.courtPriority) {
          const courtCount = aMatch.courtPriority[courtNbr];
          if (!isNaN(courtCount) && courtCount <= leastCount) {
              leastCount = courtCount;
              matchAssigned = aMatch;
            }
          // }
          // console.log('Match id = ', aMatch.matchId);
          // console.log('Court = ', courtNbr);
          // console.log('Least Count = ', leastCount);
          // console.table(aMatch.courtPriority);

      });
      // console.log('Match ', matchAssigned.matchId, ' assigned to court ', courtNbr);
      this.assignCourtToMatch(matchAssigned, courtNbr);
    }
  }

  scheduleCourts(aRound: RoundData) {
    this.prioritizeCourts(aRound);
    this.pickCourts(aRound);
  }

  runAnalysisReport() {
    console.log('Tournament type is King = ', this.isScheduleTypeKing);
    this.rounds.forEach(aRound => {
      console.log('Round = ', aRound.roundId);
      console.log('Matches');
      aRound.matches.forEach(aMatch => {
        if (aMatch.isPrimary) {
          const team1 = aMatch.team1.reduce((a, c) => {a = a + c.playerId + ', '; return a; }, '');
          const team2 = aMatch.team2.reduce((a, c) => {a = a + c.playerId + ', '; return a; }, '');
          console.log(team1, ' v ', team2, '  on Court ', aMatch.courtAssigned);
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
