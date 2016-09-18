import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Scenario } from '../models/scenario';
import { TragedySet } from '../models/tragedySet';

/**
 * シナリオにルールとルールから選択される役職を追加するクラス。
 */
@Component({
  selector: 'plot-list',
  template: `
    <h2>ルール選択</h2>
    <div  *ngIf=scenario.selectedSet>
      <p>ルールYから１つ選んでください</p>
      <ul class="list">
        <li *ngFor="let plot of plotY_list"
          [class.selected]="plot === selectedPlotY"
          (click)="onSelectPlotY(plot)">
          {{plot.name}}
        </li>
      </ul>

      <p>ルールXから{{scenario.selectedSet.subplotNum}}つ選んでください</p>
      <ul class="list">
        <li *ngFor="let plot of plotX_list"
          [class.selected]="plot.selected === true"
          (click)="onSelectPlotX(plot)">
          {{plot.name}}
        </li>
      </ul>

      <p>選択中のルール</p>
      <ul class="list">
        <li *ngFor="let plot of selectedplotList">
          {{plot.name}}
        </li>
      </ul>

      <p>ルールによって追加される役職</p>
      <ul class="list">
        <li *ngFor="let role of scenario.selectedRoleList">
          {{role.name}}
        </li>
      </ul>
      `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class PlotListComponent {
  title = 'ルール選択';
  @Input() scenario:Scenario;
  @Output() onSet = new EventEmitter<boolean>();
  plotY_list:any;
  plotX_list:any;
  selectedPlotY: any;
  selectedPlotX_list:any;
  selectedplotList:any;

  ngOnInit() {
    this.scenario.selectedPlotList=[];
    this.scenario.selectedRoleList=[];
    this.selectedplotList=[];
    this.selectedPlotX_list=[];
  }

  setPlotList() {
      this._setPlotList();
  }

  onSelectPlotY(plot: any) { 
    this.selectedPlotY = plot;
    this._setPlot();
  }

  /**
   * ルールXを選択する。
   */
  onSelectPlotX(plot: any) { 
    // すでに選択されているルールだった場合、選択を解除する。
    let checkIndex = this.selectedPlotX_list.findIndex(elm=>elm.name === plot.name);
    if( checkIndex !== -1){
      this.selectedPlotX_list.splice(checkIndex, 1);
      plot.selected = false;
      this._setPlot();
      return;
    }
    if(this.selectedPlotX_list.length === this.scenario.selectedSet.subplotNum){
      let before_plot = this.selectedPlotX_list.pop();
      before_plot.selected = false;
    }
    plot.selected = true;
    this.selectedPlotX_list.push(plot);
    this._setPlot();
  }

  /**
   * 役職一覧・ルール一覧の作成
   */
  _setPlot(){
    // ルール一覧の作成
    this.selectedplotList = this.selectedPlotY ? [this.selectedPlotY].concat(this.selectedPlotX_list)
                                                : this.selectedPlotX_list;
    this.scenario.selectedPlotList = this.selectedplotList;
    // 役職一覧の作成。
    this._initRoleList();

    this.onSet.emit(true);
  }

  /**
   * 役職一覧の初期化
   */
  _initRoleList(){
    this.scenario.selectedRoleList =[];
    this.selectedplotList.forEach(plot=>{
      let roleList = plot.roles.forEach(role_name=>{
        let role = this.scenario.selectedSet.roleList.find(role=>role.name === role_name);
        // 役職の上限を超えていなければ役職リストに追加
        if( ! role.limit || role.limit > this.scenario
                                             .selectedRoleList
                                             .filter( role => role.name === role_name )
                                             .length){
          let copy = Object.assign({}, role);
          this.scenario.selectedRoleList.push(copy);
        }
      });
    });    
  }

  /**
   * ルールXとルールYを惨劇セットから定義
   */
  _setPlotList(){
    if(this.scenario.selectedSet){
      this.plotY_list = this.scenario.selectedSet.plotList.filter(plot=>plot.type==='M');
      this.plotX_list = this.scenario.selectedSet.plotList.filter(plot=>plot.type==='S');
    }
  }
}