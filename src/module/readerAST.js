import path from 'path';
import _ from 'lodash';

const objToString = (obj) => {
  let firstRow = '{';
  const lastRow = '}';
  if (obj instanceof Object) {
    for (const value in obj) {
      firstRow += `${value} : ${obj[value]}`;
  }
  } else {
    return `${obj}`;
  }

  return (firstRow + lastRow);
};

const makeTabulatJSON = (arr) => {
  let resultSTR = '';
  for(const value of arr){  
    let str = (typeof(value) != 'object')?value:JSON.stringify(value);
    let countDeep = 0;
    for (const symbol of str){
      if (symbol ==='}' ){
        resultSTR += `\n${(" ").repeat(2*countDeep)}${symbol}\n`;
        countDeep-=1;
      } else if(symbol ==='{'){
        countDeep +=1;
        resultSTR += `{\n${(' ').repeat(4*countDeep)}`;
      } else if(symbol ===','){
        resultSTR += `\n${(' ').repeat(4*countDeep)}`;
      } else {
        resultSTR += symbol;
      }
    }
  }
  return resultSTR;
};

const makeStrPlainFormat_OLD = (tree) => {
  //let newPath = '';
  const iter = (treeIterP, myPath) => {
    // const newPath = path.join(myPath,treeIterP.currentNamekeys);
    let strMypath = " ";
    let srtName =" ";
    let newPath = " ";
//  console.log("iter"+myPath );
    switch (treeIterP.type) {
      case 'new':
         strMypath = " " + myPath;
         srtName =" " + treeIterP.currentNamekeys;
        //const newPath = path.join(myPath, treeIterP.currentNamekeys);
         newPath = path.join(strMypath, srtName);
         console.log(`strMypath ${strMypath} srtName ${srtName} newPath ${newPath}`)
        //myPath =myPath +" "+treeIterP.currentNamekeys;
        //console.log(`myPath ${myPath}`)
        return `Property ${newPath}  ${(treeIterP.body instanceof Array) ? treeIterP.body.map(iter((child)=>iter(child, newPath))) : `was added with value: ${objToString(treeIterP.body)}`}`;
        // ? для complex value тдельные проверки?
        // добавить функцию поиска пути только там где надо  OR NOT
        case 'del':
           strMypath = " " + myPath;
           srtName =" " + treeIterP.currentNamekeys;
           newPath = path.join(strMypath, srtName);
          myPath += treeIterP.currentNamekeys;
          return `Property ${newPath}  ${(treeIterP.body instanceof Array) ? treeIterP.body.map(iter((child)=>iter(child, newPath))) : `was deleted`}`;
        case 'noChange':
           strMypath = " " + myPath;
           srtName =" " + treeIterP.currentNamekeys;
           newPath = path.join(strMypath, srtName);
          return (treeIterP.body instanceof Array) ? ` draft ${treeIterP.body.map(iter)}` : `draft noChange`;

      default:
        return [];
    }
  };

  return tree.map((el)=>iter(el,"/"));
};

const makeStrPlainFormat = (tree, pathAcc = '') => {
  const iter = (data, acc) => {
    const newAcc = `${acc}.${data.currentNamekeys}`;
    const path = `${newAcc.slice(1)}`;
    switch (data.type) {
      case 'new':
        // return `Property ${path} was added with value: ${objToString(data.body)}`;
        return `Property ${path}  ${(data.body instanceof Array) ? data.body.map(iter((child)=>iter(child, newAcc))) : `was added with value: ${objToString(data.body)}`}`;
      case 'del':
        // return `Property ${path} was deleted`;
        return `Property ${path}  ${(data.body instanceof Array) ? data.body.map(iter((child)=>iter(child, newAcc))) : `was deleted`}`;
      case 'noChange': 
        return (data.body instanceof Array) ? data.body.map((e) => iter(e, newAcc)) : null;
      default: return null;
    }
  };
  const walkNodes = tree.map((el) => iter(el, pathAcc));
  return _.flattenDeep(walkNodes);
};


const readerAST = (tree) => { // переименовать на чтото вроде prepareSTRforMakeJSON

  const iter = (treeIter) => {
    switch (treeIter.type) {
      case 'new':
        return `+ ${treeIter.currentNamekeys} : ${(treeIter.body instanceof Array) ? treeIter.body.map(iter) : objToString(treeIter.body)}`;
      case 'del':
        return `- ${treeIter.currentNamekeys} : ${(treeIter.body instanceof Array) ? treeIter.body.map(iter) : objToString(treeIter.body)}`;
      case 'noChange':
        return (treeIter.body instanceof Array) ? `  ${treeIter.currentNamekeys} : {${treeIter.body.map(iter)}}` : `  ${treeIter.currentNamekeys} : ${objToString(treeIter.body)}`;
      default:
        return treeIter;
    }
  };

  return tree.map(iter);

};


export { makeTabulatJSON, readerAST, makeStrPlainFormat };
