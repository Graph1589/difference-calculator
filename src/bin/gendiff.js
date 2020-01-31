#!/usr/bin/env node

import genDiff from '..';

const program = require('commander');

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstData, secondData) => {
    const result = genDiff(firstData, secondData);
    console.log(result);
    console.log(typeof result);
  });
program.parse(process.argv);

export default genDiff;
