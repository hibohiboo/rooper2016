import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Scenario } from '../models/scenario';
import { TragedySet } from '../models/tragedySet';
import { TragedySetService } from '../services/tragedySet.service';


@Component({
  providers: [TragedySetService],
  selector: 'tragedySet-list',
  template: `
    <h2>{{title}}</h2>
    <p>使用する惨劇セットを選んでください。</p>
    <ul class="tragedy-sets">
      <li *ngFor="let set of tragedySets"
        [class.selected]="set === scenario.selectedSet"
        (click)="onSelect(set)"
        >
        {{set.name}}
      </li>
    </ul>
  `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class TragedySetListComponent{
  title = '脚本選択';
  @Input()  scenario:Scenario;
  @Output() onSet = new EventEmitter<boolean>();

  tragedySets: TragedySet[];

  constructor(private tragedySetService: TragedySetService) {  }

  ngOnInit() {
    this.getTragedySets();
  }

  /**
   * 惨劇セットを取得する。
   */
  getTragedySets(){
    this.tragedySetService.getTragedySets().then(tragedySets => {
      this.tragedySets = tragedySets;
      // 初期セットを設定する。
      this.scenario.selectedSet = tragedySets[1];
      this.onSet.emit(true);
    });
  }

  /**
   * 惨劇セット選択イベントにバインド
   */
  onSelect(set: TragedySet) { 
    this.scenario.selectedSet=set ;
    this.onSet.emit(true);
  }
}