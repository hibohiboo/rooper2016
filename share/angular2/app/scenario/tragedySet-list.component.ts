import { Component, Input, OnChanges } from '@angular/core';
import { Scenario } from '../models/scenario';
import { TragedySet } from '../models/tragedySet';
import { TragedySetService } from '../services/tragedySet.service';


@Component({
  selector: 'tragedySet-list',
  template: `
    <h2>{{title}}</h2>
    <p>使用する惨劇セットを選んでください。</p>
    <ul class="tragedy-sets">
      <li *ngFor="let set of tragedySets"
        [class.selected]="set === selectedSet"
        (click)="onSelect(set)">
        {{set.name}}
      </li>
    </ul>

    <h2>ルール選択</h2>
    <div  *ngIf=selectedSet>
      <p>ルールYから１つ選んでください</p>
      <ul class="list">
        <li *ngFor="let plot of plotY_list"
          [class.selected]="plot === selectedPlotY"
          (click)="onSelectPlotY(plot)">
          {{plot.name}}
        </li>
      </ul>

      <p>ルールXから{{selectedSet.subplot_num}}つ選んでください</p>
      <ul class="list">
        <li *ngFor="let plot of plotX_list"
          [class.selected]="plot.selected === true"
          (click)="onSelectPlotX(plot)">
          {{plot.name}}
        </li>
      </ul>

      <p>選択中のルール</p>
      <ul class="list">
        <li *ngFor="let plot of selectedPlot_list">
          {{plot.name}}
        </li>
      </ul>

      <p>ルールによって追加される役職</p>
      <ul class="list">
        <li *ngFor="let role of selectedRole_list">
          {{role.name}}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class TragedySetListComponent implements OnChanges {
  title = '脚本選択';
  @Input() 
  scenario:Scenario;
  tragedySets: TragedySet[];
  selectedSet: TragedySet;
  plotY_list:any;
  plotX_list:any;
  selectedPlotY: any;
  selectedPlotX_list:any;
  selectedPlot_list:any;
  selectedRole_list:any;

  constructor(private tragedySetService: TragedySetService) {  }
  ngOnInit() {
    this.getTragedySets();
    this.selectedPlot_list=[];
    this.selectedPlotX_list=[];
    this.selectedRole_list=[];
  }

  /**
   * 惨劇セットを取得する。
   */
  getTragedySets(){
    this.tragedySetService.getTragedySets().then(tragedySets => {
      this.tragedySets = tragedySets;
      // 初期セットを設定する。
      this.selectedSet = tragedySets[1];
    });
  }

  /**
   * 惨劇セット選択イベントにバインド
   */
  onSelect(set: TragedySet) { 
    this.selectedSet = set;
    this.scenario.selectedSet = set;
    this._setPlotList();
  }

  onSelectPlotY(plot: any) { 
    this.selectedPlotY = plot;
    this._setPlot();

  }

  onSelectPlotX(plot: any) { 
    // すでに選択されているルールだった場合、選択を解除する。
    let checkIndex = this.selectedPlotX_list.findIndex(elm=>elm.name === plot.name);
    if( checkIndex !== -1){
      this.selectedPlotX_list.splice(checkIndex, 1);
      plot.selected = false;
      this._setPlot();
      return;
    }
    if(this.selectedPlotX_list.length === this.selectedSet.subplot_num){
      let before_plot = this.selectedPlotX_list.pop();
      before_plot.selected = false;
    }
    plot.selected = true;
    this.selectedPlotX_list.push(plot);
    this._setPlot();
  }
  /**
   * 一覧の作成
   */
  _setPlot(){
    // ルール一覧の作成
    this.selectedPlot_list = this.selectedPlotY ? [this.selectedPlotY].concat(this.selectedPlotX_list)
                                                : this.selectedPlotX_list;
    // 役職一覧の作成。
    this.selectedRole_list =[];
    this.selectedPlot_list.forEach(plot=>{
      let role_list = plot.roles.forEach(role_name=>{
        let role = this.selectedSet.role_list.find(role=>role.name === role_name);
        // 役職の上限を超えていなければ役職リストに追加
        if( ! role.limit || role.limit > this.selectedRole_list.filter( role => role.name === role_name ).length){
          this.selectedRole_list.push(role);
        }
      });
    });
  }

  // ngOnChanges(changes:{[propName: string]: SimpleChange}) { 
  // TODO:SimpleChangeがトランスパイル時にnot foundとなる
  ngOnChanges(changes:any) {
    if(changes['selectedSet']){
      this._setPlotList();
    }
  }
  _setPlotList(){
    if(this.selectedSet){
      this.plotY_list = this.selectedSet.plot_list.filter(plot=>plot.type==='M');
      this.plotX_list = this.selectedSet.plot_list.filter(plot=>plot.type==='S');
    }
  }
}