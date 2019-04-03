import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerContactComponent } from './player-contact.component';

describe('PlayerContactComponent', () => {
  let component: PlayerContactComponent;
  let fixture: ComponentFixture<PlayerContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
