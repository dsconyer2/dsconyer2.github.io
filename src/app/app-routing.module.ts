import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleEntryComponent } from './features/scheduler/components/schedule-entry/schedule-entry.component';
import { ScheduleTournamentComponent } from './features/scheduler/components/schedule-tournament/schedule-tournament.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'scheduler',
    component: ScheduleEntryComponent
  },
  {
    path: 'scheduleTournament',
    component: ScheduleTournamentComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
