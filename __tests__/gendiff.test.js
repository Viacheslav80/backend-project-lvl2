import gendiff from '../src';

const fs = require('fs');

const path = `${__dirname}/__fixtures__/`;
const str = fs.readFileSync(`${path}differences.md`, 'utf8');
test.each([[`${path}before.json`, `${path}after.json`],
  [`${path}before.yml`, `${path}after.yml`],
  [`${path}before.ini`, `${path}after.ini`]])('gendiff', (file1, file2) => {
  expect(gendiff(file1, file2)).toEqual(str);
});
const str2 = fs.readFileSync(`${path}differences_2.md`, 'utf8');
test('deepObject', () => {
  expect(gendiff(`${path}beforeDeep.json`, `${path}afterDeep.json`)).toEqual(str2);
});
