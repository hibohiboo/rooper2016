import { Character } from '../models/character';
export const CHARACTERS: Character[] = function(){
  var chars:any = [
    {"id": 11, "name": "男子学生", "paranoia_limit": 2},
    {"id": 12, "name": "女子学生", "paranoia_limit": 3},
    {"id": 13, "name": "お嬢様",   "paranoia_limit": 1},
    {"id": 14, "name": "委員長",   "paranoia_limit": 2}
  ];
  for(let i=0,len=chars.length;i<len;i++){
    chars[i].selected = false;
  }
  return chars;
}();