import _ from 'lodash';

const genPath = (ancestry, name) => (ancestry === '' ? `${name}` : `${ancestry}.${name}`);

const replaceObjectValue = (value) => (value instanceof Object ? '[complex value]' : `${value}`);

const suitedTypes = {
  nested: (element, ancestry, handle) => handle(element.content.children, ancestry),
  added: (element, ancestry) => (
    `Property '${ancestry}' was added with value: ${replaceObjectValue(element.content.value)}`
  ),
  deleted: (element, ancestry) => `Property '${ancestry}' was deleted`,
  changed: (element, ancestry) => (
    `Property '${ancestry}' was changed from ${replaceObjectValue(element.content.beforeValue)} to ${replaceObjectValue(element.content.afterValue)}`
  ),
};


const render = (data, ancestry = '') => {
  const filtered = _.filter(data, (current) => current.typeName !== 'unchanged');
  const mapped = _.map(filtered, (current) => {
    const { typeName } = current;
    const currentPath = genPath(ancestry, current.key);
    return suitedTypes[typeName](current, currentPath, render);
  });
  return mapped.join('\n');
};

export default render;
