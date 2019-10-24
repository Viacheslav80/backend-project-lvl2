import parse from './parsers';

const _ = require('lodash');

const arrayActions = [
  {
    check: (obj, key) => !_.has(obj, key),
    action: (obj, key, value) => `-${key}: ${value}`,
  },
  {
    check: (obj, key, value) => value === obj[key],
    action: (obj, key, value) => `${key}: ${value}`,
  },
  {
    check: (obj, key, value) => value !== obj[key],
    action: (obj, key, value) => `-${key}: ${value}\n+${key}: ${obj[key]}`,
  },
];
const getAction = (obj, key, value) => arrayActions.find(({ check }) => check(obj, key, value));
export default (filePath1, filePath2) => {
  const objBefore = parse(filePath1);
  const objAfter = parse(filePath2);
  const startString = Object.entries(objBefore).reduce((acc, [key, value]) => {
    const { action } = getAction(objAfter, key, value);
    return `${acc}\n${action(objAfter, key, value)}`;
  }, '');
  const resultString = Object.entries(objAfter)
    .reduce((acc, [key, value]) => ((_.has(objBefore, key)) ? acc : `${acc}\n+${key}: ${value}`), startString);
  //  console.log(`{${resultString}\n}`);
  return `{${resultString}\n}\n`;
};
