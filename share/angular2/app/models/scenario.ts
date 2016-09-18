import { TragedySet } from './tragedySet';
import { Character, IllegularCharacter }  from './character';

export class Scenario {
  selectedSet: TragedySet;
  selectedCharacters: Character[];
  selectedRoleList:any;

  /**
   * 最初のキャラクターを選択する。
   */
  initCharacters(characterList){
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
  toggleCharacter(character){
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
   * 役職一覧を初期化する。
   */
  initRoleList(selectedPlotList){
    this.selectedRoleList =[];
    selectedPlotList.forEach(plot=>{
      let role_list = plot.roles.forEach(role_name=>{
        let role = this.selectedSet.role_list.find(role=>role.name === role_name);
        // 役職の上限を超えていなければ役職リストに追加
        if( ! role.limit || role.limit > this.selectedRoleList
                                             .filter( role => role.name === role_name )
                                             .length){
          var copy = Object.assign({}, role);
          this.selectedRoleList.push(copy);
        }
      });
    });
  }
};