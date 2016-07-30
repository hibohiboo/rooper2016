import { Component } from '@angular/core';
import {Character} from '../models/character';
import { CharacterService } from '../services/character.service';
// import '../../assets/css/styles.css';
@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterService]
})
export class CharacterListComponent {
  title = '脚本作成';
  characters: Character[];
  selectedCharacter: Character;
  constructor(private characterService: CharacterService) { }
  getCharacters() {
    this.characterService.getCharacters().then(characters => this.characters = characters);
  }
  ngOnInit() {
    this.getCharacters();
  }
  onSelect(character: Character) { this.selectedCharacter = character; }

 }