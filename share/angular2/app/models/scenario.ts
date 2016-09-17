import { TragedySet } from './tragedySet';
import { Character, IllegularCharacter }  from './character';

export class Scenario {
  selectedSet: TragedySet;
  selectedCharacters: Character[];
  selectedRoleList:any;
  /**
   * 役職を初期化する。
   */
  initCharactersRoles(){
    this.selectedCharacters.forEach(character=>{
      // イレギュラー処理
      if( character instanceof IllegularCharacter ){
        character.initRole(this);
      }else{
        character.initRole();
      }
    });
  }

  /**
   * 最初のキャラクターを選択する。
   */
  setFirstCharacters(characterList){
      this.selectedCharacters = [];
      for(let i=0;i<9;i++){
        characterList[i].selected = true;
        this.selectedCharacters.push(characterList[i]);
      }
  }

  /**
   * 選択したキャラクターを追加する。
   * もう一度選択でリストから外す。
   */
  selectCharacter(character){
    // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
    var index = this.selectedCharacters
                    .findIndex((char:Character)=>char.id === character.id);

    if( index === -1){
      this.selectedCharacters.push(character);
      character.selected = true;
    }else{
      this.selectedCharacters.splice(index,1);
      character.selected = false;
    }
  }
};