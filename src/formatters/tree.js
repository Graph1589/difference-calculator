import _ from 'lodash';

const stringify = (value, depth) => {
  const indent = depth * 4 + 2;
  if (value instanceof Object) {
    const result = Object.keys(value).map((key) => `${' '.repeat(indent)}${key}: ${value[key]}`);
    return `{\n${result.join('\n')}\n${' '.repeat(indent - 4)}}`;
  }
  return value;
};

const renderStringByType = (element, depth, func) => {
  const indent = depth * 4;
  const types = {
    nested: (obj) => `  ${obj.key}: ${func(obj.value, depth + 1)}`,
    added: (obj) => `+ ${obj.key}: ${stringify(obj.value, depth + 1)}`,
    deleted: (obj) => `- ${obj.key}: ${stringify(obj.value, depth + 1)}`,
    changed: (obj) => `- ${obj.key}: ${stringify(obj.value.beforeValue, depth + 1)}
    + ${obj.key}: ${stringify(obj.value.afterValue, depth + 1)}`,
    unchanged: (obj) => `  ${obj.key}: ${stringify(obj.value, depth + 1)}`,
  };

  return `${' '.repeat(indent)}${types[element.typeName](element)}`;
};

const render = (data, depth = 0) => {
  const indent = depth * 4;
  const result = _.map(data, (element) => `${renderStringByType(element, depth, render)}`);
  return `{\n${result.join('\n')}\n${' '.repeat(indent > 2 ? indent - 2 : indent)}}`;
};

export default render;
