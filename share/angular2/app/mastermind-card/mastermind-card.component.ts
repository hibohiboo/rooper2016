
import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
import { TragedySet } from '../models/tragedySet';
import { Scenario } from '../models/scenario';

@Component({
  selector: 'mastermind-card',
  template: `
  <h2>非公開シート</h2>
  <div> 
    <div>セット</div>
    <div *ngIf="scenario.selectedSet"> 
      {{ scenario.selectedSet.name }}
    </div>
  </div>
  <h3>キャラクター</h3>
  <ul>
    <li *ngFor="let character of scenario.selectedCharacters">
        <span class="badge">{{character.id}}</span> 
        {{character.name}}
        |
        <span *ngIf="character.role">{{character.role.name}}</span>
    </li>
  </ul>
  `
})
export class MastermindCardComponent {
  @Input() scenario:Scenario;
}