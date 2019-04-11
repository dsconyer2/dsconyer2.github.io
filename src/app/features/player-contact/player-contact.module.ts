import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerContactComponent } from './player-contact.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { GroupManagerComponent } from './components/group-manager/group-manager.component';
import { GroupPlayerManagerComponent } from './components/group-player-manager/group-player-manager.component';
import { GroupInfoComponent } from './components/group-info/group-info.component';

@NgModule({
  declarations: [PlayerContactComponent, ContactInfoComponent, GroupManagerComponent, GroupPlayerManagerComponent, GroupInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('playerContactFeature', reducers),
  ],
  exports: [PlayerContactComponent]
})
export class PlayerContactModule { }
