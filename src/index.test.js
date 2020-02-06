import path from 'path';
import genDiff from '.';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJsonConfig = getFixturePath('before.json');
const secondJsonConfig = getFixturePath('after.json');

const firstYamlConfig = getFixturePath('before.yaml');
const secondYamlConfig = getFixturePath('after.yaml');

const firstIniConfig = getFixturePath('before.ini');
const secondIniConfig = getFixturePath('after.ini');

const firstConfugJsonOutput = getFixturePath('beforejson.json');
const secondConfigJsonOutput = getFixturePath('afterjson.json');

const treeResult = `{
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

const jsonResult = '[{"name":"group1","type":"key","beforeValue":true,"afterValue":true,"children":[],"status":"unchanged"},{"name":"group2","type":"obj","beforeValue":{"key1":1},"afterValue":{"key1":1},"children":[{"name":"key1","type":"key","beforeValue":1,"afterValue":1,"children":[],"status":"unchanged"}],"status":"unchanged"},{"name":"group3","type":"obj","beforeValue":{"key1":1},"afterValue":{"key1":1,"key2":2},"children":[{"name":"key1","type":"key","beforeValue":1,"afterValue":1,"children":[],"status":"unchanged"},{"name":"key2","type":"key","afterValue":2,"children":[],"status":"added"}],"status":"unchanged"},{"name":"group4","type":"key","beforeValue":"value","children":[],"status":"deleted"}]';

test('json files compare', () => {
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(treeResult);
});
test('yaml files compare', () => {
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(treeResult);
});
test('ini files compare', () => {
  expect(genDiff(firstIniConfig, secondIniConfig)).toBe(treeResult);
});
test('plain format test', () => {
  expect(genDiff(firstIniConfig, secondIniConfig, 'plain')).toBe(plainResult);
});
test('json format test', () => {
  expect(genDiff(firstConfugJsonOutput, secondConfigJsonOutput, 'json')).toBe(jsonResult);
});
