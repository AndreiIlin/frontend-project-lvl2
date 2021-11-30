import _ from 'lodash';

const getCommonFile = (file1, file2) => {
  const sortedFile1 = _.sortBy(Object.keys(file1));
  const sortedFile2 = _.sortBy(Object.keys(file2));
  const commonFile = _.union(sortedFile1, sortedFile2);
  return _.sortBy(commonFile);
};
const getEntries = (value, depth, acc) => {
  Object
    .entries(value)
    .forEach(([key, val]) => {
      if (_.isObject(val)) {
        acc.push({
          key,
          depth: depth + 1,
        });
        getEntries(val, depth + 1, acc);
      } else {
        acc.push({
          key,
          value: val,
          depth: depth + 1,
        });
      }
    });
};
const getDifference = (file1, file2) => {
  const acc = [];
  const iter = (value1, value2, depth) => {
    const commonFile = getCommonFile(value1, value2);
    commonFile.forEach((key) => {
      if (!_.isObject(value1[key]) && !_.isObject(value2[key])) {
        if (value1[key] === value2[key]) {
          acc.push({
            key,
            value: value1[key],
            depth,
          });
        } else if (_.has(value1, key) && _.has(value2, key)) {
          acc.push({
            key,
            value: value1[key],
            sign: '-',
            depth,
          });
          acc.push({
            key,
            value: value2[key],
            sign: '+',
            depth,
          });
        } else if (_.has(value1, key)) {
          acc.push({
            key,
            value: value1[key],
            sign: '-',
            depth,
          });
        } else {
          acc.push({
            key,
            value: value2[key],
            sign: '+',
            depth,
          });
        }
      } else if (_.isObject(value1[key]) && _.isObject(value2[key])) {
        acc.push({
          key,
          depth,
        });
        iter(value1[key], value2[key], depth + 1);
      } else if (_.has(value1, key) && _.has(value2, key)) {
        if (_.isObject(value1)) {
          acc.push({
            key,
            sign: '-',
            depth,
          });
          getEntries(value1[key], depth, acc);
          acc.push({
            key,
            value: value2[key],
            sign: '+',
            depth,
          });
        } else {
          acc.push({
            key,
            value: value1[key],
            sign: '-',
            depth,
          });
          acc.push({
            key,
            sign: '+',
            depth,
          });
          getEntries(value2[key], depth, acc);
        }
      } else if (_.has(value1, key)) {
        acc.push({
          key,
          sign: '-',
          depth,
        });
        getEntries(value1[key], depth, acc);
      } else {
        acc.push({
          key,
          sign: '+',
          depth,
        });
        getEntries(value2[key], depth, acc);
      }
    });
    return acc;
  };
  return iter(file1, file2, 1);
};
export default getDifference;
