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

console.log(coll);
test.each(coll)('test test %', (configType, outputType) => {
  console.log([configType, outputType]);
  const beforeConfig = getFixturePath(`before.${configType}`);
  const afterConfig = getFixturePath(`after.${configType}`);
  const result = fs.readFileSync(getFixturePath(outputType), 'utf-8');

  expect(genDiff(beforeConfig, afterConfig, outputType)).toEqual(result);
});
