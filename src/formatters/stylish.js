import _ from 'lodash';

const stylish = (content, replacer = '  ', spacesCount = 1) => {
  const iter = (row, depth) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    if (_.isArray(row)) {
      const lines = row.map((value) => iter(value, depth)).join('\n');
      return ['{', lines, `${bracketIndent}}`].join('\n');
    }
    if (_.isObject(row)) {
      switch (row.diff) {
        case 'changed':
        case 'unchanged':
        case 'notCompared':
          if (_.has(row, 'deletedValue')) {
            return [
              `${indent}- ${row.key}: ${iter(row.deletedValue, depth + 2)}`,
              `${indent}+ ${row.key}: ${iter(row.addedValue, depth + 2)}`,
            ].join('\n');
          }
          return `${indent}  ${row.key}: ${iter(row.value, depth + 2)}`;
        case 'deleted':
          return `${indent}- ${row.key}: ${iter(row.value, depth + 2)}`;
        case 'added':
          return `${indent}+ ${row.key}: ${iter(row.value, depth + 2)}`;
        default:
          return new Error(`Unknown diff value: '${row.diff}'!`);
      }
    }
    return row;
  };
  return iter(content, 1);
};
export default stylish;
