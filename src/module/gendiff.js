import _ from 'lodash';

const gendiff = (jsonObj1, jsonObj2) => {
  let result = '{\n';
  const keysJsonFile1 = Object.keys(jsonObj1);
  const keysJsonFile2 = Object.keys(jsonObj2);

  /* const newKeys = keysJsonFile2.reduce((acc, n) => {
    if (!_.has(jsonObj1, n)) {
      acc += n;
    }
    return acc;
  }, ''); */

  for (let i = 0; i < keysJsonFile2.length; i += 1) {
    if (!_.has(jsonObj1, keysJsonFile2[i])) { // добавление новых
      result += `+ ${keysJsonFile2[i]} : ${jsonObj2[keysJsonFile2[i]]}\n`;
    } else if (_.has(jsonObj1, keysJsonFile2[i]) && jsonObj1[keysJsonFile2[i]] === jsonObj2[keysJsonFile2[i]]) { // доб не измененых
      result += `  ${keysJsonFile2[i]} : ${jsonObj2[keysJsonFile2[i]]}\n`;
    } else if (_.has(jsonObj1, keysJsonFile2[i]) && jsonObj1[keysJsonFile2[i]] !== jsonObj2[keysJsonFile2[i]]) { // добавление измененых
      result += `+ ${keysJsonFile2[i]} : ${jsonObj2[keysJsonFile2[i]]}\n`;
      result += `- ${keysJsonFile2[i]} : ${jsonObj1[keysJsonFile2[i]]}\n`;
    }
  }

  for (let i = 0; i < keysJsonFile1.length; i += 1) { // поиск удаленных
    if (!_.has(jsonObj2, keysJsonFile1[i])) {
      result += `- ${keysJsonFile1[i]} : ${jsonObj1[keysJsonFile1[i]]}\n`;
    }
  }

  result += '}';
  return result;
};

export default gendiff;
