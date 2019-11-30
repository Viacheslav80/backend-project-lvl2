import deeper from './deeper';
import plain from './plain';

const renderer = {
  deep: deeper,
  plain,
  json: JSON.stringify,
};
export default (format, ast) => renderer[format](ast);
