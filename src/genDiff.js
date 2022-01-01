import getDifference from './getDifference.js';
import readParsedFile from './readFile.js';
import getFormattedFile from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const difference = getDifference(readParsedFile(filepath1), readParsedFile(filepath2));
  return getFormattedFile(format, difference);
};
export default genDiff;
