#!/usr/bin/env node

const program = require('commander');

program
  .version('7.0.0.')
  .description('It is utility for finding differences in configuration files')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<firstConfig> <secondCOnfig>')
  .action((firstConfig, secondCOnfig) => {
    console.log(`${firstConfig} ${secondCOnfig}`);
  });

program.parse(process.argv);
