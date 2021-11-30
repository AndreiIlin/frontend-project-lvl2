import getDifference from './getDifference.js';
import readFile from './readFile.js';
import stylish from './formatter/stylish.js';

const genDiff = (file1, file2) => {
  const difference = getDifference(readFile(file1), readFile(file2));
  return stylish(difference);
};
export default genDiff;
