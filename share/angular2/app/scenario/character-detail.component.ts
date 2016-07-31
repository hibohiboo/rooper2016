import { Component, Input } from '@angular/core';
import { Character } from '../models/character';
@Component({
  selector: 'character-detail',
  template: `
    <div *ngIf="character">
      <h2>{{character.name}} details!</h2>
      <div>
        <div><span>不安臨界: </span><span>{{character.paranoia_limit}}</span></div>
      </div>
    </div>
  `
})
export class CharacterDetailComponent {
  @Input()
  character: Character;
}