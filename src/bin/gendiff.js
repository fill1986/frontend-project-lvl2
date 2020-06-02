#!/usr/bin/env node

import {
  parseFile, createAST, selectFormat,
} from '../index';
import program from '../module/commander';


const fileBeforeChange = parseFile(program.action().args[0]);
const fileAfterChange = parseFile(program.action().args[1]);
const AST = createAST(fileBeforeChange, fileAfterChange);
const formatersFunctions = selectFormat(program.action().format);
console.log(formatersFunctions(AST));
