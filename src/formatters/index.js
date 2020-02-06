import treeRender from './tree';
import plainRender from './plain';
import jsonRender from './json';

export default (data, format) => {
  if (format === 'plain') {
    return plainRender(data);
  }
  if (format === 'json') {
    return jsonRender(data);
  }
  return treeRender(data);
};
