import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters/index';

const statuses = [
  {
    check: (before, after, key) => !(_.has(after, key)),
    status: 'deleted',
    process: () => ({ newValue: '' }),
  },
  {
    check: (before, after, key) => (_.isObject(before[key]) && _.isObject(after[key])),
    status: 'haveChildren',
    process: (before, after, func) => ({ children: func(before, after) }),
  },
  {
    check: (before, after, key) => before[key] === after[key],
    status: 'no_changed',
    process: () => ({}),
  },
  {
    check: (before, after, key) => !(_.has(before, key)),
    status: 'add',
    process: () => ({ oldValue: '' }),
  },
  {
    check: (before, after, key) => before[key] !== after[key],
    status: 'changed',
    process: () => ({}),
  },
];
const getProperties = (before, after, key) => statuses
  .find(({ check }) => check(before, after, key));
const getType = (filePath) => path.extname(filePath).slice(1);
const getText = (filePath) => fs.readFileSync(filePath, 'utf8');
export default (filePath1, filePath2, format = 'deep') => {
  const objBefore = parse(getText(filePath1), getType(filePath1));
  const objAfter = parse(getText(filePath2), getType(filePath2));
  const iter = (before, after) => {
    const allKeys = _.union(Object.keys(before), Object.keys(after));
    const ast = allKeys.map((key) => {
      const { status, process } = getProperties(before, after, key);
      const itemAst = {
        name: key,
        status,
        oldValue: before[key],
        newValue: after[key],
        children: [],
      };
      const changeItem = process(before[key], after[key], iter);
      return { ...itemAst, ...changeItem };
    });
    return ast;
  };
  const resultAst = iter(objBefore, objAfter);
  // console.log(JSON.stringify(resultAst, null, 2));
  // console.log(renderer[format](resultAst));
  return render(format, resultAst);
};
