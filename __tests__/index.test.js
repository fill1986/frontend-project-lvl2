import gendiff from '../src/index';

const fileJson1 = '/__fixtures__/before.json';
const fileJson2 = '/__fixtures__/after.json';

describe('Block test for gendiff', () => {
  test('not have "- host"', () => {
    expect(gendiff(fileJson1, fileJson2)).not.toMatch('- host');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('+ timeout : 20');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('- timeout : 50');
  });
  test('to have "host : hexlet.io"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('host : hexlet.io');
  });
  test('to have "+ verbose : true"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('+ verbose : true');
  });
  test('to have "- proxy : 123.234.53.22"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('- proxy : 123.234.53.22');
  });
  test('to have "- follow : false"', () => {
    expect(gendiff(fileJson1, fileJson2)).toMatch('- follow : false');
  });
});
