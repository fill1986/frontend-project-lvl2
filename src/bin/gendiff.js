#!/usr/bin/env node

import gendiff from '../index';
import program from '../module/commander';

program.parse(process.argv); // !! импортнуть через точку вх
console.log(program.firstConfig);
console.log(gendiff());
