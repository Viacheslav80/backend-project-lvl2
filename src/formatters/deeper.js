const stringify = (objToString, level = 1) => {
  const objectToString = Object.entries(objToString)
    .reduce((acc, [key, value]) => `${acc}\n${' '.repeat(8 * level)}${key}: ${value}`, '');
  return `{${objectToString}\n${' '.repeat(6 * level)}}`;
};
const isObject = (value) => value instanceof Object;
const statuses = {
  add: (itemAst, oldValue) => `+ ${itemAst.name}: ${oldValue}`,
  changed: (itemAst, oldValue, newValue, level) => `- ${itemAst.name}: ${oldValue}\n${' '
    .repeat(5 * level)}+ ${itemAst.name}: ${newValue}`,
  no_changed: (itemAst, oldValue) => `  ${itemAst.name}: ${oldValue}`,
  deleted: (itemAst, oldValue) => `- ${itemAst.name}: ${oldValue}`,
  haveChildren: (itemAst, oldValue, newValue, level, func) => `  ${itemAst
    .name}: ${func(itemAst.children, level + 1)}`,
};

export default (ast) => {
  const iter = (treeAst, level = 1) => {
    const resultString = treeAst.reduce((acc, itemAst) => {
      const { status } = itemAst;
      const oldValue = isObject(itemAst.oldValue) ? stringify(itemAst
        .oldValue, level) : itemAst.oldValue;
      const newValue = isObject(itemAst.newValue) ? stringify(itemAst
        .newValue, level) : itemAst.newValue;
      const string = statuses[status](itemAst, oldValue, newValue, level, iter);
      return `${acc}\n${' '.repeat(5 * level)}${string}`;
    }, '');
    return `{${resultString}\n${' '.repeat(6 * (level - 1))}}`;
  };
  return iter(ast);
};
