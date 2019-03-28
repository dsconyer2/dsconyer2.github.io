import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScheduleEntryComponent } from './components/schedule-entry/schedule-entry.component';
import { ScheduleTournamentComponent } from './components/schedule-tournament/schedule-tournament.component';
import { SchedulerEffects } from './effects/scheduler.effects';
import { reducers } from './reducers';
import { SchedulerComponent } from './scheduler.component';

@NgModule({
  declarations: [SchedulerComponent, ScheduleEntryComponent, ScheduleTournamentComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forFeature('schedulerFeature', reducers),
    EffectsModule.forFeature([SchedulerEffects])
  ],
  exports: [SchedulerComponent]
})
export class SchedulerModule { }
