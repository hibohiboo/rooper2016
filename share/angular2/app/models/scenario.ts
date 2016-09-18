import { TragedySet } from './tragedySet';
import { Character, IllegularCharacter }  from './character';

export class Scenario {
  constructor( public selectedSet: TragedySet = null,
               public numberOfLoops:number = 4,
               public daysPerLoop: number = 6,
               public selectedPlotList:any = null,
               public selectedCharacters: Character[] = [],
               public selectedRoleList:any = [],
               public selectedIncidentLists:any = [],
               public dayList=[]
               ){
  
  }
}
