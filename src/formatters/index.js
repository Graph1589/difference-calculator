import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

export default (difference, outputFormat) => {
  if (outputFormat === 'plain') {
    return renderPlain(difference);
  }
  if (outputFormat === 'json') {
    return renderJson(difference);
  }
  return renderTree(difference);
};
