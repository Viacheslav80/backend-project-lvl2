const isObject = (value) => value instanceof Object;
const statuses = {
  add: (name, value) => `Property '${name}' was added with value: ${value}`,
  changed: (name, value, newValue) => `Property '${name}' was updated. From ${value} to ${newValue}`,
  deleted: (name) => `Property '${name}' was removed`,
};

export default (ast) => {
  const iter = (treeAst, namePath) => {
    const stringArray = treeAst.reduce((acc, itemAst) => {
      const { status, children } = itemAst;
      const name = (namePath) ? `${namePath}.${itemAst.name}` : itemAst.name;
      if (status === 'haveChildren') {
        return [...acc, iter(children, name)];
      }
      if (status === 'no_changed') {
        return acc;
      }
      const value = isObject(itemAst.oldValue) ? '[complex value]' : itemAst.oldValue;
      const newValue = isObject(itemAst.newValue) ? '[complex value]' : itemAst.newValue;
      const string = statuses[status](name, value, newValue);
      return [...acc, string];
    }, []);
    return stringArray.join('\n');
  };
  return iter(ast);
};
