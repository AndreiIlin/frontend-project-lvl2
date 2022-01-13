import _ from 'lodash';

const getValue = (value) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case _.isObject(value):
      return '[complex value]';
    default:
      return value;
  }
};
const plain = (content) => {
  const iter = (row, path) => {
    if (_.isArray(row)) {
      return row
        .map((value) => iter(value, path))
        .filter((n) => n).join('\n');
    }
    if (_.isObject(row)) {
      switch (row.status) {
        case 'added':
          return `Property '${path + row.key}' was added with value: ${getValue(row.addedValue)}`;
        case 'deleted':
          return `Property '${path + row.key}' was removed`;
        case 'changed':
          return `Property '${path + row.key}' was updated. From ${getValue(row.deletedValue)} to ${getValue(row.addedValue)}`;
        default:
          return iter(row.children, `${path + row.key}.`);
      }
    }
    return null;
  };
  return iter(content, '');
};
export default plain;
