import _ from 'lodash';

const stringify = (inputValue) => (_.isObject(inputValue) ? '[complex value]' : inputValue);
const statuses = {
  added: (name, value, newValue) => `Property '${name}' was added with value: ${newValue}`,
  changed: (name, value, newValue) => `Property '${name}' was updated. From ${value} to ${newValue}`,
  deleted: (name) => `Property '${name}' was removed`,
  no_changed: () => null,
  haveChildren: (name, oldValue, newValue, func, arg) => func(arg),
};

export default (ast) => {
  const render = (treeAst, namePath) => {
    const renderStrings = treeAst.map((itemAst) => {
      const { status, children } = itemAst;
      const name = (namePath) ? `${namePath}.${itemAst.name}` : itemAst.name;
      const oldValue = stringify(itemAst.oldValue);
      const newValue = stringify(itemAst.newValue);
      const result = statuses[status](name, oldValue, newValue, render, children);
      return result;
    });
    return renderStrings.join('\n').trim();
  };
  return render(ast);
};
