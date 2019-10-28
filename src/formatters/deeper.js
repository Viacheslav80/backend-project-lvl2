const stringify = (objToString, level = 1) => {
  const objectToString = Object.entries(objToString).reduce((acc, [key, value]) => `${acc}\n${' '.repeat(14 * level)}${key}: ${value}`, '');
  return `{${objectToString}\n${' '.repeat(10 * level)}}`;
};
const isObject = (value) => value instanceof Object;
const stringsAndStatuses = [
  {
    status: 'add',
    string: (name, value) => `+ ${name}: ${value}`,
  },
  {
    status: 'changed',
    string: (name, value, newValue, level) => `- ${name}: ${value}\n${' '
      .repeat(4 * level)}+ ${name}: ${newValue}`,
  },
  {
    status: 'no changed',
    string: (name, value) => `  ${name}: ${value}`,
  },
  {
    status: 'deleted',
    string: (name, value) => `- ${name}: ${value}`,
  },
];
const getString = (valueStatus) => stringsAndStatuses
  .find(({ status }) => valueStatus === status).string;
export default (ast) => {
  const iter = (treeAst, level = 1) => {
    const resultString = treeAst.reduce((acc, objAst) => {
      const { name, status, children } = objAst;
      if (children.length !== 0) {
        return `${acc}\n${' '.repeat(4 * level)}  ${name}: ${iter(children, level + 1)}`;
      }
      const value = isObject(objAst.value) ? stringify(objAst.value) : objAst.value;
      const newValue = isObject(objAst.newValue) ? stringify(objAst.newValue) : objAst.newValue;
      const string = getString(status)(name, value, newValue, level);
      return `${acc}\n${' '.repeat(4 * level)}${string}`;
    }, '');
    return `{${resultString}\n${' '.repeat(5 * (level - 1))}}`;
  };
  return iter(ast);
};
