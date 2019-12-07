import _ from 'lodash';

const stringify = (objToString, level = 1) => {
  const objectToString = Object.entries(objToString)
    .reduce((acc, [key, value]) => `${acc}\n${' '.repeat(4 * (level + 1))}    ${key}: ${value}`, '');
  return `{${objectToString}\n${' '.repeat(4 * (level + 1))}}`;
};
const statuses = {
  added: (name, oldValue, newValue) => `  + ${name}: ${newValue}`,
  changed: (name, oldValue, newValue, level) => `  - ${name}: ${oldValue}\n${' '
    .repeat(4 * level)}  + ${name}: ${newValue}`,
  no_changed: (name, oldValue) => `    ${name}: ${oldValue}`,
  deleted: (name, oldValue) => `  - ${name}: ${oldValue}`,
  haveChildren: (name, oldValue, newValue, level, func, children) => `    ${name}: ${func(children, level + 1)}`,
};

export default (ast) => {
  const iter = (treeAst, level = 0) => {
    const resultString = treeAst.reduce((acc, itemAst) => {
      const {
        name, status, oldValue, newValue, children,
      } = itemAst;
      const oldValue1 = _.isObject(oldValue) ? stringify(oldValue, level) : oldValue;
      const newValue1 = _.isObject(newValue) ? stringify(newValue, level) : newValue;
      const string = statuses[status](name, oldValue1, newValue1, level, iter, children);
      return `${acc}\n${' '.repeat(4 * level)}${string}`;
    }, '');
    return `{${resultString}\n${' '.repeat(4 * (level))}}`;
  };
  return iter(ast);
};
