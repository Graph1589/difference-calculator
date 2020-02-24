import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const formatters = {
  plain: renderPlain,
  json: renderJson,
  tree: renderTree,
};

export default (difference, outputFormat) => formatters[outputFormat](difference);
