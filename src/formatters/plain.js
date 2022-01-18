import _ from 'lodash';

const getTextValue = (value) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case _.isPlainObject(value):
      return '[complex value]';
    default:
      return value;
  }
};
const plain = (content) => {
  const iter = (row, path) => row
    .map((value) => {
      switch (value.status) {
        case 'added':
          return `Property '${path + value.key}' was added with value: ${getTextValue(value.addedValue)}`;
        case 'deleted':
          return `Property '${path + value.key}' was removed`;
        case 'changed':
          return `Property '${path + value.key}' was updated. From ${getTextValue(value.deletedValue)} to ${getTextValue(value.addedValue)}`;
        case 'node':
          return iter(value.children, `${path + value.key}.`);
        default:
          return null;
      }
    })
    .filter((n) => n).join('\n');
  return iter(content, '');
};
export default plain;
