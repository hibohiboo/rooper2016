import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { CHARACTERS } from './mock-characters';
@Injectable()
export class CharacterService {
  getCharacters() {
    return Promise.resolve(CHARACTERS);
  }
}