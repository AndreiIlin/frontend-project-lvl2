import _ from 'lodash';

const getIndent = (depth) => {
  const replacer = '    ';
  const currentIndent = replacer.repeat(depth);
  const bracketIndent = replacer.repeat(depth - 1);
  return [currentIndent, bracketIndent];
};
const getValue = (row, depth) => {
  if (_.isPlainObject(row)) {
    const [currentIndent, bracketIndent] = getIndent(depth);
    const notComparedLines = Object.entries(row).map(([key, val]) => `${currentIndent}${key}: ${getValue(val, depth + 1)}`);
    return ['{', ...notComparedLines, `${bracketIndent}}`].join('\n');
  }
  return row;
};
const stylish = (content) => {
  const iter = (row, depth) => {
    const [currentIndent, bracketIndent] = getIndent(depth);
    const lines = row.map((value) => {
      switch (value.status) {
        case 'changed':
          return [
            `${currentIndent.slice(0, -2)}- ${value.key}: ${getValue(value.deletedValue, depth + 1)}`,
            `${currentIndent.slice(0, -2)}+ ${value.key}: ${getValue(value.addedValue, depth + 1)}`,
          ].join('\n');
        case 'deleted':
          return `${currentIndent.slice(0, -2)}- ${value.key}: ${getValue(value.deletedValue, depth + 1)}`;
        case 'added':
          return `${currentIndent.slice(0, -2)}+ ${value.key}: ${getValue(value.addedValue, depth + 1)}`;
        case 'node':
          return `${currentIndent}${value.key}: ${iter(value.children, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}${value.key}: ${getValue(value.value, depth + 1)}`;
        default:
          return new Error(`Unknown status ${value.status}`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(content, 1);
};
export default stylish;
