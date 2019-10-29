import parse from './parsers';
import deeper from './formatters/deeper';
import plain from './formatters/plain';

const _ = require('lodash');

const renderers = [
  {
    format: 'deep',
    renderer: deeper,
  },
  {
    format: 'plain',
    renderer: plain,
  },
  {
    format: 'json',
    renderer: JSON.stringify,
  },
];
const isObject = (item) => item instanceof Object;
const statuses = [
  {
    check: (before, after, key) => !(_.has(after, key)),
    status: 'deleted',
    action: (before, after, func) => (func ? [] : before),
  },
  {
    check: (before, after, key) => (isObject(before[key]) && isObject(after[key])),
    status: 'haveChildren',
    action: (before, after, func) => (func ? func(before, after) : before),
  },
  {
    check: (before, after, key) => before[key] === after[key],
    status: 'no changed',
    action: (before, after, func) => (func ? [] : before),
  },
  {
    check: (before, after, key) => !(_.has(before, key)),
    status: 'add',
    action: (before, after, func) => (func ? [] : after),
  },
  {
    check: (before, after, key) => before[key] !== after[key],
    status: 'changed',
    action: (before, after, func) => (func ? [] : before),
  },
];
const getRenderer = (requiredFormat) => renderers
  .find(({ format }) => requiredFormat === format);
const getActionAndStatus = (before, after, key) => statuses
  .find(({ check }) => check(before, after, key));
export default (filePath1, filePath2, format = 'deep') => {
  const objBefore = parse(filePath1);
  const objAfter = parse(filePath2);
  const iter = (before, after) => {
    const allKeys = _.union(Object.keys(before), Object.keys(after));
    const ast = allKeys.map((key) => {
      const { status, action } = getActionAndStatus(before, after, key);
      const itemAst = {
        name: key,
        status,
        value: action(before[key], after[key]),
        newValue: status === 'changed' ? after[key] : '',
        children: action(before[key], after[key], iter),
      };
      return itemAst;
    }, []);
    return ast;
  };
  const resultAst = iter(objBefore, objAfter);
  // console.log(JSON.stringify(resultAst, null, 2));
  const { renderer } = getRenderer(format);
  console.log(renderer(resultAst));
  return `${renderer(resultAst)}\n`;
};
