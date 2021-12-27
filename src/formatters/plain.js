import _ from 'lodash';

const isString = (value) => (typeof value === 'string' ? `'${value}'` : value);
const plain = (file) => {
  const iter = (row, path) => {
    if (_.isArray(row)) {
      return row
        .map((value) => iter(value, path))
        .filter((n) => n).join('\n');
    }
    if (_.isObject(row)) {
      if (_.get(row, 'value[0].diff') === 'notCompared') {
        row.value = ['[complex value]'];
      } else if (_.get(row, 'addedValue[0].diff') === 'notCompared') {
        row.addedValue = ['[complex value]'];
      } else if (_.get(row, 'deletedValue[0].diff') === 'notCompared') {
        row.deletedValue = ['[complex value]'];
      }
      if (row.diff === 'added') {
        return `Property '${path + row.key}' was added with value: ${isString(row.value)}`;
      }
      if (row.diff === 'deleted') {
        return `Property '${path + row.key}' was removed`;
      }
      if (_.has(row, 'deletedValue')) {
        return `Property '${path + row.key}' was updated. From ${isString(row.deletedValue)} to ${isString(row.addedValue)}`;
      }
      return iter(row.value, `${path + row.key}.`);
    }
    return null;
  };
  return iter(file, '');
};
export default plain;
