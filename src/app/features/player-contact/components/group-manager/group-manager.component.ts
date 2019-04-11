import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, GroupPlayer } from '../../models';
import { Store } from '@ngrx/store';
import { selectGroupEntities, PlayerContactState, selectHighestGroupId, selectHighestGroupPlayerId } from '../../reducers';
import { GroupAdded } from '../../actions/group-manager.actions';
import { GroupPlayerCreated } from '../../actions/group-player-actions';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css']
})
export class GroupManagerComponent implements OnInit {
  groups$: Observable<Group[]>;
  lastGroup$: Observable<Group>;
  lastGroupPlayer$: Observable<GroupPlayer>;
  highestId: number;

  constructor(private store: Store<PlayerContactState>) {
   }

  ngOnInit() {
    this.groups$ = this.store.select(selectGroupEntities);
    this.lastGroup$ = this.store.select(selectHighestGroupId);
    this.lastGroupPlayer$ = this.store.select(selectHighestGroupPlayerId);
  }

  addGroup(groupName:string, id:any) { 
    
    this.highestId = 0;
    this.lastGroup$.forEach(aGroup => this.highestId = Math.max(this.highestId, aGroup.groupId))
    const groupId = this.highestId + 1;

    this.highestId = 0;
    this.lastGroupPlayer$.forEach(aGroupPlayer => this.highestId = Math.max(this.highestId, aGroupPlayer.groupPlayerId))
    const playerId = this.highestId + 1;
    const enabledPlayerId = this.highestId + 2;

    console.log('GroupId = ', groupId);
    console.log('GroupName = ', groupName);
    console.log('PlayerId = ', playerId);
    console.log('EnabledPlayerId = ', enabledPlayerId);
    this.store.dispatch(new GroupPlayerCreated(playerId));
    this.store.dispatch(new GroupPlayerCreated(enabledPlayerId));
    this.store.dispatch(new GroupAdded(groupId, groupName, playerId, enabledPlayerId));
  }

}
