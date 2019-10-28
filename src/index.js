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
const statuses = [
  {
    check: (obj, key) => !_.has(obj, key),
    status: 'deleted',
  },
  {
    check: (obj, key, value) => value === obj[key],
    status: 'no changed',
  },
  {
    check: (obj, key, value) => value !== obj[key],
    status: 'changed',
  },
];
const getRenderer = (requiredFormat) => renderers
  .find(({ format }) => requiredFormat === format);
const getStatus = (obj, key, value) => statuses.find(({ check }) => check(obj, key, value));
const isObject = (item) => item instanceof Object;
export default (filePath1, filePath2, format = 'deep') => {
  const objBefore = parse(filePath1);
  const objAfter = parse(filePath2);
  const iter = (before, after) => {
    const array = Object.entries(before).reduce((acc, [key, value]) => {
      const item = {
        name: key,
        status: getStatus(after, key, value).status,
        value,
        newValue: '',
        children: (isObject(value) && isObject(after[key])) ? iter(value, after[key]) : [],
      };
      item.newValue = (item.status === 'changed') ? after[key] : '';
      return [...acc, item];
    }, []);
    //  console.log(array);
    const resultArray = Object.entries(after)
      .reduce((acc, [key, value]) => (_.has(before, key) ? acc : [...acc, {
        name: key,
        status: 'add',
        value,
        newValue: '',
        children: [],
      }]), array);
    return resultArray;
  };
  const resultAst = iter(objBefore, objAfter);
  // console.log(JSON.stringify(resultAst, null, 2));
  const { renderer } = getRenderer(format);
  console.log(renderer(resultAst));
  return `${renderer(resultAst)}\n`;
};
