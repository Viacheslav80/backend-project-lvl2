import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};
const parse = (type, data) => mapping[type](data);
export default (dataText, filePath) => {
  const type = path.extname(filePath).slice(1);
  return parse(type, dataText);
};
