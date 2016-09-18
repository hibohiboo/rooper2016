import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Scenario } from '../models/scenario';
import { TragedySet } from '../models/tragedySet';

@Component({
  selector: 'plot-list',
  template: `
    <h2 (click)="onClick()">ルール選択</h2>
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
        <li *ngFor="let role of scenario.selectedRoleList">
          {{role.name}}
        </li>
      </ul>
      `,
  //     <p>ルールによって追加されなかった役職</p>
  //     <ul class="list">
  //       <li *ngFor="let role of notSelectedList">
  //         {{role.name}}
  //       </li>
  //     </ul>
  //   </div>
  // `,
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
  selectedSet: TragedySet;
  plotY_list:any;
  plotX_list:any;
  selectedPlotY: any;
  selectedPlotX_list:any;
  selectedPlot_list:any;
  notSelectedList:any;

  onClick(){
      console.log(this.scenario);
  }

  ngOnInit() {
    this.selectedPlot_list=[];
    this.selectedPlotX_list=[];
    this.scenario.selectedRoleList=[];
    this.selectedSet = this.scenario.selectedSet;
  }

  setPlotList() {
      this.selectedSet = this.scenario.selectedSet;
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
    if(this.selectedPlotX_list.length === this.selectedSet.subplot_num){
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
    this.selectedPlot_list = this.selectedPlotY ? [this.selectedPlotY].concat(this.selectedPlotX_list)
                                                : this.selectedPlotX_list;
    // 役職一覧の作成。
    // this.scenario.selectedRoleList =[];
    // this.selectedPlot_list.forEach(plot=>{
    //   let role_list = plot.roles.forEach(role_name=>{
    //     let role = this.selectedSet.role_list.find(role=>role.name === role_name);
    //     // 役職の上限を超えていなければ役職リストに追加
    //     if( ! role.limit || role.limit > this.scenario
    //                                          .selectedRoleList
    //                                          .filter( role => role.name === role_name )
    //                                          .length){
    //       var copy = Object.assign({}, role);
    //       this.scenario.selectedRoleList.push(copy);
    //     }
    //   });
    // });
    this.scenario.initRoleList(this.selectedPlot_list);

    // 選択されていない役職一覧の作成
    this.notSelectedList = this.selectedSet.role_list
                               .filter(role => -1 === this.scenario.selectedRoleList
                                                          .findIndex(r=>r.id===role.id));

    this.onSet.emit(true);
  }

  /**
   * ルールXとルールYを惨劇セットから定義
   */
  _setPlotList(){
    if(this.selectedSet){
      this.plotY_list = this.selectedSet.plot_list.filter(plot=>plot.type==='M');
      this.plotX_list = this.selectedSet.plot_list.filter(plot=>plot.type==='S');
    }
  }
}