
import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
import { TragedySet } from '../models/tragedySet';
@Component({
  selector: 'mastermind-card',
  template: `
  <h2>非公開シート</h2>
  <div> 
    <div>セット</div>
    <div *ngIf="tragedySet"> 
      {{ tragedySet.name }}
    </div>
  </div>
  <h3>キャラクター</h3>
  <ul>
    <li *ngFor="let character of characters">
        <span class="badge">{{character.id}}</span> {{character.name}}
        
    </li>
  </ul>
  `
})
export class MastermindCardComponent {
  @Input() characters: Character[];
  @Input() tragedySet: TragedySet;
}