import parser from './parsers';
import diff from './diff';
import render from './formatters';

export default (firstPath, secondPath) => {
  const data = diff(parser(firstPath), parser(secondPath));
  // console.log(typeof data);
  const result = render(data);
  return result;
};
