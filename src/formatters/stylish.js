import _ from 'lodash';

const getIndent = (depth) => {
  const spacesCount = 1;
  const replacer = '  ';
  const indentSize = depth * spacesCount;
  const CurrentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  return [CurrentIndent, bracketIndent];
};
const getValue = (row, depth) => {
  if (_.isPlainObject(row)) {
    const [CurrentIndent, bracketIndent] = getIndent(depth);
    const notComparedLines = Object.entries(row).map(([key, val]) => `${CurrentIndent}  ${key}: ${getValue(val, depth + 2)}`);
    return ['{', ...notComparedLines, `${bracketIndent}}`].join('\n');
  }
  return row;
};
const stylish = (content) => {
  const iter = (row, depth) => {
    const [CurrentIndent, bracketIndent] = getIndent(depth);
    const lines = row.map((value) => {
      switch (value.status) {
        case 'changed':
          return [
            `${CurrentIndent}- ${value.key}: ${getValue(value.deletedValue, depth + 2)}`,
            `${CurrentIndent}+ ${value.key}: ${getValue(value.addedValue, depth + 2)}`,
          ].join('\n');
        case 'deleted':
          return `${CurrentIndent}- ${value.key}: ${getValue(value.deletedValue, depth + 2)}`;
        case 'added':
          return `${CurrentIndent}+ ${value.key}: ${getValue(value.addedValue, depth + 2)}`;
        case 'node':
          return `${CurrentIndent}  ${value.key}: ${iter(value.children, depth + 2)}`;
        case 'unchanged':
          return `${CurrentIndent}  ${value.key}: ${getValue(value.value, depth + 2)}`;
        default:
          return new Error(`Unknown status ${value.status}`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(content, 1);
};
export default stylish;
