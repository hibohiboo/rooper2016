import { TragedySet } from './tragedySet';
import { Character, IllegularCharacter }  from './character';

export class Scenario {
  constructor( public selectedSet: TragedySet = null,
               public selectedPlotList:any = null,
               public paranoia_limit:number = null, 
               public selectedCharacters: Character[] = [],
               public selectedRoleList:any = []){}
};