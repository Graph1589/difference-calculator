import _ from 'lodash';

const genPath = (path, name) => {
  if (path === '') {
    return `${name}`;
  }
  return `${path}.${name}`;
}

const render = (data, path = '') => {
  const result = data.map((current) => {
    const {
      name, type, beforeValue, afterValue, children, status,
    } = current;
    let newPath = genPath(path, name);
    if (type === 'key') {
      switch (status) {
        case 'deleted':
          return `Property ${newPath} was deleted\n`;
        case 'added':
          return `Property ${newPath} was added with value: ${afterValue}\n`;
        case 'edited':
          return `Property ${newPath} was changed from ${beforeValue} to ${afterValue}\n`;
        default:
          break;
      }
    }
    if (type === 'obj') {
      switch (status) {
        case 'unchanged':
          return render(children, path);
        case 'deleted':
          return `Property ${newPath} was deleted\n`;
        case 'added':
          return `Property ${newPath} was added with value: ${afterValue}\n`;
        case 'edited':
          return `Property ${newPath} was changed from ${beforeValue} to ${afterValue}\n`;
        default:
          break;
      }
    }
  });
  return result.join('');
};

export default render;
