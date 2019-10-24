import gendiff from '../src';

const fs = require('fs');

const path = `${__dirname}/__fixtures__/`;
const str = fs.readFileSync(`${path}differences.md`, 'utf8');
test.each([[`${path}before.json`, `${path}after.json`],
  [`${path}before.yml`, `${path}after.yml`],
  [`${path}before.ini`, `${path}after.ini`]])('gendiff', (file1, file2) => {
  expect(gendiff(file1, file2)).toEqual(str);
});
