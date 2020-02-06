import path from 'path';
import fs from 'fs';
import genDiff from '.';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

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

const plainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was deleted
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.ops' was added with value: vops
Property 'group1.baz' was changed from bas to bars
Property 'group1.nest' was changed from [complex value] to str
Property 'group2' was deleted
Property 'group3' was added with value: [complex value]
`;

test('json files compare', () => {
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(result);
});
test('yaml files compare', () => {
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(result);
});
test('ini files compare', () => {
  expect(genDiff(firstIniConfig, secondIniConfig)).toBe(result);
});
test('plain format test', () => {
  expect(genDiff(firstIniConfig, secondIniConfig, 'plain')).toBe(plainResult);
});
