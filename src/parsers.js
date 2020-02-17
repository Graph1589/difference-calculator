import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': (config) => JSON.parse(config),
  '.yaml': (config) => yaml.safeLoad(config),
  '.ini': (config) => ini.parse(config),
};

export default (config, ext) => parsers[ext](config);
