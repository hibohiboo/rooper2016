import { Component, Input } from '@angular/core';
import {Character} from '../models/character';
import { CharacterService } from '../services/character.service';
import { MastermindCardComponent } from '../mastermind-card';
// import '../../assets/css/styles.css';
@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterService]
  ,directives: [MastermindCardComponent]
})
export class CharacterListComponent {
  title = '脚本作成';
  characters: Character[];
  selectedCharacter: Character;
  selectedCharacters: Character[];
  constructor(private characterService: CharacterService) {  }
  getCharacters() {
    this.characterService.getCharacters().then(characters => this.characters = characters);
  }
  ngOnInit() {
    this.getCharacters();
    this.selectedCharacters = [];
  }
  onSelect(character: Character) {
       this.selectedCharacter = character;
       this.selectedCharacters.push(character);
  }

 }