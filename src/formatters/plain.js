const isObject = (value) => value instanceof Object;
const statuses = {
  add: (name, value, newValue) => `Property '${name}' was added with value: ${newValue}`,
  changed: (name, value, newValue) => `Property '${name}' was updated. From ${value} to ${newValue}`,
  deleted: (name) => `Property '${name}' was removed`,
  no_changed: () => '',
  haveChildren: (name, oldValue, newValue, func, arg) => func(arg),
};

export default (ast) => {
  const iter = (treeAst, namePath) => {
    const stringArray = treeAst.reduce((acc, itemAst) => {
      const { status, children } = itemAst;
      const name = (namePath) ? `${namePath}.${itemAst.name}` : itemAst.name;
      const oldValue = isObject(itemAst.oldValue) ? '[complex value]' : itemAst.oldValue;
      const newValue = isObject(itemAst.newValue) ? '[complex value]' : itemAst.newValue;
      const string = statuses[status](name, oldValue, newValue, iter, children);
      return [...acc, string];
    }, []);
    return stringArray.join('\n').trim();
  };
  return iter(ast);
};
