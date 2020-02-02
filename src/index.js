import _ from 'lodash';
import parser from './parsers';

export default (firstPath, secondPath) => {
  const [firstConfig, secondConfig] = parser(firstPath, secondPath);
  const keys = Object.keys(Object.assign(firstConfig, secondConfig)).sort();
  const diff = keys.reduce((acc, current) => {
    if ((_.has(firstConfig, current) && _.has(secondConfig, current))
    && firstConfig[current] === secondConfig[current]) {
      return [`${acc}   ${current}: ${firstConfig[current]}\n`];
    }
    if ((_.has(firstConfig, current) && _.has(secondConfig, current))
    && firstConfig[current] !== secondConfig[current]) {
      return [`${acc} - ${current}: ${firstConfig[current]}\n${acc} + ${current}: ${secondConfig[current]}\n`];
    }
    if (_.has(firstConfig, current) && !_.has(secondConfig, current)) {
      return [`${acc} - ${current}: ${firstConfig[current]}\n`];
    }
    if (!_.has(firstConfig, current) && _.has(secondConfig, current)) {
      return [`${acc} + ${current}: ${secondConfig[current]}\n`];
    }
    return 0;
  }, []);
  const result = `{\n${diff.join('\n')}}`;
  return result;
};
