import path from 'path';
import genDiff from '.';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const firstJsonConfig = getFixturePath('before.json');
const secondJsonConfig = getFixturePath('after.json');

const firstYamlConfig = getFixturePath('before.yaml');
const secondYamlConfig = getFixturePath('after.yaml');

const firstIniConfig = getFixturePath('before.ini');
const secondIniConfig = getFixturePath('after.ini');

const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
   timeout: 20
   verbose: true
}`;

test('json config files compare', () => {
  expect(genDiff(firstJsonConfig, secondJsonConfig)).toBe(result);
});
test('yaml config files compare', () => {
  expect(genDiff(firstYamlConfig, secondYamlConfig)).toBe(result);
});
test('ini config files compare', () => {
  expect(genDiff(firstIniConfig, secondIniConfig)).toBe(result);
});
