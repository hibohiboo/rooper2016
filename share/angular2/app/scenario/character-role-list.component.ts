import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
import { TragedySet } from '../models/tragedySet';
import { Scenario } from '../models/scenario';

@Component({
  selector: 'character-role-list',
  template: `
    <h2>{{title}}</h2>
    <p>キャラクターに役職を割り振ってください。</p>
        <ul class="characters">
          <li *ngFor="let character of scenario.selectedCharacters">
            {{character.name}}
            <select *ngIf="character.id !== 11">
              <option>パーソン</option>
              <option *ngFor="let role of unallocateList">
                {{role.name}}
              </option>
            </select>
            <select *ngIf="character.id === 11">
              <option *ngFor="let role of irregularList">
                {{role.name}}
              </option>
            </select>
          </li>
        </ul>
  `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class CharacterRoleListComponent {
  title = '役職選択';
  @Input() scenario:Scenario;
  unallocateList:any;
  irregularList:any;

  ngOnInit() {
    this.unallocateList =[];
    this.irregularList = [];
  }

  setRoleList(){
    this.unallocateList = this.scenario.selectedRoleList;
    this.irregularList = this.scenario.selectedSet.role_list
                               .filter(role => -1 === this.scenario.selectedRoleList
                                                          .findIndex(r=>r.id===role.id));
  }
}