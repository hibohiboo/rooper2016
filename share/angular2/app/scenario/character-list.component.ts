import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character';
import { Scenario } from '../models/scenario';
import { CharacterService } from '../services/character.service';
import { CharacterDetailComponent } from './character-detail.component';

// import '../../assets/css/styles.css';
@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  directives: [CharacterDetailComponent]
})
export class CharacterListComponent {
  @Input() scenario:Scenario;
  @Output() onSet = new EventEmitter<boolean>();

  title = 'キャラクター選択';
  characters: Character[];
  selectedCharacter: Character;
  // selectedCharacters: Character[];
  constructor(private characterService: CharacterService) {  }
  
  /**
   * キャラクターを取得する。
   */
  getCharacters() {
    this.characterService.getCharacters().then(characters => {
      this.characters = characters;
      this.initCharacters();
    });
  }

  /**
   * 初期キャラクターを設定する。
   */
  initCharacters(){
      this.scenario.initCharacters(this.characters);
  }
  /**
   * 初期化。キャラクター取得。
   */
  ngOnInit() {
    this.getCharacters();
  }

  onSelect(character: Character) {
    this.selectedCharacter = character;

    // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
    this.scenario.toggleCharacter(character);

    // 設定完了を通知
    this.onSet.emit(true);
  }

 }