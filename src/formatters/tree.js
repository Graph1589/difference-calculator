import _ from 'lodash';

const stringify = (value, ind = 0) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const result = _.keys(value).map((current) => `\n${' '.repeat(ind + 2)}${current}: ${value[current]}`);
  return `{${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};


const render = (data, ind = 2) => {
  const result = data.map((current) => {
    if (current.type === 'key') {
      switch (current.status) {
        case 'unchanged':
          return `${' '.repeat(ind)}${' '} ${current.name}: ${stringify(current.beforeValue, ind + 4)}`;
        case 'added':
          return `${' '.repeat(ind)}${'+'} ${current.name}: ${stringify(current.afterValue, ind + 4)}`;
        case 'deleted':
          return `${' '.repeat(ind)}${'-'} ${current.name}: ${stringify(current.beforeValue, ind + 4)}`;
        case 'edited':
          return `${' '.repeat(ind)}${'-'} ${current.name}: ${stringify(current.beforeValue, ind + 4)}\n${' '.repeat(ind)}${'+'} ${current.name}: ${stringify(current.afterValue, ind + 4)}`;
        default:
          break;
      }
    }
    if (current.type === 'obj') {
      switch (current.status) {
        case 'unchanged':
          return `${' '.repeat(ind)}${' '} ${current.name}: ${render(current.children, ind + 4)}`;
        case 'added':
          return `${' '.repeat(ind)}${'+'} ${current.name}: ${render(current.children, ind + 4)}`;
        case 'deleted':
          return `${' '.repeat(ind)}${'-'} ${current.name}: ${render(current.children, ind + 4)}`;
        case 'edited':
          return `${' '.repeat(ind)}${'-'} ${current.name}: ${render(current.children, ind + 4)}\n${' '.repeat(ind)}${'+'} ${current.name}: ${render(current.children, ind + 4)}`;
        default:
          break;
      }
      return `\n${' '.repeat(ind)}${' '} ${current.name}: ${render(current.children, ind + 4)}`;
    }
    return 0;
  });
  return `{\n${result.join('\n')}\n${' '.repeat(ind - 2)}}`;
};

export default render;
