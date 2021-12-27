import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import startParse from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
export const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const format = (filename) => path.extname(filename);
const readParsedFile = (filename) => startParse(readFile(filename), format(filename));
export default readParsedFile;
