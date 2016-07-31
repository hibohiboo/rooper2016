import { Component, Input } from '@angular/core';
import {Character} from '../models/character';
import { CharacterService } from '../services/character.service';
import { CharacterDetailComponent } from './character-detail.component';

// import '../../assets/css/styles.css';
@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  directives: [CharacterDetailComponent]
})
export class CharacterListComponent {
  title = 'キャラクター選択';
  @Input() characters: Character[];
  selectedCharacter: Character;
  @Input() selectedCharacters: Character[];
  constructor(private characterService: CharacterService) {  }

  onSelect(character: Character) {
       this.selectedCharacter = character;

      // キャラクターを選択したらリストに追加。もう一度選択でリストから外す。
       var index = this.selectedCharacters.findIndex((char:Character)=>{return char.id === character.id});

       if( index === -1){
         this.selectedCharacters.push(character);
         character.selected = true;
       }else{
         this.selectedCharacters.splice(index,1);
         character.selected = false;
       }
  }

 }