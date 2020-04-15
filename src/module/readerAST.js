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

const makeTabulat = (arr) => {
  let resultSTR = '';
  for(const value of arr){  
    let str = (typeof(value) != 'object')?value:JSON.stringify(value);
    let countDeep = 0;
    for (const symbol of str){ // !!!!
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


const readerAST = (tree) => {

  const iter = (treeIter) => {
    switch (treeIter.type) {
      case 'new':
        return `+ ${treeIter.currentNamekeys} : ${(treeIter.body instanceof Array) ? treeIter.body.map(iter):objToString(treeIter.body)}`;
      case 'del':
        return `- ${treeIter.currentNamekeys} : ${(treeIter.body instanceof Array) ? treeIter.body.map(iter):objToString(treeIter.body)}`;
      case 'noChange':
        return (treeIter.body instanceof Array) ? `  ${treeIter.currentNamekeys} : {${treeIter.body.map(iter)}}`: `  ${treeIter.currentNamekeys} : ${objToString(treeIter.body)}`
      default:
        return treeIter;
    }
  };

  return tree.map(iter);

};


export { makeTabulat, readerAST };
