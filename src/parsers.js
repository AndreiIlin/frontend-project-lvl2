import yaml from 'js-yaml';

const startParse = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      return new Error(`Unknown format '${format}'`);
  }
};
export default startParse;
