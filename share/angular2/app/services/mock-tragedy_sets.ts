import { TragedySet } from '../models/tragedySet';
export const TRAGEDY_SETS: TragedySet[] = function(){
  var sets:TragedySet[] = [
    {"name": "First Step",
      "rules": [
        {"name":"殺人計画", "roles":[""]}
      ]
    },
    {"name": "Basic Tragedy X", "rules":[
        {"name":"殺人計画", "roles":["キラー", "クロマク","キーパーソン"]},
        {"name":"封印されしモノ","roles":["クロマク", "カルティスト"]}
    ]},
    {"name": "Midnight Zone",   "rules":[]}
  ];
  return sets;
}();
