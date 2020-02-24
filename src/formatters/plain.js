import _ from 'lodash';

const genPath = (ancestry, name) => (ancestry === '' ? `${name}` : `${ancestry}.${name}`);

const replaceObjectValue = (value) => (value instanceof Object ? '[complex value]' : `${value}`);

const suitedTypes = {
  nested: (element, ancestry, func) => func(element.value, ancestry),
  added: (element, ancestry) => (
    `Property '${ancestry}' was added with value: ${replaceObjectValue(element.value)}\n`
  ),
  deleted: (element, ancestry) => `Property '${ancestry}' was deleted\n`,
  changed: (element, ancestry) => (
    `Property '${ancestry}' was changed from ${replaceObjectValue(element.value.beforeValue)} to ${replaceObjectValue(element.value.afterValue)}\n`
  ),
};


const render = (data, ancestry = '') => {
  const filtered = _.filter(data, (current) => current.typeName !== 'unchanged');
  const mapped = _.map(filtered, (current) => {
    const { typeName } = current;
    const currentPath = genPath(ancestry, current.key);
    return suitedTypes[typeName](current, currentPath, render);
  });
  return mapped.join('');
};

export default render;
