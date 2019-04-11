import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPlayerManagerComponent } from './group-player-manager.component';

describe('GroupPlayerManagerComponent', () => {
  let component: GroupPlayerManagerComponent;
  let fixture: ComponentFixture<GroupPlayerManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPlayerManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPlayerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
