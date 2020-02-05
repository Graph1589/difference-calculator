import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (firstConfig, secondConfig) => {
  if (path.extname(firstConfig) !== path.extname(secondConfig)) {
    // console.log('files have different formats');
    throw new Error('files have different formats');
  }

  const format = path.extname(firstConfig);

  switch (format) {
    case '.json':
      // console.log(JSON.parse(fs.readFileSync(firstConfig)));
      // console.log(JSON.parse(fs.readFileSync(secondConfig)));
      return [JSON.parse(fs.readFileSync(firstConfig)), JSON.parse(fs.readFileSync(secondConfig))];
    case '.yaml':
      return [yaml.safeLoad(fs.readFileSync(firstConfig)),
        yaml.safeLoad(fs.readFileSync(secondConfig))];
    case '.ini':
      return [ini.parse(fs.readFileSync(firstConfig, 'UTF-8')),
        ini.parse(fs.readFileSync(secondConfig, 'UTF-8'))];
    default:
      return undefined;
  }
};
