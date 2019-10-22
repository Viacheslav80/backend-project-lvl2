#!/usr/bin/env node

import compareFile from '..';

const program = require('commander');

const gendiff = () => {
  program
    .version('1.0.1', '-v, --version', 'output the current version')
    .option('-f, --format [type]', 'Output format', 'json')
    .description('Compares two configuration files and shows a differences.')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      compareFile(firstConfig, secondConfig);
    });
  program.parse(process.argv);
};
gendiff();
export default { gendiff };
