/*
import _ from 'lodash';

const genPath = (ancestry, name) => (ancestry === '' ? `${name}` : `${ancestry}.${name}`);

const renderByTypes = (element, ancestry, func) => {
  const suitedTypes = {
    nested: func(element, ancestry),
    added: `Property '${ancestry}' was added with value: ${element.value}\n`,
    deleted: `Property '${ancestry}' was deleted\n`,
    changed: `Property '${ancestry}' was changed from ${element.value.beforeValue} to ${element.value.afterValue}\n`,
  };
  return suitedTypes[element.typeName];
};

const suitedTypes = [
  {
    name: 'nested',
    stringify: (element, ancestry, func) => func(element, ancestry),
  },
  {
    name: 'added',
    stringify: (element, ancestry, func) => `Property '${ancestry}' was added with value: ${element.value}\n`,
  },
  {
    name: 'deleted',
    stringify: (element, ancestry, func) => `Property '${ancestry}' was deleted\n`,
  },
  {
    name: 'changed',
    stringify: (element, ancestry, func) => `Property '${ancestry}' was changed from ${element.value.beforeValue} to ${element.value.afterValue}\n`,
  },
];

const render = (data, ancestry = '') => {
  const filtered = _.filter(data, (current) => current.typeName !== 'unchanged');
  const mapped = _.filter(filtered, (current) => {
    const { typeName, key, value } = current;
    const currentPath = genPath(ancestry, current.key);
    const { name, stringify } = _.find(suitedTypes, (item) => item.name === current.typeName);
    return stringify(current, currentPath, render);
  });
  console.log(mapped);
  return mapped.join('\n');
};

export default render;
*/

const genPath = (path, name) => {
  if (path === '') {
    return `${name}`;
  }
  return `${path}.${name}`;
};

const render = (data, ancestry = '') => {
  const result = data.map((current) => {
    const {
      typeName, key, value,
    } = current;
    const newPath = genPath(ancestry, key);
    if (current instanceof Object && typeName === 'unchanged') {
      return render(value, newPath);
    }
    const beforeValue = current.value.beforeValue instanceof Object ? '[complex value]' : current.value.beforeValue;
    const afterValue = current.value.afterValue instanceof Object ? '[complex value]' : current.value.afterValue;
    switch (typeName) {
      case 'deleted':
        return `Property '${newPath}' was deleted\n`;
      case 'added':
        return `Property '${newPath}' was added with value: ${afterValue}\n`;
      case 'edited':
        return `Property '${newPath}' was changed from ${beforeValue} to ${afterValue}\n`;
      default:
        break;
    }
    return '';
  });
  return result.join('');
};

export default render;
