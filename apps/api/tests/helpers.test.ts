import { describe, expect, test } from '@jest/globals';
import { validateText, validateId } from '../src/helpers/validators';

describe.skip('helpers test', () => {
  test('test validateId', () => {
    expect(() => {
      validateId(null);
    }).toThrowError();
    expect(() => {
      validateId(1);
    }).not.toThrowError();
  });

  test('test validateText', () => {
    expect(() => {
      validateText(null);
    }).toThrowError();
    expect(() => {
      validateText('teste');
    }).not.toThrowError();
  });
});
