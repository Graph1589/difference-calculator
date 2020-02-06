import parser from './parsers';
import diff from './diff';
import render from './formatters';

export default (firstPath, secondPath, format) => {
  const data = diff(parser(firstPath), parser(secondPath));
  const result = render(data, format);
  return result;
};
