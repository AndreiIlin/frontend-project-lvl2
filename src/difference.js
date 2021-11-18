import _ from 'lodash';

const genDiff = (file1, file2) => {
  const generalFile = [];
  const sortFile1 = _.sortBy(Object.entries(file1));
  sortFile1.map((data) => {
    const [key, value] = data;
    if (_.has(file2, key)) {
      file2[key] === value ? generalFile.push(`  ${key}: ${value}`) : generalFile.push(`- ${key}: ${value}`);
    } else {
      generalFile.push(`- ${key}: ${value}`);
    }
  });
  const sortFile2 = _.sortBy(Object.entries(file2));
  sortFile2.map((data) => {
    const [key, value] = data;
    if (_.has(file1, key)) {
      if (file1[key] !== value) {
        generalFile.push(`+ ${key}: ${value}`);
      }
    } else {
      generalFile.push(`+ ${key}: ${value}`);
    }
  });
  return generalFile.join('\n');
};
export default genDiff;
