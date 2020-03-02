import { gendiff, parseFile } from '../src/index';

const fileJson1 = parseFile('/__fixtures__/before.json');
const fileJson2 = parseFile('/__fixtures__/after.json');
const fileYaml1 = parseFile('/__fixtures__/before.yaml');
const fileYaml2 = parseFile('/__fixtures__/after.yaml');
const fileIni1 = parseFile('/__fixtures__/before.ini');
const fileIni2 = parseFile('/__fixtures__/after.ini');

describe('Block test for JSON file', () => {
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

describe('Block test for Yaml file', () => {
  test('not have "- host"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).not.toMatch('- host');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('+ timeout : 20');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('- timeout : 50');
  });
  test('to have "host : hexlet.io"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('host : hexlet.io');
  });
  test('to have "+ verbose : true"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('+ verbose : true');
  });
  test('to have "- proxy : 123.234.53.22"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('- proxy : 123.234.53.22');
  });
  test('to have "- follow : false"', () => {
    expect(gendiff(fileYaml1, fileYaml2)).toMatch('- follow : false');
  });
});

describe('Block test for INI file', () => {
  test('not have "- host"', () => {
    expect(gendiff(fileIni1, fileIni2)).not.toMatch('- host');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('+ timeout : 20');
  });
  test('to have "+ timeout : 20"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('- timeout : 50');
  });
  test('to have "host : hexlet.io"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('host : hexlet.io');
  });
  test('to have "+ verbose : true"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('+ verbose : true');
  });
  test('to have "- proxy : 123.234.53.22"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('- proxy : 123.234.53.22');
  });
  test('to have "- follow : false"', () => {
    expect(gendiff(fileIni1, fileIni2)).toMatch('- follow : false');
  });
});
