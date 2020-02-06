import path from 'path';
import fs from 'fs';
import genDiff from '.';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const plainResult = fs.readFileSync(getFixturePath('plainesult'));

const firstJsonConfig = getFixturePath('before.json');
const secondJsonConfig = getFixturePath('after.json');

const firstYamlConfig = getFixturePath('before.yaml');
const secondYamlConfig = getFixturePath('after.yaml');

const firstIniConfig = getFixturePath('before.ini');
const secondIniConfig = getFixturePath('after.ini');

const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;
/*
test('json files compare', () => {
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(result);
});
test('yaml files compare', () => {
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(result);
});
test('ini files compare', () => {
  expect(genDiff(firstIniConfig, secondIniConfig)).toBe(result);
}); */
test('plain format test', () => {
  expect(gendiff(firstIniConfig, secondIniConfig)).toBe(plainResult);
})
