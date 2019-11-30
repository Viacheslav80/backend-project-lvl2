import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters/index';

const isObject = (item) => item instanceof Object;
const statuses = [
  {
    check: (before, after, key) => !(_.has(after, key)),
    status: 'deleted',
    getChildren: () => [],
    getValue: _.identity,
    getNewValue: () => '',
  },
  {
    check: (before, after, key) => (isObject(before[key]) && isObject(after[key])),
    status: 'haveChildren',
    getChildren: (before, after, func) => func(before, after),
    getValue: _.identity,
    getNewValue: _.identity,
  },
  {
    check: (before, after, key) => before[key] === after[key],
    status: 'no_changed',
    getChildren: () => [],
    getValue: _.identity,
    getNewValue: () => '',
  },
  {
    check: (before, after, key) => !(_.has(before, key)),
    status: 'add',
    getChildren: () => [],
    getValue: (before, after) => after,
    getNewValue: () => '',
  },
  {
    check: (before, after, key) => before[key] !== after[key],
    status: 'changed',
    getChildren: () => [],
    getValue: _.identity,
    getNewValue: _.identity,
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
      const current = getProperties(before, after, key);
      const itemAst = {
        name: key,
        status: current.status,
        oldValue: current.getValue(before[key], after[key]),
        newValue: current.getNewValue(after[key]),
        children: current.getChildren(before[key], after[key], iter),
      };
      return itemAst;
    });
    return ast;
  };
  const resultAst = iter(objBefore, objAfter);
  // console.log(JSON.stringify(resultAst, null, 2));
  // console.log(renderer[format](resultAst));
  return render(format, resultAst);
};
