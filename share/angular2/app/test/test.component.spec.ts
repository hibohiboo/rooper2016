import {
  it,
  inject,
  describe,
  beforeEachProviders,
  expect
} from '@angular/core/testing';
import { TestComponent } from './test.component';
describe('Test', () => {
  beforeEachProviders(() => [
    TestComponent
  ]);
  it ('should work', inject([TestComponent], (app: TestComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
});