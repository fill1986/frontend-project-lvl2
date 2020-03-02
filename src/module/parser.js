import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import path from 'path';

const buildPath = (filepath) => {
  const resolvePathToFile = process.cwd() + filepath;
  return fs.readFileSync(resolvePathToFile, 'UTF-8');
};

const parseFile = (pathByFile) => {
  const resolvePath = buildPath(pathByFile);
  let parse;
  const format = path.extname(pathByFile);
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yaml') {
    parse = yaml.safeLoad;
  } else if (format === '.ini') {
    parse = ini.parse;
  }


  return parse(resolvePath);
};

export default parseFile;
