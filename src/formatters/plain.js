import _ from 'lodash';

const getValue = (value, row) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case _.get(row, 'value[0].diff') === 'notCompared':
    case _.get(row, 'addedValue[0].diff') === 'notCompared':
    case _.get(row, 'deletedValue[0].diff') === 'notCompared':
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
      switch (true) {
        case row.diff === 'added':
          return `Property '${path + row.key}' was added with value: ${getValue(row.value, row)}`;
        case row.diff === 'deleted':
          return `Property '${path + row.key}' was removed`;
        case _.has(row, 'deletedValue'):
          return `Property '${path + row.key}' was updated. From ${getValue(row.deletedValue, row)} to ${getValue(row.addedValue, row)}`;
        default:
          return iter(row.value, `${path + row.key}.`);
      }
    }
    return null;
  };
  return iter(content, '');
};
export default plain;
