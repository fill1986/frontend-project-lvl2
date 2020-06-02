import {
  parseFile, createAST, selectFormat,
} from '../src/index';

const fileJson1 = parseFile('/__fixtures__/before.json');
const fileJson2 = parseFile('/__fixtures__/after.json');
const fileYaml1 = parseFile('/__fixtures__/before.yaml');
const fileYaml2 = parseFile('/__fixtures__/after.yaml');
const fileIni1 = parseFile('/__fixtures__/before.ini');
const fileIni2 = parseFile('/__fixtures__/after.ini');

const JSONformater = selectFormat('json');
const PlainFormater = selectFormat('plain');

const resultCompareJSONfilesFormatJSON = JSONformater(createAST(fileJson1, fileJson2));
const resultCompareYAMLfilesFormatJSON = JSONformater(createAST(fileYaml1, fileYaml2));
const resultCompareINIfilesFormatJSONF = JSONformater(createAST(fileIni1, fileIni2));
const resultCompareJSONfilesFormatPlain = PlainFormater(createAST(fileJson1, fileJson2));
const resultCompareYAMLfilesFormatPlain = PlainFormater(createAST(fileYaml1, fileYaml2));
const resultCompareINIfilesFormatPlain = PlainFormater(createAST(fileIni1, fileIni2));

describe('Block test for JSON file by Format JSON', () => {
  test('not have "- common', () => {
    expect(resultCompareJSONfilesFormatJSON).not.toMatch('- common :');
  });
  test("to have'+ baz : bars'", () => {
    expect(resultCompareJSONfilesFormatJSON).toMatch('+ baz : bars');
  });
  test('to have "- baz : bas"', () => {
    expect(resultCompareJSONfilesFormatJSON).toMatch('- baz : bas');
  });
  test('to have "+ group3"', () => {
    expect(resultCompareJSONfilesFormatJSON).toMatch('+ group3 : {\n    fee : 100500\n  }');
  });
  test('to have "- follow : false"', () => {
    expect(resultCompareJSONfilesFormatJSON).toMatch('+ follow : false');
  });
});

describe('Block test for Yaml file by Format JSON', () => {
  test('not have "- common', () => {
    expect(resultCompareYAMLfilesFormatJSON).not.toMatch('- common :');
  });
  test("to have'+ baz : bars'", () => {
    expect(resultCompareYAMLfilesFormatJSON).toMatch('+ baz : bars');
  });
  test('to have "- baz : bas"', () => {
    expect(resultCompareYAMLfilesFormatJSON).toMatch('- baz : bas');
  });
  test('to have "+ group3"', () => {
    expect(resultCompareYAMLfilesFormatJSON).toMatch('+ group3 : {\n    fee : 100500\n  }');
  });
  test('to have "- follow : false"', () => {
    expect(resultCompareYAMLfilesFormatJSON).toMatch('+ follow : false');
  });
});


describe('Block test for INI file by Format JSON', () => {
  test('not have "- common', () => {
    expect(resultCompareINIfilesFormatJSONF).not.toMatch('- common :');
  });
  test("to have'+ baz : bars'", () => {
    expect(resultCompareINIfilesFormatJSONF).toMatch('+ baz : bars');
  });
  test('to have "- baz : bas"', () => {
    expect(resultCompareINIfilesFormatJSONF).toMatch('- baz : bas');
  });
  test('to have "+ group3"', () => {
    expect(resultCompareINIfilesFormatJSONF).toMatch('+ group3 : {\n    fee : 100500\n  }');
  });
  test('to have "- follow : false"', () => {
    expect(resultCompareINIfilesFormatJSONF).toMatch('+ follow : false');
  });
});

describe('Block test for JSON file by Format Plain', () => {
  test('Propety common.follow with value: valse', () => {
    expect(resultCompareJSONfilesFormatPlain).toMatch('Property common.follow  was added with value: false');
  });
  test('Property common.setting2  was deleted', () => {
    expect(resultCompareJSONfilesFormatPlain).toMatch('Property common.setting2  was deleted ');
  });
  test('Property group1.nest  was added with value: str', () => {
    expect(resultCompareJSONfilesFormatPlain).toMatch('Property group1.nest  was added with value: str');
  });
});

describe('Block test for YAML file by Format Plain', () => {
  test('Propety common.follow with value: valse', () => {
    expect(resultCompareYAMLfilesFormatPlain).toMatch('Property common.follow  was added with value: false');
  });
  test('Property common.setting2  was deleted', () => {
    expect(resultCompareYAMLfilesFormatPlain).toMatch('Property common.setting2  was deleted ');
  });
  test('Property group1.nest  was added with value: str', () => {
    expect(resultCompareYAMLfilesFormatPlain).toMatch('Property group1.nest  was added with value: str');
  });
});

describe('Block test for INI file by Format Plain', () => {
  test('Propety common.follow with value: valse', () => {
    expect(resultCompareINIfilesFormatPlain).toMatch('Property common.follow  was added with value: false');
  });
  test('Property common.setting2  was deleted', () => {
    expect(resultCompareINIfilesFormatPlain).toMatch('Property common.setting2  was deleted ');
  });
  test('Property group1.nest  was added with value: str', () => {
    expect(resultCompareINIfilesFormatPlain).toMatch('Property group1.nest  was added with value: str');
  });
});
