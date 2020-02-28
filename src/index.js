import path from 'path';
import fs from 'fs';
import parse from './parsers';
import genDiff from './genDiff';
import renderDiff from './formatters';

export default (firstConfigPath, secondConfigPath, outputFormat = 'tree') => {
  const firstConfigContent = fs.readFileSync(firstConfigPath, 'utf-8');
  const secondConfigContent = fs.readFileSync(secondConfigPath, 'utf-8');
  const firstConfigType = path.extname(firstConfigPath).slice(1);
  const secondConfigType = path.extname(secondConfigPath).slice(1);

  const diffTree = genDiff(
    parse(firstConfigContent, firstConfigType),
    parse(secondConfigContent, secondConfigType),
  );

  const result = renderDiff(diffTree, outputFormat);
  return result;
};
