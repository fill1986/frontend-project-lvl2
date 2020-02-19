import gendiff from '../src/index.js';

describe('Block test for gendiff', ()=>{
    test('not have "- host"', () => {
      expect(gendiff('/src/before.json', '/src/after.json')).not.toMatch('- host');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('+ timeout : 20');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('- timeout : 50');
  });
  test('to have "host : hexlet.io"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('host : hexlet.io');
  });
  test('to have "+ verbose : true"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('+ verbose : true');
  });
  test('to have "- proxy : 123.234.53.22"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('- proxy : 123.234.53.22');
  });
  test('to have "- follow : false"', () => {
    expect(gendiff('/src/before.json', '/src/after.json')).toMatch('- follow : false');
  });
})

//expect(gendiff('/src/before.json', '/src/after.json')).toEqual('{ + timeout : 20 - timeout : 50 + verbose : true host : hexlet.io - proxy : 123.234.53.22 - follow : false }');
