import treeRender from './tree';
import plainRender from './plain';

export default (data, format) => {
  if (format === 'plain') {
    return plainRender(data);
  }
  return treeRender(data);
};
