import { Component, Input } from '@angular/core';
import { Character, IllegularCharacter } from '../models/character';
import { TragedySet } from '../models/tragedySet';
import { Scenario } from '../models/scenario';
/**
 * 選択中のキャラクターに役職を設定するクラス
 */
@Component({
  selector: 'character-role-list',
  template: `
    <h2>{{title}}</h2>
    <p>キャラクターに役職を割り振ってください。</p>
        <ul class="characters">
          <li *ngFor="let character of scenario.selectedCharacters">
            {{character.name}}
            <select *ngIf="character.id !== 11">
              <option (click)="onSelect(character,role, true)">
                パーソン
              </option>
              <option *ngFor="let role of unallocateList"
                      (click)="onSelect(character, role, false)">
                {{role.name}}
              </option>
              <option *ngIf="character.role"
                      selected>
                {{character.role.name}}
              </option>
            </select>
            <select *ngIf="character.isIllegular">
              <option *ngFor="let role of character.roleList"
                       (click)="onSelect(character, role, false)">
                {{role.name}}
              </option>
            </select>
          </li>
        </ul>
    `,
  //       <ul *ngIf="scenario.selectedRoleList">
  //         <li *ngFor="let role of scenario.selectedRoleList">
  //           {{role.name}} | {{role.selected}}
  //         </li>
  //       </ul>

  //       <ul *ngIf="unallocateList">
  //         <li *ngFor="let role of unallocateList">
  //           {{role.name}} | {{role.selected}}
  //         </li>
  //       </ul>
  // `,
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

  /**
   * 変数初期化
   */
  ngOnInit() {
    this.unallocateList =[];
  }
  /**
   * 役職を初期化する。
   */
  initCharactersRoles(){
    this.scenario.selectedCharacters.forEach(character=>{
      // イレギュラー処理
      if( character instanceof IllegularCharacter ){
        character.initRole(this);
      }else{
        character.initRole();
      }
    });
  }
  /**
   * 役職一覧を更新する。
   */
  setRoleList(){
    this.unallocateList = this.scenario.selectedRoleList;
    this.initCharactersRoles();
  }

  /**
   * キャラクターに役職を付与する。
   */
  onSelect(character, role, isPerson){
    character.addRole(role, isPerson);
    this.unallocateList = this.scenario.selectedRoleList
                              .filter(r => r.selected===false);
  }
}