import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const buildPath = (filepath) => {
  const resolvePathToFile = process.cwd() + filepath;
  return fs.readFileSync(resolvePathToFile);
};

const parseFile = (pathByFile) => {
  const resolvePath = buildPath(pathByFile);
  let parse;
  const format = path.extname(pathByFile);
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yaml') {
    parse = yaml.safeLoad;
  }


  return parse(resolvePath);
};

export default parseFile;
