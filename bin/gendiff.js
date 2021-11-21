#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import genDiff from '../src/genDiff.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(`{ \n${genDiff(
      JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src', filepath1), 'utf-8')),
      JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src', filepath2), 'utf-8')),
    )} \n}`);
  });
program.parse();
