import _ from 'lodash';

const genDiff = (file1, file2) => {
  const sortFile1 = _.sortBy(Object.entries(file1));
  const firstFileDiff = sortFile1.reduce((acc, data) => {
    const [key, value] = data;
    if (_.has(file2, key)) {
      file2[key] === value ? acc.push(`  ${key}: ${value}`) : acc.push(`- ${key}: ${value}`);
    } else {
      acc.push(`- ${key}: ${value}`);
    }
    return acc;
  }, []);
  const sortFile2 = _.sortBy(Object.entries(file2));
  const secondFileDiff = sortFile2.reduce((acc, data) => {
    const [key, value] = data;
    if (_.has(file1, key)) {
      if (file1[key] !== value) {
        acc.push(`+ ${key}: ${value}`);
      }
    } else {
      acc.push(`+ ${key}: ${value}`);
    }
    return acc;
  }, firstFileDiff);
  return secondFileDiff.join('\n');
};
export default genDiff;
