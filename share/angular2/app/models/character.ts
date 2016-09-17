export class Character {
  constructor(public id:number, 
               public name:string, 
               public paranoia_limit:number, 
               public selected:boolean=false,
               public role:any=null){
  }

  /**
   * 役職を初期化する。
   * 継承用に引数を一つ設定。
   */
  initRole(scenario = null):void{
    if (this.role) {
      this.role.selected = false;
    }
    this.role = null;
  }

  /**
   * 役職を追加する。
   */
  addRole(role, isPerson):void{
    if(this.role) {
      this.role.selected = false;
    }

    // パーソンを選択した場合は役職リセット
    if(isPerson){
      this.role = null;
    }else{
      role.selected = true;
      this.role = role;
    }
  }
}

export class IllegularCharacter extends Character{
  constructor(public id, 
              public name, 
              public paranoia_limit:number, 
              public selected=false,
              public role=null, 
              public roleList:any=[],
              public isIllegular = true){
    super(id, name, paranoia_limit, selected, role);
  }

  /**
   * オーバーロード
   * イレギュラー用の役職リストを作成。
   * 役職のリセット。役職リストの1つ目の役職を選択。
   */
  initRole(scenario){
    super.initRole();
    this.roleList = scenario
                    .selectedSet
                    .role_list
                    .filter(role => -1 === scenario
                                          .selectedRoleList
                                          .findIndex(r=>r.id === role.id));
    this.role = this.roleList[0];
    this.role.selected = true;
  }
}