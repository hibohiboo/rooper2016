import { Component, Input } from '@angular/core';
import { TragedySet } from '../models/tragedySet';

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
  `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class TragedySetListComponent {
  title = '脚本選択';
  @Input() tragedySets: TragedySet[];
  @Input() selectedSet: TragedySet;

  onSelect(set: TragedySet) { this.selectedSet = set;}
}