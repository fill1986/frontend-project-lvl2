import _ from 'lodash';

const isComplexValue = (data) => {
  return (data instanceof Object) ? '[complex value]' : data;
};

const makeStrPlainFormat = (tree, pathAcc = '') => {
  const iter = (data, acc) => {
    const newAcc = `${acc}.${data.currentNamekeys}`;
    const path = `${newAcc.slice(1)}`;
    switch (data.type) {
      case 'new':
        return `Property ${path}  ${(data.body instanceof Array) ? data.body.map(iter((child) => iter(child, newAcc))) : `was added with value: ${isComplexValue(data.body)}`}`;
      case 'del':
        return `Property ${path}  ${(data.body instanceof Array) ? data.body.map(iter((child) => iter(child, newAcc))) : 'was deleted'}`;
      case 'noChange':
        return (data.body instanceof Array) ? data.body.map((e) => iter(e, newAcc)) : null;
      default: return null;
    }
  };
  const walkNodes = tree.map((el) => iter(el, pathAcc));
  const arrResult = _.flattenDeep(walkNodes);

  const arrToString = (arr) => {
    let resultSTR = "";
    arr.forEach((e) => {
      resultSTR += `${e} \n`;
    });
    return resultSTR;
  };
  return arrToString(arrResult);
};

export default makeStrPlainFormat;
