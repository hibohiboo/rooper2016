import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { CharacterListComponent } from './character-list.component';
import { MastermindCardComponent } from '../mastermind-card';

import { TragedySet } from '../models/tragedySet';
import { TragedySetService } from '../services/tragedySet.service';
import { TragedySetListComponent } from './tragedySet-list.component';
// import '../../assets/css/styles.css';
@Component({
  selector: 'scenario',
  templateUrl: './scenario.component.html',
 // styleUrls: ['./scenario.component.css'],
  providers: [CharacterService, TragedySetService],
  directives: [CharacterListComponent, 
               MastermindCardComponent, 
               TragedySetListComponent]
})
export class ScenarioComponent {
  title = '脚本作成';
  characters: Character[];
  selectedCharacter: Character;
  selectedCharacters: Character[];
  tragedySets: TragedySet[];
  selectedSet: TragedySet;

  constructor(private characterService: CharacterService, 
              private tragedySetService: TragedySetService) {  }
    
  getCharacters() {
    this.characterService.getCharacters().then(characters => this.characters = characters);
  }

  getTragedySets(){
    this.tragedySetService.getTragedySets().then(tragedySets => this.tragedySets = tragedySets);
  }

  ngOnInit() {
    this.getCharacters();
    this.getTragedySets();
    this.selectedCharacters = [];
  }
 }
