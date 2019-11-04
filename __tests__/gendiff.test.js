import fs from 'fs';
import gendiff from '../src';

const path = './__fixtures__/';
const text = fs.readFileSync(`${path}SimpleTextDifferences`, 'utf8');
const textDeep = fs.readFileSync(`${path}DeepTextDifferences`, 'utf8');
const textPlain = fs.readFileSync(`${path}PlainTextDifferences`, 'utf8');
const textJson = fs.readFileSync(`${path}JsonTextDifferences`, 'utf8');
test.each([[`${path}before.json`, `${path}after.json`, text],
  [`${path}before.yml`, `${path}after.yml`, text],
  [`${path}before.ini`, `${path}after.ini`, text],
  [`${path}beforeDeep.json`, `${path}afterDeep.json`, textDeep],
])('gendiff', (pathFile1, pathFile2, textResult) => {
  expect(gendiff(pathFile1, pathFile2)).toEqual(textResult);
});
test.each([['plain', textPlain], ['json', textJson],
])('gendiff_output_plain_and_json', (format, textResult) => {
  expect(gendiff(`${path}before.json`, `${path}after.json`, format)).toEqual(textResult);
});
