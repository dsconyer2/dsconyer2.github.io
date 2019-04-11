import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlayerContactAdded } from './actions/player-contact.actions';
import { PlayerContact } from './models';
import { PlayerContactState, selectPlayerContactEntities, selectHighestPlayerId } from './reducers';

@Component({
  selector: 'app-player-contact',
  templateUrl: './player-contact.component.html',
  styleUrls: ['./player-contact.component.css']
})
export class PlayerContactComponent implements OnInit {
  contactID: number;
  playerContacts$: Observable<PlayerContact[]>;
  lastPlayerContact$: Observable<PlayerContact>;
  highestId: number;

	constructor(private store: Store<PlayerContactState>) {
	}

  ngOnInit() {
    this.playerContacts$ = this.store.select(selectPlayerContactEntities);
    this.lastPlayerContact$ = this.store.select(selectHighestPlayerId);
  }

  addContact(contactName:string, id:any) { 
    this.highestId = 0;
    this.lastPlayerContact$.forEach(aPlayer => this.highestId = Math.max(this.highestId, aPlayer.playerContactId))
    this.highestId++;
    this.store.dispatch(new PlayerContactAdded(this.highestId, contactName));
  }

}
