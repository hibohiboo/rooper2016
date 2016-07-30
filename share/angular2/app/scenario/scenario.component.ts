import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { CharacterListComponent } from './character-list.component';
//import { MastermindCardComponent } from '../mastermind-card';
// import '../../assets/css/styles.css';
@Component({
  selector: 'scenario',
  templateUrl: './scenario.component.html',
 // styleUrls: ['./scenario.component.css'],
  providers: [CharacterService],
  directives: [CharacterListComponent]
})
export class ScenarioComponent {
  title = '脚本作成';
  // characters: Character[];
  // selectedCharacter: Character;
  // constructor(private characterService: CharacterService) { }
  // getCharacters() {
  //   this.characterService.getCharacters().then(characters => this.characters = characters);
  // }
  // ngOnInit() {
  //   this.getCharacters();
  // }
  // onSelect(character: Character) { this.selectedCharacter = character; }

 }