import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (firstConfig, secondConfig) => {
  if (path.extname(firstConfig) !== path.extname(secondConfig)) {
    // console.log('files have different formats');
    throw new Error('files have different formats');
  }

  const format = path.extname(firstConfig);

  switch (format) {
    case '.json':
      return [JSON.parse(fs.readFileSync(firstConfig)), JSON.parse(fs.readFileSync(secondConfig))];
    case '.yaml':
      return [yaml.safeLoad(fs.readFileSync(firstConfig)),
        yaml.safeLoad(fs.readFileSync(secondConfig))];
    default:
      return undefined;
  }
};
