let pathToConfig1 = '';
let pathToConfig2 = '';

import program from 'commander';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';


program
  .version('7.0.0.')
  .description('It is utility for finding differences in configuration files')
  .option('-f, --format [type]', 'output format');

program
  .arguments('<firstConfig> <secondCOnfig>')
  .action((firstConfig, secondCOnfig) => {
    pathToConfig1 = firstConfig;
    pathToConfig2 = secondCOnfig;
  });

program.parse(process.argv);

const gendiff = (path1 = pathToConfig1, path2 = pathToConfig2) => {
  let result = '{\n';
  const resolvePathToFile1 = process.cwd() + path1;
  const jsonObj1 = JSON.parse(fs.readFileSync(resolvePathToFile1));
  const keysJsonFile1 = Object.keys(jsonObj1);
  const resolvePathToFile2 = process.cwd() + path2;
  const jsonObj2 = JSON.parse(fs.readFileSync(resolvePathToFile2));
  const keysJsonFile2 = Object.keys(jsonObj2);


 /* const newKeys = keysJsonFile2.reduce((acc, n) => {
    if (!_.has(jsonObj1, n)) {
      acc += n;
    }
    return acc;
  }, '');*/

  for (const item in jsonObj2){
    if (!_.has(jsonObj1, item)){                   //добавление новых
      result += `+ ${item} : ${jsonObj2[item]}\n`;
    }
    else if(_.has(jsonObj1, item) && jsonObj1[item] === jsonObj2[item]){ //добавление не измененых
      result += `  ${item} : ${jsonObj2[item]}\n`;
    }
    else if(_.has(jsonObj1, item) && jsonObj1[item] != jsonObj2[item]){          //добавление измененых
      result += `+ ${item} : ${jsonObj2[item]}\n`;
      result += `- ${item} : ${jsonObj1[item]}\n`;
    }
  }
  for(const item in jsonObj1){ // поиск удаленных
    if(!_.has(jsonObj2, item)){
      result += `- ${item} : ${jsonObj1[item]}\n`;
    }
  }

  result +='}';
  return result;

};

export default gendiff;