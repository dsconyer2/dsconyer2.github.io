import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleEntryComponent } from './features/scheduler/components/schedule-entry/schedule-entry.component';
import { ScheduleGeneratorComponent } from './features/scheduler/components/schedule-generator/schedule-generator.component';
import { SchedulerComponent } from './features/scheduler/scheduler.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'scheduler',
    component: SchedulerComponent
  },
  {
    path: 'schedule-entry',
    component: ScheduleEntryComponent
  },
  {
    path: 'schedule-generator',
    component: ScheduleGeneratorComponent
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
