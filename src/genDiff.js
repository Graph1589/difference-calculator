import _ from 'lodash';

const types = [
  {
    typeName: 'nested',
    checkup: (firstUnit, secondUnit, key) => (
      firstUnit[key] instanceof Object && secondUnit[key] instanceof Object
    ),
    method: (firstUnit, secondUnit, key, handler) => handler(firstUnit[key], secondUnit[key]),
  },
  {
    typeName: 'added',
    checkup: (firstUnit, secondUnit, key) => (
      !_.has(firstUnit, key) && _.has(secondUnit, key)
    ),
    method: (firstUnit, secondUnit, key) => secondUnit[key],
  },
  {
    typeName: 'deleted',
    checkup: (firstUnit, secondUnit, key) => (
      _.has(firstUnit, key) && !_.has(secondUnit, key)
    ),
    method: (firstUnit, secondUnit, key) => firstUnit[key],
  },
  {
    typeName: 'changed',
    checkup: (firstUnit, secondUnit, key) => (
      (_.has(firstUnit, key) && _.has(secondUnit, key)) && firstUnit[key] !== secondUnit[key]
    ),
    method: (firstUnit, secondUnit, key) => (
      { beforeValue: firstUnit[key], afterValue: secondUnit[key] }
    ),
  },
  {
    typeName: 'unchanged',
    checkup: (firstUnit, secondUnit, key) => (
      (_.has(firstUnit, key) && _.has(secondUnit, key)) && firstUnit[key] === secondUnit[key]
    ),
    method: (firstUnit, secondUnit, key) => firstUnit[key],
  },
];

const generateDiffTree = (firstConfig, secondConfig) => {
  const keys = _.union(Object.keys(firstConfig), Object.keys(secondConfig));
  return keys.map((key) => {
    const { typeName, method } = _.find(types, (item) => (
      item.checkup(firstConfig, secondConfig, key)
    ));
    const value = method(firstConfig, secondConfig, key, generateDiffTree);
    return { name: key, typeName, value };
  });
};

export default generateDiffTree;
