
import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
@Component({
  selector: 'mastermind-card',
  template: `
  <h2>非公開シート</h2>
  <ul>
    <li>test</li>
    <li *ngFor="let character of characters">
        <span class="badge">{{character.id}}</span> {{character.name}}
    </li>
  </ul>
  `
})
export class MastermindCardComponent {
  @Input()
  characters: Character[];
}