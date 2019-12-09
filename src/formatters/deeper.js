import _ from 'lodash';

const getIndent = (level) => ' '.repeat(4 * level);
const stringify = (inputValue, level = 1) => {
  if (!(_.isObject(inputValue))) {
    return inputValue;
  }
  const objectToString = Object.entries(inputValue)
    .map(([key, value]) => `${getIndent(level + 1)}    ${key}: ${value}`).join('\n');
  return `{\n${objectToString}\n${getIndent(level + 1)}}`;
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
  const render = (treeAst, level = 0) => {
    const resultString = treeAst.map((itemAst) => {
      const {
        name, status, oldValue, newValue, children,
      } = itemAst;
      const oldValue1 = stringify(oldValue, level);
      const newValue1 = stringify(newValue, level);
      const string = statuses[status](name, oldValue1, newValue1, level, render, children);
      return `${getIndent(level)}${string}`;
    }).join('\n');
    return `{\n${resultString}\n${getIndent(level)}}`;
  };
  return render(ast);
};
