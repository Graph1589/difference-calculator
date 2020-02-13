import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, './', '__fixtures__', filename);

const configTypes = ['json', 'yaml', 'ini'];
const outputTypes = ['tree', 'plain', 'json'];

const coll = configTypes.flatMap(
  (configType) => outputTypes.map(
    (outputType) => [configType, outputType],
  ),
);

test.each(coll)('test test', (configType, outputType) => {

});


/*
test('json files compare', () => {
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(fs.readFileSync(getFixturePath('tree'), 'utf-8'));
});

test('yaml files compare', () => {
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(fs.readFileSync(getFixturePath('tree'), 'utf-8'));
});
test('ini files compare', () => {
  expect(genDiff(firstIniConfig, secondIniConfig)).toBe(fs.readFileSync(getFixturePath('tree'), 'utf-8'));
});
test('plain format test', () => {
  expect(genDiff(firstIniConfig, secondIniConfig, 'plain')).toBe(fs.readFileSync(getFixturePath('plain'), 'utf-8'));
});
test('json format test', () => {
  expect(genDiff(firstConfugJsonOutput, secondConfigJsonOutput, 'json')).toBe(fs.readFileSync(getFixturePath('json'), 'utf-8'));
});
*/