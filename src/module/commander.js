import program from 'commander';

program
  .version('4.0.1.')
  .description('It is utility for finding differences in configuration files')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<firstConfig> <secondCOnfig>')
  .action((firstConfig, secondCOnfig) => {
    console.log(`firsConfig: ${firstConfig}, secondConfig: ${secondCOnfig},`);
  });

export default program;
