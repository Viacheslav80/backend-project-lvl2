import path from 'path';
import fs from 'fs';
import gendiff from '../src';

const name = 'DeepTextDifferences';

const getFixturePath = (nameFile) => path.join(__dirname, '..', '__fixtures__', nameFile);
const getResult = (nameFile) => fs.readFileSync(getFixturePath(nameFile), 'utf8').trim();

test.each([['beforeDeep.yml', 'afterDeep.yml', name],
  ['beforeDeep.ini', 'afterDeep.ini', name],
  ['beforeDeep.json', 'afterDeep.json', name],
])('gendiff', (fileBefore, fileAfter, fileResult) => {
  const filePathBefore = getFixturePath(fileBefore);
  const filePathAfter = getFixturePath(fileAfter);
  expect(gendiff(filePathBefore, filePathAfter)).toEqual(getResult(fileResult));
});
test.each([['plain', 'PlainTextDifferences'], ['json', 'JsonTextDifferences'],
])('gendiff_output_plain_and_json', (format, fileName) => {
  const pathBefore = getFixturePath('before.json');
  const pathAfter = getFixturePath('after.json');
  expect(gendiff(pathBefore, pathAfter, format)).toEqual(getResult(fileName));
});
