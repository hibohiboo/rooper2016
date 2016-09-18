import { Component, Input } from '@angular/core';
import { Scenario} from '../models/scenario';
import { Character } from '../models/character';

/**
 * 
 */
@Component({
  selector: 'incident-list',
  template: `
    <h2>{{title}}</h2>
    <p>事件を選択してください</p>
    <ul *ngIf="scenario">
      <li *ngFor="let day of scenario.dayList">
        {{day.date}}
        <select *ngIf="scenario.selectedSet">
          <option (click)="setIncident(day, incident, true)">事件なし</option>
          <option *ngFor="let incident of scenario.selectedSet.incidentList"
                  (click)="setIncident(day, incident, false)">
            {{incident.name}}
          </option>
        </select>
        <select *ngIf="day.incident">
          <option (click)="setCulprit(day, null, true)">
            未設定
          </option>
          <option *ngFor="let char of unallocatedCharacterList"
                  (click)="setCulprit(day, char, false)">
            {{char.name}}
          </option>
          <option *ngIf="day.culprit" selected>
            {{day.culprit.name}}
          </option>
        </select>
      </li>
    </ul>
  `
})
export class IncidentListComponent {
  title = '事件選択';
  @Input() scenario:Scenario;

  constructor() {  }
  unallocatedCharacterList:any;

  /**
   * 変数初期化
   */
  ngOnInit() {
    this.unallocatedCharacterList =[];
  }

  /**
   * 事件選択
   */
  setIncident(day, incident, isDelete){
    if (isDelete) {
      delete day.incident;
      this.setCulprit(day, day.culprit, true);
    } else {
      let copy = Object.assign({}, incident);
      day.incident = copy;
    }
  }

  /**
   * 
   */
  setCulprit(day, char, isDelete){
    if(isDelete){
      delete day.culprit;
    }else{
      day.culprit = char;
    }
    this.setCharacterList();
  }

  /**
   * 犯人候補のキャラクター一覧を更新する。
   */
  setCharacterList(){
    this.unallocatedCharacterList = this.scenario
                                        .selectedCharacters
                                        .filter(this.unallocatedCharacterFilter
                                                    .bind(this));
    
    // 選択されていないキャラクターが犯人になっている場合削除する。
    this.scenario.dayList.forEach(day=>{
      if(day.culprit && -1 === this.scenario
                                   .selectedCharacters
                                   .findIndex(char=>char.id === day.culprit.id )){
        delete day.culprit;
      }
    });
  }
  /**
   * すでに犯人に設定されているキャラ以外のキャラクターを候補とする。
   */
  unallocatedCharacterFilter(char){
    return -1 === this.scenario 
                      .dayList
                      .findIndex(day=> day.culprit &&
                                       day.culprit.id === char.id);
  }
}
