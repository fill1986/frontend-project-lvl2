import fs from 'fs';

export default (filepath) => {
  console.log('TEST')
  const resolvePathToFile = process.cwd() + filepath;
  return fs.readFileSync(resolvePathToFile, 'UTF-8');
};
