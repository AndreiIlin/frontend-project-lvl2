import getDifference from './getDifference.js';
import parseAndReadFile from './readFile.js';
import getFormattedFile from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const difference = getDifference(parseAndReadFile(filepath1), parseAndReadFile(filepath2));
  return getFormattedFile(format, difference);
};
export default genDiff;
