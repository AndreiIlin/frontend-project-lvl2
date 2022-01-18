import path from 'path';
import fs from 'fs';
import startParse from './parsers.js';

export const format = (filename) => path.extname(filename).split('.').join('');
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const parseAndReadFile = (filepath) => startParse(readFile(filepath), format(filepath));
export default parseAndReadFile;
