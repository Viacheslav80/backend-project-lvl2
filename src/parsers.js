import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};
export default (dataText, type) => mapping[type](dataText);
