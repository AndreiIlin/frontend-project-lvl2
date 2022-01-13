import _ from 'lodash';

const stylish = (content, replacer = '  ', spacesCount = 1) => {
  const iter = (row, depth) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    if (_.isArray(row)) {
      const linesOfArrays = row.map((value) => iter(value, depth)).join('\n');
      return ['{', linesOfArrays, `${bracketIndent}}`].join('\n');
    }
    if (_.isObject(row)) {
      const linesOfObjects = Object.entries(row).map(([key, val]) => `${indent}  ${key}: ${iter(val, depth + 2)}`).join('\n');
      switch (row.status) {
        case 'changed':
          return [
            `${indent}- ${row.key}: ${iter(row.deletedValue, depth + 2)}`,
            `${indent}+ ${row.key}: ${iter(row.addedValue, depth + 2)}`,
          ].join('\n');
        case 'deleted':
          return `${indent}- ${row.key}: ${iter(row.deletedValue, depth + 2)}`;
        case 'added':
          return `${indent}+ ${row.key}: ${iter(row.addedValue, depth + 2)}`;
        case 'node':
          return `${indent}  ${row.key}: ${iter(row.children, depth + 2)}`;
        case 'unchanged':
          return `${indent}  ${row.key}: ${iter(row.value, depth + 2)}`;
        default:
          return ['{', linesOfObjects, `${bracketIndent}}`].join('\n');
      }
    }
    return row;
  };
  return iter(content, 1);
};
export default stylish;
