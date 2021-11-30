import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import startParse from './parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => startParse(getFixturePath(filename));
export default readFile;
