import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEntryComponent } from './schedule-entry.component';

describe('ScheduleEntryComponent', () => {
  let component: ScheduleEntryComponent;
  let fixture: ComponentFixture<ScheduleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
