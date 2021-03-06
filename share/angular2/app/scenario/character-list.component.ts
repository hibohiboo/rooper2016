import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../models/character';
import { Scenario } from '../models/scenario';
import { CharacterService } from '../services/character.service';
import { CharacterDetailComponent } from './character-detail.component';

// import '../../assets/css/styles.css';

/**
 * シナリオで使用するキャラクターを選択するクラス。
 */
@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterService],
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
      
       // 設定完了を通知
      this.onSet.emit(true);
    });
  }

  /**
   * 初期キャラクターを設定する。
   */
  initCharacters(){
      this.scenario.selectedCharacters = [];
      for(let i=0;i<9;i++){
        this.characters[i].selected = true;
        this.scenario.selectedCharacters.push(this.characters[i]);
      }
  }
  /**
   * 初期化。キャラクター取得。
   */
  ngOnInit() {
    this.getCharacters();
  }

  /**
   * 
   */
  onSelect(character: Character) {
    this.selectedCharacter = character;

    // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
    this.toggleCharacter(character);

    // 設定完了を通知
    this.onSet.emit(true);
  }
  /**
   * 選択したキャラクターを追加する。
   * もう一度選択でリストから外す。
   */
  toggleCharacter(character){
    // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
    var index = this.scenario
                    .selectedCharacters
                    .findIndex((char:Character)=>char.id === character.id);

    if( index === -1){
      this.scenario.selectedCharacters.push(character);
      character.selected = true;
    }else{
      this.scenario.selectedCharacters.splice(index,1);
      character.selected = false;
    }
  }
 }