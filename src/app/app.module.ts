import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleGeneratorComponent } from './components/schedule-generator/schedule-generator.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { ScheduleEntryComponent } from './components/schedule-entry/schedule-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleGeneratorComponent,
    HelpComponent,
    HomeComponent,
    ScheduleEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
