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
};