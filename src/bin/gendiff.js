#!/usr/bin/env node

import compareFile from '..';

const program = require('commander');

program
  .version('1.4.7', '-v, --version', 'output the current version')
  .option('-f, --format [type]', 'Output format', 'deep')
  .description('Compares two configuration files and shows a differences.')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstFile, secondFile, options) => {
    compareFile(firstFile, secondFile, options.format);
  });
program.parse(process.argv);
