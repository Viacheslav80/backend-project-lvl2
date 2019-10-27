const isObject = (value) => value instanceof Object;
const stringsAndStatuses = [
  {
    status: 'add',
    string: (name, value) => `Property '${name}' was added with value: ${value}`,
  },
  {
    status: 'changed',
    string: (name, value, newValue) => `Property '${name}' was updated. From ${value} to ${newValue}`,
  },
  {
    status: 'deleted',
    string: (name) => `Property '${name}' was removed`,
  },
];
const getString = (valueStatus) => stringsAndStatuses
  .find(({ status }) => valueStatus === status).string;
export default (ast) => {
  const iter = (treeAst, namePath) => {
    const stringArray = treeAst.reduce((acc, objAst) => {
      const { status, children } = objAst;
      const name = (namePath) ? `${namePath}.${objAst.name}` : objAst.name;
      if (children.length !== 0) {
        return [...acc, iter(children, name)];
      }
      if (status === 'no changed') return acc;
      const value = isObject(objAst.value) ? '[complex value]' : objAst.value;
      const newValue = isObject(objAst.newValue) ? '[complex value]' : objAst.newValue;
      const string = getString(status)(name, value, newValue);
      return [...acc, string];
    }, []);
    return stringArray.join('\n');
  };
  return `${iter(ast)}\n`;
};
