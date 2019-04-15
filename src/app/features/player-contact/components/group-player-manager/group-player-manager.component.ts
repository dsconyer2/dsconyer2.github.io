import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, PlayerContact, GroupPlayer } from '../../models';
import { Store } from '@ngrx/store';
import { selectGroupEntities, PlayerContactState, selectPlayerContactEntities, selectGroupPlayerEntities } from '../../reducers';
import { GroupPlayerAdded, GroupPlayerRemoved } from '../../actions/group-player-actions';

@Component({
  selector: 'app-group-player-manager',
  templateUrl: './group-player-manager.component.html',
  styleUrls: ['./group-player-manager.component.css']
})
export class GroupPlayerManagerComponent implements OnInit {
  playerContacts$: Observable<PlayerContact[]>;
  groups$: Observable<Group[]>;
  selectedGroup: Group;
  groupPlayers$: Observable<GroupPlayer[]>;
  groupPlayers: GroupPlayer;
  enabledGroupPlayers: GroupPlayer;

  constructor(private store: Store<PlayerContactState>) { }

  ngOnInit() {
    this.playerContacts$ = this.store.select(selectPlayerContactEntities);
    this.groups$ = this.store.select(selectGroupEntities);
    this.groupPlayers$ = this.store.select(selectGroupPlayerEntities);
  }

  updatePlayers() {
    this.store.select(selectGroupPlayerEntities).forEach(entities => 
      entities.forEach(
      aGroupPlayer => {
      if (aGroupPlayer.groupPlayerId === this.selectedGroup.playerIds) {this.groupPlayers = aGroupPlayer};
      if (aGroupPlayer.groupPlayerId === this.selectedGroup.enabledPlayerIds) {this.enabledGroupPlayers = aGroupPlayer};
    }));
  }

  groupSelected() {
    this.updatePlayers();
  }

  enablePlayerClass(player: PlayerContact) {
    if (this.enabledGroupPlayers.players.find(aPlayer => aPlayer === player)) {
      return "fa fa-minus-square fa-2x";
      // return "fa fa-check-square-o fa-2x";
    } else {
      return "fa fa-plus-square fa-2x";
      // return "fa fa-square-o fa-2x";
    }
  }

  toggleEnablePlayer(player: PlayerContact) {
    if (this.enabledGroupPlayers.players.find(aPlayer => aPlayer === player)) {
      this.disablePlayer(player);
    } else {
      this.enablePlayer(player);
    }
  }

  enablePlayer(player: PlayerContact) {
    let players = this.enabledGroupPlayers.players.slice();
    players.push(player);
    this.store.dispatch(new GroupPlayerAdded(this.enabledGroupPlayers.groupPlayerId, players));
  }

  disablePlayer(player: PlayerContact) {
    let players = this.enabledGroupPlayers.players.filter(aPlayer => aPlayer !== player);
    this.store.dispatch(new GroupPlayerRemoved(this.enabledGroupPlayers.groupPlayerId, players));
  }

  addPlayer(player: PlayerContact) {
    let players = this.groupPlayers.players.slice();
    players.push(player);
    this.store.dispatch(new GroupPlayerAdded(this.groupPlayers.groupPlayerId, players));
  }

  removePlayer(player: PlayerContact) {
    let players = this.groupPlayers.players.filter(aPlayer => aPlayer !== player);
    this.store.dispatch(new GroupPlayerRemoved(this.groupPlayers.groupPlayerId, players));
  }

 
}
