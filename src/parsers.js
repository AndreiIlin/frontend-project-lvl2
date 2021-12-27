import yaml from 'js-yaml';

const startParse = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(file);
  }
  return null;
};
export default startParse;
