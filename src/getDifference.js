import _ from 'lodash';

const getDifference = (filepath1, filepath2) => {
  const keys = _.sortBy(_.union(_.keys(filepath1), _.keys(filepath2)));
  return keys.map((key) => {
    switch (true) {
      case !_.has(filepath1, key):
        return {
          key,
          status: 'added',
          addedValue: filepath2[key],
        };
      case !_.has(filepath2, key):
        return {
          key,
          status: 'deleted',
          deletedValue: filepath1[key],
        };
      case _.isPlainObject(filepath1[key]) && _.isPlainObject(filepath2[key]):
        return {
          key,
          status: 'node',
          children: getDifference(filepath1[key], filepath2[key]),
        };
      case filepath1[key] !== filepath2[key]:
        return {
          key,
          status: 'changed',
          deletedValue: filepath1[key],
          addedValue: filepath2[key],
        };
      default:
        return {
          key,
          status: 'unchanged',
          value: filepath2[key],
        };
    }
  });
};
export default getDifference;
