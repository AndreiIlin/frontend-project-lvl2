import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => JSON.parse(fs.readFileSync(getFixturePath(filename), 'utf-8'));
test('diff1', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file2.json');
  expect(genDiff(file1, file2)).toMatch('- age: 18\n+ age: 16\n  name: Ivan\n- student: true\n+ student: false');
});
test('diff2', () => {
  const file1 = readFile('file1.json');
  const file2 = readFile('file3.json');
  expect(genDiff(file1, file2)).toMatch('- age: 18\n- name: Ivan\n- student: true');
});
test('diff3', () => {
  const file1 = readFile('file3.json');
  const file2 = readFile('file2.json');
  expect(genDiff(file1, file2)).toMatch('+ age: 16\n+ name: Ivan\n+ student: false');
});
test('diff4', () => {
  const file1 = readFile('file3.json');
  const file2 = readFile('file3.json');
  expect(genDiff(file1, file2)).toMatch('');
});
