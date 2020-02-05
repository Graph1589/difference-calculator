import _ from 'lodash';

const stringify = (value, depth) => {
  const ind = depth * 4 + 2;
  if (!(value instanceof Object)) {
    return value;
  }
  const result = _.keys(value).map((current) => `\n${' '.repeat(ind + 2)}${current}: ${value[current]}`);
  return `{${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};

const selector = {
  unchanged: ' ',
  added: '+',
  deleted: '-',
};

const render = (data, depth = 0) => {
  const ind = depth * 4 + 2;
  const result = data.map((current) => {
    const {
      name, type, beforeValue, afterValue, children, status,
    } = current;
    const value = type === 'key' ? stringify(beforeValue || afterValue, depth + 1) : render(children, depth + 1);

    if (type === 'key' && status === 'edited') {
      return `${' '.repeat(ind)}${'-'} ${name}: ${stringify(beforeValue, depth + 1)}\n${' '.repeat(ind)}${'+'} ${name}: ${stringify(afterValue, depth + 1)}`;
    }
    if (type === 'obj' && status === 'edited') {
      return `${' '.repeat(ind)}${'-'} ${name}: ${value}\n${' '.repeat(ind)}${'+'} ${name}: ${value}`;
    }
    return `${' '.repeat(ind)}${selector[status]} ${name}: ${value}`;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};

export default render;
