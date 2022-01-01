import _ from 'lodash';

const getNotComparedValue = (value) => Object
  .entries(value)
  .map(([key, val]) => {
    if (_.isObject(val)) {
      return {
        key,
        diff: 'notCompared',
        value: getNotComparedValue(val),
      };
    }
    return {
      key,
      diff: 'notCompared',
      value: val,
    };
  });
const getDifference = (filepath1, filepath2) => {
  const keys = _.sortBy(_.union(_.keys(filepath1), _.keys(filepath2)));
  return keys.map((key) => {
    switch (true) {
      case _.isObject(filepath1[key]) && _.isObject(filepath2[key]):
        return {
          key,
          diff: 'changed',
          value: getDifference(filepath1[key], filepath2[key]),
        };
      case _.isObject(filepath1[key]) && !_.has(filepath2, key):
        return {
          key,
          diff: 'deleted',
          value: getNotComparedValue(filepath1[key]),
        };
      case _.isObject(filepath2[key]) && !_.has(filepath1, key):
        return {
          key,
          diff: 'added',
          value: getNotComparedValue(filepath2[key]),
        };
      case !_.has(filepath1, key):
        return {
          key,
          diff: 'added',
          value: filepath2[key],
        };
      case !_.has(filepath2, key):
        return {
          key,
          diff: 'deleted',
          value: filepath1[key],
        };
      case _.has(filepath1, key) && _.has(filepath2, key) && filepath1[key] !== filepath2[key]:
        switch (true) {
          case _.isObject(filepath1[key]):
            return {
              key,
              diff: 'changed',
              deletedValue: getNotComparedValue(filepath1[key]),
              addedValue: filepath2[key],
            };
          case _.isObject(filepath2[key]):
            return {
              key,
              diff: 'changed',
              deletedValue: filepath1[key],
              addedValue: getNotComparedValue(filepath2[key]),
            };
          default:
            return {
              key,
              diff: 'changed',
              deletedValue: filepath1[key],
              addedValue: filepath2[key],
            };
        }
      default:
        return {
          key,
          diff: 'unchanged',
          value: filepath2[key],
        };
    }
  });
};
export default getDifference;
