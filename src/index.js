import path from 'path';
import fs from 'fs';
import parse from './parsers';
import genDiff from './diff';
import renderDiff from './formatters';

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const difference = genDiff(
    parse(fs.readFileSync(firstConfigPath, 'utf-8'), path.extname(firstConfigPath)),
    parse(fs.readFileSync(secondConfigPath, 'utf-8'), path.extname(secondConfigPath)),
  );
  const result = renderDiff(difference, outputFormat);
  return result;
};
