import { Component, SimpleChanges } from '@angular/core';

import { Scenario} from '../models/scenario';
import { CharacterListComponent } from './character-list.component';
import { MastermindCardComponent } from '../mastermind-card';
import { IncidentListComponent } from './incident-list.component'; 
import { TragedySetListComponent } from './tragedySet-list.component';
import { PlotListComponent } from './plot-list.component';
import { CharacterRoleListComponent } from './character-role-list.component';
// import '../../assets/css/styles.css';

/**
 * 
 */
@Component({
  selector: 'scenario',
  templateUrl: './scenario.component.html',
 // styleUrls: ['./scenario.component.css'],
  directives: [CharacterListComponent, 
               MastermindCardComponent, 
               TragedySetListComponent,
               PlotListComponent,
               CharacterRoleListComponent,
               IncidentListComponent ]
})
export class ScenarioComponent {
  title = '脚本作成';
  scenario:Scenario;

  constructor() {  }

  ngOnInit() {
    this.scenario = new Scenario();
    this.makeDayList();
  }

  /**
   * 日数を変更した時
   */
  onChange(){
    this.makeDayList();
  }

  /**
   * 日数分の日付オブジェクトを作成する。
   */
  makeDayList(){
    if(this.scenario.dayList.length > this.scenario.daysPerLoop){
      while(this.scenario.dayList.length !== this.scenario.daysPerLoop){
        this.scenario.dayList.pop();
      }
    }else{
      while(this.scenario.dayList.length !== this.scenario.daysPerLoop){
        this.scenario.dayList.push({"date":this.scenario.dayList.length+1});
      }
    }
  }
 }
