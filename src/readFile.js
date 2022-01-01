import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import startParse from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readTestFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const format = (filename) => path.extname(filename);
const readParsedTestFile = (filename) => startParse(readTestFile(filename), format(filename));
const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const readParsedFile = (filepath) => startParse(readFile(filepath), format(filepath));
export default readParsedFile;
export { readTestFile, readParsedTestFile, readFile };
