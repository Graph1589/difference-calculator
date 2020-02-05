import parser from './parsers';
import diff from './diff';
import render from './render';

export default (firstPath, secondPath) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const data = diff(firstConfig, secondConfig);
  // console.log(data);
  const result = render(data);
  return result;
};
