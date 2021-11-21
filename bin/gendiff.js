#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'path';
import process from 'process';
import genDiff from '../src/genDiff.js';
import startParse from '../src/parsers.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(`{ \n${genDiff(
      startParse(path.resolve(process.cwd(), 'src', filepath1)),
      startParse(path.resolve(process.cwd(), 'src', filepath2)),
    )} \n}`);
  });
program.parse();
