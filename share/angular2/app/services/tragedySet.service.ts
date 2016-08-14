import { Injectable } from '@angular/core';
import {TRAGEDY_SETS} from './mock-tragedy_sets';
@Injectable()
export class TragedySetService {
  getTragedySets() {
    return Promise.resolve(TRAGEDY_SETS);
  }
}