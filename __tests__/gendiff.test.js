import gendiff from '../src';

const fs = require('fs');

const path = `${__dirname}/__fixtures__/`;
const str = fs.readFileSync(`${path}differences.md`, 'utf8');
const str2 = fs.readFileSync(`${path}differences_2.md`, 'utf8');
const str3 = fs.readFileSync(`${path}differences_3.md`, 'utf8');
const str4 = fs.readFileSync(`${path}differences_4.md`, 'utf8');
test.each([[`${path}before.json`, `${path}after.json`, str],
  [`${path}before.yml`, `${path}after.yml`, str],
  [`${path}before.ini`, `${path}after.ini`, str],
  [`${path}beforeDeep.json`, `${path}afterDeep.json`, str2],
])('gendiff', (file1, file2, string) => {
  expect(gendiff(file1, file2)).toEqual(string);
});
test.each([['plain', str3], ['json', str4],
])('gendiff_output_plain_and_json', (format, string) => {
  expect(gendiff(`${path}before.json`, `${path}after.json`, format)).toEqual(string);
});
