import gendiff from '../src';

const fs = require('fs');

const path = `${__dirname}/__fixtures__/`;
const str = fs.readFileSync(`${path}differences.md`, 'utf8');
test('gendiff', () => {
  expect(gendiff(`${path}before.json`, `${path}after.json`)).toEqual(str);
});
