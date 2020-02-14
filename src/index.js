import parse from './parsers';
import genDiff from './diff';
import renderDiff from './formatters';

export default (firstConfigPath, secondConfigPath, outputFormat) => {
  const difference = genDiff(parse(firstConfigPath), parse(secondConfigPath));
  const result = renderDiff(difference, outputFormat);
  return result;
};
