const fs = require('fs');
const _ = require('lodash');

export default (pathFile1, pathFile2) => {
  const objBefore = JSON.parse(fs.readFileSync(pathFile1, 'utf8'));
  const objAfter = JSON.parse(fs.readFileSync(pathFile2, 'utf8'));
  const str = Object.entries(objBefore).reduce((acc, [key, value]) => {
    if (_.has(objAfter, key)) {
      if (value === objAfter[key]) {
        return `${acc} ${key}: ${value}`;
      }
      return `${acc}\n-${key}: ${value}\n+${key}: ${objAfter[key]}`;
    }
    return `${acc}\n-${key}: ${value}`;
  }, '');
  const resultStr = Object.entries(objAfter)
    .reduce((acc, [key, value]) => ((_.has(objBefore, key)) ? acc : `${acc}\n+${key}: ${value}`), str);
  console.log(`{\n${resultStr}\n}`);
};
