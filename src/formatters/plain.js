const genPath = (path, name) => {
  if (path === '') {
    return `${name}`;
  }
  return `${path}.${name}`;
};

const render = (data, ancestry = '') => {
  const result = data.map((current) => {
    const {
      name, type, children, status,
    } = current;
    const newPath = genPath(ancestry, name);
    if (type === 'obj' && status === 'unchanged') {
      return render(children, newPath);
    }
    const beforeValue = current.beforeValue instanceof Object ? '[complex value]' : current.beforeValue;
    const afterValue = current.afterValue instanceof Object ? '[complex value]' : current.afterValue;
    switch (status) {
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
