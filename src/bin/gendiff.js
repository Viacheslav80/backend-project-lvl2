#!/usr/bin/env node

import compareFile from '..';

const program = require('commander');

program
  .version('1.2.0', '-v, --version', 'output the current version')
  .option('-f, --format [type]', 'Output format', 'json')
  .description('Compares two configuration files and shows a differences.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstFile, secondFile) => {
    compareFile(firstFile, secondFile);
  });
program.parse(process.argv);
