#!/usr/bin/env node

import { gendiff, parseFile } from '../index';
import program from '../module/commander';

program.parse(process.argv);
const fileBeforeChange = parseFile(program.action().args[0]);
const fileAfterChange = parseFile(program.action().args[1]);

console.log(gendiff(fileBeforeChange, fileAfterChange));
