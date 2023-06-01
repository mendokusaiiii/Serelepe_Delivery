import { readLocal, saveLocal, checkLocal, clearLocal } from '../../helpers/localStorage';

describe('ReadLocal', () => {
  it('Read values from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test', age: 15 };
    localStorage.setItem(key, JSON.stringify(value));

    const result = readLocal(key);

    expect(result).toEqual(value);
  });

  it('Return null if empty local storage', () => {
    const key = 'nullKey';

    const result = readLocal(key);

    expect(result).toBeNull();
  });
});

describe('saveLocal', () => {
  it('Save on LocalStorage', () => {
    const key = 'testKey';
    const value = { name: 'test', age: 15 };

    saveLocal(key, value);

    const result = JSON.parse(localStorage.getItem(key));

    expect(result).toEqual(value);
  });
});

describe('checkLocal', () => {
  it('Check itens from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'test', age: 15 };
    localStorage.setItem(key, JSON.stringify(value));

    const result = checkLocal(key);

    expect(result).toEqual(value);
  });

  it('Save empty array if localStorage are empty', () => {
    const key = 'nullKey';

    const result = checkLocal(key);

    expect(result).toEqual([]);
  });
});

describe('clearLocal', () => {
  it('Clear Local Storage', () => {
    const key = 'testKey';
    const value = { name: 'test', age: 15 };
    localStorage.setItem(key, JSON.stringify(value));

    clearLocal();

    expect(localStorage.getItem(key)).toBeNull();
  });
});
