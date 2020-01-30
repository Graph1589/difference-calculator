import genDiff from '.';

const firstConfig = './fixtures/before.json';
const secondConfig = './fixtures/after.json';

const result = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
   timeout: 20
   verbose: true
}`;

test('config files compare results', () => {
  expect(genDiff(firstConfig, secondConfig)).toBe(result);
});
