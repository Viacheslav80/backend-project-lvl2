import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

const mapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};
const getData = (filePath) => fs.readFileSync(filePath, 'utf8');
const parse = (type, data) => mapping[type](data);

export default (filePath) => {
  const data = getData(filePath);
  const type = path.extname(filePath).slice(1);
  return parse(type, data);
};
