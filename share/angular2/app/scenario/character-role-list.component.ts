import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
import { TragedySet } from '../models/tragedySet';

@Component({
  selector: 'character-role-list',
  template: `
    <h2>{{title}}</h2>
    <p>キャラクターに役職を割り振ってください。</p>
        <ul class="characters">
          <li *ngFor="let character of characters">
            {{character.name}}
          </li>
        </ul>
  `,
  styles: [`
    .selected {
      font-weight:bold;
    }
  `]
})
export class CharacterRoleListComponent {
  title = '役職選択';
  @Input() characters: Character[];
  @Input() tragedySet: TragedySet;
}