import _ from 'lodash';

const getNotComparedValue = (value) => Object
  .entries(value)
  .map(([key, val]) => {
    const result = {};
    result.key = key;
    if (_.isObject(val)) {
      result.diff = 'notCompared';
      result.value = getNotComparedValue(val);
    } else {
      result.diff = 'notCompared';
      result.value = val;
    }
    return result;
  });
const getDifference = (file1, file2) => {
  const keys = _.sortBy(_.union(_.keys(file1), _.keys(file2)));
  return keys.map((key) => {
    const result = {};
    result.key = key;
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      result.diff = 'changed';
      result.value = getDifference(file1[key], file2[key]);
    } else if (_.isObject(file1[key]) && !_.has(file2, key)) {
      result.diff = 'deleted';
      result.value = getNotComparedValue(file1[key]);
    } else if (_.isObject(file2[key]) && !_.has(file1, key)) {
      result.diff = 'added';
      result.value = getNotComparedValue(file2[key]);
    } else if (!_.has(file1, key)) {
      result.diff = 'added';
      result.value = file2[key];
    } else if (!_.has(file2, key)) {
      result.diff = 'deleted';
      result.value = file1[key];
    } else if (_.has(file1, key) && _.has(file2, key) && file1[key] !== file2[key]) {
      if (_.isObject(file1[key])) {
        result.diff = 'changed';
        result.deletedValue = getNotComparedValue(file1[key]);
        result.addedValue = file2[key];
      } else if (_.isObject(file2[key])) {
        result.diff = 'changed';
        result.deletedValue = file1[key];
        result.addedValue = getNotComparedValue(file2[key]);
      } else {
        result.diff = 'changed';
        result.deletedValue = file1[key];
        result.addedValue = file2[key];
      }
    } else {
      result.diff = 'unchanged';
      result.value = file2[key];
    }
    return result;
  });
};
export default getDifference;
