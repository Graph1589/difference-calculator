import _ from 'lodash';

const statusCheck = (beforeValue, afterValue) => {
  if (beforeValue === undefined) {
    return 'added';
  }
  if (afterValue === undefined) {
    return 'deleted';
  }
  if (beforeValue === afterValue) {
    return 'unchanged';
  }
  if (beforeValue instanceof Object && afterValue instanceof Object) {
    return 'unchanged';
  }
  return 'edited';
};

const genDiff = (firstConfig, secondConfig) => {
  const union = _.merge({}, firstConfig, secondConfig);
  const keys = Object.keys(union).sort();
  return keys.map((current) => {
    if (firstConfig[current] instanceof Object && secondConfig[current] instanceof Object) {
      const beforeValue = firstConfig[current];
      const afterValue = _.has(secondConfig, current) ? secondConfig[current] : undefined;
      const status = statusCheck(beforeValue, afterValue);
      const children = genDiff(firstConfig[current], secondConfig[current]);
      return {
        name: current,
        type: 'obj',
        beforeValue,
        afterValue,
        children,
        status,
      };
    }
    const beforeValue = _.has(firstConfig, current) ? firstConfig[current] : undefined;
    const afterValue = _.has(secondConfig, current) ? secondConfig[current] : undefined;
    const status = statusCheck(beforeValue, afterValue);
    return {
      name: current,
      type: 'key',
      beforeValue,
      afterValue,
      children: [],
      status,
    };
  });
};

export default genDiff;
