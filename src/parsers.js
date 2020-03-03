import yaml from 'js-yaml';
import ini from 'ini';

const parsing = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (config, type) => parsing[type](config);
