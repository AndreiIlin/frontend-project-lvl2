import getDifference from './getDifference.js';
import readParsedFile from './readFile.js';
import formatFile from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const difference = getDifference(readParsedFile(file1), readParsedFile(file2));
  return formatFile(format, difference);
};
export default genDiff;
