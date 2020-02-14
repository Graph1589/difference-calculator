import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (ConfigPath) => {
  const configFormat = path.extname(ConfigPath);
  switch (configFormat) {
    case '.json':
      return JSON.parse(fs.readFileSync(ConfigPath));
    case '.yaml':
      return yaml.safeLoad(fs.readFileSync(ConfigPath, 'utf-8'));
    case '.ini':
      return ini.parse(fs.readFileSync(ConfigPath, 'utf-8'));
    default:
      throw new Error('unsupported format');
  }
};
