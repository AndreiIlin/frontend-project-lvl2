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
const getDifference = (filepath1, filepath2) => {
  const keys = _.sortBy(_.union(_.keys(filepath1), _.keys(filepath2)));
  return keys.map((key) => {
    const result = {};
    result.key = key;
    if (_.isObject(filepath1[key]) && _.isObject(filepath2[key])) {
      result.diff = 'changed';
      result.value = getDifference(filepath1[key], filepath2[key]);
    } else if (_.isObject(filepath1[key]) && !_.has(filepath2, key)) {
      result.diff = 'deleted';
      result.value = getNotComparedValue(filepath1[key]);
    } else if (_.isObject(filepath2[key]) && !_.has(filepath1, key)) {
      result.diff = 'added';
      result.value = getNotComparedValue(filepath2[key]);
    } else if (!_.has(filepath1, key)) {
      result.diff = 'added';
      result.value = filepath2[key];
    } else if (!_.has(filepath2, key)) {
      result.diff = 'deleted';
      result.value = filepath1[key];
    } else if (_.has(filepath1, key) && _.has(filepath2, key) && filepath1[key] !== filepath2[key]) {
      if (_.isObject(filepath1[key])) {
        result.diff = 'changed';
        result.deletedValue = getNotComparedValue(filepath1[key]);
        result.addedValue = filepath2[key];
      } else if (_.isObject(filepath2[key])) {
        result.diff = 'changed';
        result.deletedValue = filepath1[key];
        result.addedValue = getNotComparedValue(filepath2[key]);
      } else {
        result.diff = 'changed';
        result.deletedValue = filepath1[key];
        result.addedValue = filepath2[key];
      }
    } else {
      result.diff = 'unchanged';
      result.value = filepath2[key];
    }
    return result;
  });
};
export default getDifference;
