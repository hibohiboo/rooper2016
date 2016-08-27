import { Component } from '@angular/core';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { CharacterListComponent } from './character-list.component';
import { MastermindCardComponent } from '../mastermind-card';

import { TragedySet } from '../models/tragedySet';
import { TragedySetService } from '../services/tragedySet.service';
import { TragedySetListComponent } from './tragedySet-list.component';

import { CharacterRoleListComponent } from './character-role-list.component';
// import '../../assets/css/styles.css';
@Component({
  selector: 'scenario',
  templateUrl: './scenario.component.html',
 // styleUrls: ['./scenario.component.css'],
  providers: [CharacterService, TragedySetService],
  directives: [CharacterListComponent, 
               MastermindCardComponent, 
               TragedySetListComponent,
               CharacterRoleListComponent ]
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
  
  /**
   * キャラクターを取得する。
   */
  getCharacters() {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
      this.setFirstCharacters();
    });
  }

  /**
   * 初期キャラクターを設定する。
   */
  setFirstCharacters(){
      this.selectedCharacters = [];
      for(let i=0;i<3;i++){
        this.characters[i].selected = true;
        this.selectedCharacters.push(this.characters[i]);
      }
  }

  /**
   * 惨劇セットを取得する。
   */
  getTragedySets(){
    this.tragedySetService.getTragedySets().then(tragedySets => {
      this.tragedySets = tragedySets;
      // 初期セットを設定する。
      this.selectedSet = tragedySets[1];
    });
  }

  ngOnInit() {
    this.getCharacters();
    this.getTragedySets();
  }
 }
