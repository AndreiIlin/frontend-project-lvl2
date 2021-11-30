import _ from 'lodash';

const stylish = (file) => {
  const replacer = ' ';
  const spaceCount = 4;
  let prevDepth = 1;
  let result = file.reduce((acc, data) => {
    const indentWithSign = replacer.repeat((data.depth * spaceCount) - 2);
    const indentWithoutSign = replacer.repeat(data.depth * spaceCount);
    if (prevDepth - data.depth > 0) {
      for (let i = prevDepth; i > data.depth; i -= 1) {
        acc += `${replacer.repeat((i - 1) * spaceCount)}}\n`;
      }
    }
    if (_.has(data, 'value') && _.has(data, 'sign')) {
      if (data.sign === '+') {
        acc += `${indentWithSign}+ ${data.key}: ${data.value}\n`;
      } else {
        acc += `${indentWithSign}- ${data.key}: ${data.value}\n`;
      }
    } else if (!_.has(data, 'sign') && !_.has(data, 'value')) {
      acc += `${indentWithoutSign}${data.key}: {\n`;
    } else if (!_.has(data, 'sign') && _.has(data, 'value')) {
      acc += `${indentWithoutSign}${data.key}: ${data.value}\n`;
    } else if (data.sign === '+') {
      acc += `${indentWithSign}+ ${data.key}: {\n`;
    } else {
      acc += `${indentWithSign}- ${data.key}: {\n`;
    }
    prevDepth = data.depth;
    return acc;
  }, '');
  for (let i = prevDepth; i > 0; i -= 1) {
    result += `${replacer.repeat((i - 1) * spaceCount)}}\n`;
  }
  return ['{', result].join('\n');
};
export default stylish;
