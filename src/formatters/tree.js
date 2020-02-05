import _ from 'lodash';

const stringify = (value, depth) => {
  const ind = depth * 4 + 2;
  if (!(value instanceof Object)) {
    return value;
  }
  const result = _.keys(value).map((current) => `\n${' '.repeat(ind + 2)}${current}: ${value[current]}`);
  return `{${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};


const render = (data, depth = 0) => {
  const ind = depth * 4 + 2;
  const result = data.map((current) => {
    const {
      name, type, beforeValue, afterValue, children, status,
    } = current;
    if (type === 'key') {
      switch (status) {
        case 'unchanged':
          return `${' '.repeat(ind)}${' '} ${name}: ${stringify(beforeValue, depth + 1)}`;
        case 'added':
          return `${' '.repeat(ind)}${'+'} ${name}: ${stringify(afterValue, depth + 1)}`;
        case 'deleted':
          return `${' '.repeat(ind)}${'-'} ${name}: ${stringify(beforeValue, depth + 1)}`;
        case 'edited':
          return `${' '.repeat(ind)}${'-'} ${name}: ${stringify(beforeValue, depth + 1)}\n${' '.repeat(ind)}${'+'} ${name}: ${stringify(afterValue, depth + 1)}`;
        default:
          break;
      }
    }
    if (current.type === 'obj') {
      switch (status) {
        case 'unchanged':
          return `${' '.repeat(ind)}${' '} ${name}: ${render(children, depth + 1)}`;
        case 'added':
          return `${' '.repeat(ind)}${'+'} ${name}: ${render(children, depth + 1)}`;
        case 'deleted':
          return `${' '.repeat(ind)}${'-'} ${name}: ${render(children, depth + 1)}`;
        case 'edited':
          return `${' '.repeat(ind)}${'-'} ${name}: ${render(children, depth + 1)}\n${' '.repeat(ind)}${'+'} ${name}: ${render(children, depth + 1)}`;
        default:
          break;
      }
      return `\n${' '.repeat(ind)}${' '} ${name}: ${render(children, depth + 1)}`;
    }
    return 0;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};

export default render;
