import program from 'commander';

program
  .version('4.0.1.')
  .description('It is utility for finding differences in configuration files')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<firstConfig> <secondCOnfig> [format]');
program.parse(process.argv);

export default program;
