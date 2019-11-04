const stringify = (objToString, level = 1) => {
  const objectToString = Object.entries(objToString)
    .reduce((acc, [key, value]) => `${acc}\n${' '.repeat(8 * level)}${key}: ${value}`, '');
  return `{${objectToString}\n${' '.repeat(6 * level)}}`;
};
const isObject = (value) => value instanceof Object;
const stringsAndStatuses = [
  {
    status: 'add',
    string: (itemAst, oldValue) => `+ ${itemAst.name}: ${oldValue}`,
  },
  {
    status: 'changed',
    string: (itemAst, oldValue, newValue, level) => `- ${itemAst.name}: ${oldValue}\n${' '
      .repeat(5 * level)}+ ${itemAst.name}: ${newValue}`,
  },
  {
    status: 'no changed',
    string: (itemAst, oldValue) => `  ${itemAst.name}: ${oldValue}`,
  },
  {
    status: 'deleted',
    string: (itemAst, oldValue) => `- ${itemAst.name}: ${oldValue}`,
  },
  {
    status: 'haveChildren',
    string: (itemAst, oldValue, newValue, level, func) => `  ${itemAst.name}: ${func(itemAst
      .children, level + 1)}`,
  },
];
const getString = (valueStatus) => stringsAndStatuses
  .find(({ status }) => valueStatus === status).string;
export default (ast) => {
  const iter = (treeAst, level = 1) => {
    const resultString = treeAst.reduce((acc, itemAst) => {
      const { status } = itemAst;
      const oldValue = isObject(itemAst.oldValue) ? stringify(itemAst
        .oldValue, level) : itemAst.oldValue;
      const newValue = isObject(itemAst.newValue) ? stringify(itemAst
        .newValue, level) : itemAst.newValue;
      const string = getString(status)(itemAst, oldValue, newValue, level, iter);
      return `${acc}\n${' '.repeat(5 * level)}${string}`;
    }, '');
    return `{${resultString}\n${' '.repeat(6 * (level - 1))}}`;
  };
  return iter(ast);
};
