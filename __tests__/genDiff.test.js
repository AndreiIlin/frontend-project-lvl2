import path from 'path';
import fs from 'fs';
import getDifference from '../src/getDifference.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import startParse from '../src/parsers.js';
import { format } from '../src/readFile.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const readTestFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const readParsedTestFile = (filename) => startParse(readTestFile(filename), format(filename));
test('stylish JSON', () => {
  const actual = stylish(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.json')));
  const expected = readTestFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('stylish YAML', () => {
  const actual = stylish(getDifference(readParsedTestFile('file1.yml'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('stylish JSON & YAML', () => {
  const actual = stylish(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('plain JSON', () => {
  const actual = plain(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.json')));
  const expected = readTestFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('plain YAML', () => {
  const actual = plain(getDifference(readParsedTestFile('file1.yml'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('plain JSON & YAML', () => {
  const actual = plain(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('json JSON', () => {
  const actual = JSON.stringify(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.json')));
  const expected = readTestFile('json.txt');
  expect(actual).toEqual(expected);
});
test('json YAML', () => {
  const actual = JSON.stringify(getDifference(readParsedTestFile('file1.yml'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('json.txt');
  expect(actual).toEqual(expected);
});
test('json JSON & YAML', () => {
  const actual = JSON.stringify(getDifference(readParsedTestFile('file1.json'), readParsedTestFile('file2.yaml')));
  const expected = readTestFile('json.txt');
  expect(actual).toEqual(expected);
});
