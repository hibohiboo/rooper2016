import { Character } from '../models/character';
export const CHARACTERS: Character[] = function(){
  var chars:any = [
    {"id": 1,  "name": "男子学生",   "paranoia_limit": 2},
    {"id": 2,  "name": "女子学生",   "paranoia_limit": 3},
    {"id": 3,  "name": "お嬢様",     "paranoia_limit": 1},
    {"id": 4,  "name": "巫女",       "paranoia_limit": 2},
    {"id": 5,  "name": "刑事",       "paranoia_limit": 3},
    {"id": 6,  "name": "サラリーマン", "paranoia_limit": 2},
    {"id": 7,  "name": "情報屋",     "paranoia_limit": 3},
    {"id": 8,  "name": "医者",       "paranoia_limit": 2},
    {"id": 9,  "name": "患者",       "paranoia_limit": 2},
    {"id": 10, "name": "委員長",     "paranoia_limit": 2},
    {"id": 11, "name": "イレギュラー", "paranoia_limit": 3},
    {"id": 12, "name": "異世界人",   "paranoia_limit": 2},
    {"id": 13, "name": "神格",       "paranoia_limit": 3},
    {"id": 14, "name": "アイドル",     "paranoia_limit": 2},
    {"id": 15, "name": "マスコミ",     "paranoia_limit": 2},
    {"id": 16, "name": "大物",       "paranoia_limit": 4},
    {"id": 17, "name": "ナース",      "paranoia_limit": 3},
    {"id": 18, "name": "手先",       "paranoia_limit": 1},
    {"id": 19, "name": "幻想",       "paranoia_limit": 2},
    {"id": 20, "name": "鑑識官",      "paranoia_limit": 3},
    {"id": 21, "name": "A.I.",       "paranoia_limit": 4},
    {"id": 22, "name": "教師",       "paranoia_limit": 2},
    {"id": 23, "name": "転校生",      "paranoia_limit": 2},
    {"id": 24, "name": "軍人",       "paranoia_limit": 2},
    {"id": 25, "name": "黒猫",       "paranoia_limit": 0}
  ];
  for(let i=0,len=chars.length;i<len;i++){
    chars[i].selected = false;
  }
  return chars;
}();