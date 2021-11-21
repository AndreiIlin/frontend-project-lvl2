import * as path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

const startParse = (file) => {
  const format = path.extname(file);
  const data = fs.readFileSync(file, 'utf-8');
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};
export default startParse;
