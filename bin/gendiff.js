#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import * as path from 'path';
import process from 'process';
import genDiff from '../src/difference.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    filepath1 = readFileSync(path.resolve(process.cwd(), './src/file1.json'), 'utf-8');
    filepath2 = readFileSync(path.resolve(process.cwd(), './src/file2.json'), 'utf-8');
    console.log(`{ \n${genDiff(JSON.parse(filepath1), JSON.parse(filepath2))} \n}`);
  });
program.parse();
