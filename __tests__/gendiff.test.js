import gendiff from '../src';

const fs = require('fs');

const path = `${__dirname}/__fixtures__/`;
const str = fs.readFileSync(`${path}differences.md`, 'utf8');
test('gendiff', () => {
  expect(gendiff(`${path}before.json`, `${path}after.json`)).toEqual(str);
});
test('gendiff_yaml', () => {
  expect(gendiff(`${path}before.yml`, `${path}after.yml`)).toEqual(str);
});
