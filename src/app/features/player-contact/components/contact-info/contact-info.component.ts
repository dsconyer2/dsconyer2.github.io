import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerContactState } from '../../reducers';
import { PlayerContact } from '../../models';
import { PlayerContactRemoved } from '../../actions/player-contact.actions';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoComponent implements OnInit {

  @Input() contact: PlayerContact;

  constructor(private store: Store<PlayerContactState>) { }

  ngOnInit() {
  }

  removeContact(contact) {
    this.store.dispatch(new PlayerContactRemoved(this.contact.playerContactId));
  }

  // starContact(contact) {
  //   this.store.dispatch(starContact(contact.id));
  // }
}
