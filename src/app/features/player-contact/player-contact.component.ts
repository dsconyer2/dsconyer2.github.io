import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlayerContactAdded } from './actions/player-contact.actions';
import Contact from './contact';
import { PlayerContact } from './models';
import { PlayerContactState, selectPlayerContactEntities } from './reducers';

@Component({
  selector: 'app-player-contact',
  templateUrl: './player-contact.component.html',
  styleUrls: ['./player-contact.component.css']
  directives: [Contact]
})
export class PlayerContactComponent implements OnInit {
  contactID: number;
  playerContacts$: Observable<PlayerContact[]>;

	constructor(private store: Store<PlayerContactState>) {
		this.contactID = 0;
	}

  ngOnInit() {
    this.playerContacts$ = this.store.select(selectPlayerContactEntities);
  }

  addContact(contactName) {
    this.store.dispatch(new PlayerContactAdded(this.contactID++, contactName));
  }

}
