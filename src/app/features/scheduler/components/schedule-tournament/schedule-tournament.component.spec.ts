import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTournamentComponent } from './schedule-tournament.component';

describe('ScheduleTournamentComponent', () => {
  let component: ScheduleTournamentComponent;
  let fixture: ComponentFixture<ScheduleTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
