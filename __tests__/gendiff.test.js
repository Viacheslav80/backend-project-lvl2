import path from 'path';
import fs from 'fs';
import gendiff from '../src';

const name = 'SimpleTextDifferences';

const getFixturePath = (nameFile) => path.join(__dirname, '..', '__fixtures__', nameFile);
const getResult = (nameFile) => fs.readFileSync(getFixturePath(nameFile), 'utf8');

test.each([['before.json', 'after.json', name],
  ['before.yml', 'after.yml', name],
  ['before.ini', 'after.ini', name],
  ['beforeDeep.json', 'afterDeep.json', 'DeepTextDifferences'],
])('gendiff', (fileBefore, fileAfter, fileName) => {
  const filePathBefore = getFixturePath(fileBefore);
  const filePathAfter = getFixturePath(fileAfter);
  expect(gendiff(filePathBefore, filePathAfter)).toEqual(getResult(fileName));
});
test.each([['plain', 'PlainTextDifferences'], ['json', 'JsonTextDifferences'],
])('gendiff_output_plain_and_json', (format, fileName) => {
  const pathBefore = getFixturePath('before.json');
  const pathAfter = getFixturePath('after.json');
  expect(gendiff(pathBefore, pathAfter, format)).toEqual(getResult(fileName));
});
