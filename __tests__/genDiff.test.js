import path from 'path';
import fs from 'fs';
import getDifference from '../src/getDifference.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import startParse from '../src/parsers.js';
import { format } from '../src/readFile.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readTestFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const parseAndReadTestFile = (filename) => startParse(readTestFile(filename), format(filename));
const files = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.json', 'file2.yaml'],
];
describe('Formatter stylish', () => {
  test.each(files)('Format test files: %s and %s', (file1, file2) => {
    expect(stylish(getDifference(parseAndReadTestFile(file1), parseAndReadTestFile(file2)))).toEqual(readTestFile('stylish.txt'));
  });
});
describe('Formatter plain', () => {
  test.each(files)('Format test files: %s and %s', (file1, file2) => {
    expect(plain(getDifference(parseAndReadTestFile(file1), parseAndReadTestFile(file2)))).toEqual(readTestFile('plain.txt'));
  });
});
describe('Formatter json', () => {
  test.each(files)('Format test files: %s and %s', (file1, file2) => {
    expect(JSON.stringify(getDifference(parseAndReadTestFile(file1), parseAndReadTestFile(file2)))).toEqual(readTestFile('json.txt'));
  });
});
