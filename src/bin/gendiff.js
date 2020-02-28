#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';


program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfigPath, secondConfigPath) => {
    const result = genDiff(firstConfigPath, secondConfigPath, program.format);
    console.log(result);
  });

program.parse(process.argv);


export default genDiff;
