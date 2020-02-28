import yaml from 'js-yaml';
import ini from 'ini';

const parsing = {
  json: (config) => JSON.parse(config),
  yaml: (config) => yaml.safeLoad(config),
  ini: (config) => ini.parse(config),
};

export default (config, ext) => parsing[ext](config);
