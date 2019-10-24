import yaml from 'js-yaml';
//  import ini from 'ini';

const fs = require('fs');
const path = require('path');
const ini = require('ini');

const arrayParsers = [
  {
    parser: JSON.parse,
    check: (type) => (type === '.json') || (type === ''),
  },
  {
    parser: yaml.safeLoad,
    check: (type) => type === '.yml',
  },
  {
    parser: ini.parse,
    check: (type) => type === '.ini',
  },
];
const getParser = (extname) => {
  const { parser } = arrayParsers.find(({ check }) => check(extname));
  return parser;
};
export default (filePath) => {
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf8');
  const parse = getParser(ext);
  return parse(data);
};
