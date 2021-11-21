import _ from 'lodash';

const getCommonFile = (file1, file2) => {
  const sortedFile1 = _.sortBy(Object.entries(file1));
  const sortedFile2 = _.sortBy(Object.entries(file2));
  const commonFile = _.uniqWith(_.concat(sortedFile1, sortedFile2), _.isEqual);
  return commonFile.sort((a, b) => {
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    return 0;
  });
};
const genDiff = (file1, file2) => {
  const getDifference = getCommonFile(file1, file2).reduce((acc, data) => {
    const [key, value] = data;
    if (file1[key] === file2[key]) {
      acc.push(`  ${key}: ${value}`);
    } else {
      file1[key] === value ? acc.push(`- ${key}: ${value}`) : acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, []);
  return getDifference.join('\n');
};
export default genDiff;
