import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from "./components/help/help.component";
import { HomeComponent } from './components/home/home.component';
import { ScheduleEntryComponent } from './components/schedule-entry/schedule-entry.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'schedule-entry',
    component: ScheduleEntryComponent
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
