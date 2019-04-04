import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerContactComponent } from './player-contact.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';

@NgModule({
  declarations: [PlayerContactComponent, ContactInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('playerContactFeature', reducers),
  ],
  exports: [PlayerContactComponent]
})
export class PlayerContactModule { }
