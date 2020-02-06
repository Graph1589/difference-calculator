import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (ConfigPath) => {
  const format = path.extname(ConfigPath);
  switch (format) {
    case '.json':
      return JSON.parse(fs.readFileSync(ConfigPath));
    case '.yaml':
      return yaml.safeLoad(fs.readFileSync(ConfigPath));
    case '.ini':
      return ini.parse(fs.readFileSync(ConfigPath, 'UTF-8'));
    default:
      return undefined;
  }
};
