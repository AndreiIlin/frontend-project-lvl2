import getDifference from '../src/getDifference.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import readParsedFile, { readFile } from '../src/readFile.js';

test('stylish JSON', () => {
  const actual = stylish(getDifference(readParsedFile('file1.json'), readParsedFile('file2.json')));
  const expected = readFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('stylish YAML', () => {
  const actual = stylish(getDifference(readParsedFile('file1.yaml'), readParsedFile('file2.yaml')));
  const expected = readFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('stylish JSON & YAML', () => {
  const actual = stylish(getDifference(readParsedFile('file1.json'), readParsedFile('file2.yaml')));
  const expected = readFile('stylish.txt');
  expect(actual).toEqual(expected);
});
test('plain JSON', () => {
  const actual = plain(getDifference(readParsedFile('file1.json'), readParsedFile('file2.json')));
  const expected = readFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('plain YAML', () => {
  const actual = plain(getDifference(readParsedFile('file1.yaml'), readParsedFile('file2.yaml')));
  const expected = readFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('plain JSON & YAML', () => {
  const actual = plain(getDifference(readParsedFile('file1.json'), readParsedFile('file2.yaml')));
  const expected = readFile('plain.txt');
  expect(actual).toEqual(expected);
});
test('json JSON', () => {
  const actual = JSON.stringify(getDifference(readParsedFile('file1.json'), readParsedFile('file2.json')));
  const expected = readFile('json.txt');
  expect(actual).toEqual(expected);
});
test('json YAML', () => {
  const actual = JSON.stringify(getDifference(readParsedFile('file1.yaml'), readParsedFile('file2.yaml')));
  const expected = readFile('json.txt');
  expect(actual).toEqual(expected);
});
test('json JSON & YAML', () => {
  const actual = JSON.stringify(getDifference(readParsedFile('file1.json'), readParsedFile('file2.yaml')));
  const expected = readFile('json.txt');
  expect(actual).toEqual(expected);
});
