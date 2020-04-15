const createAST = (fileBefore, fileAfter) => {

  const keyBefore = Object.keys(fileBefore);
  const keyAfter = Object.keys(fileAfter);

  let newKeys = [];
  let delKeys = [];
  let noChangeKeys = [];
  let allKeys = [];

  const determinateKeyChanging = (keysBefore, keysAfter) => {
    newKeys = keysAfter.filter((el) => { if (!keyBefore.includes(el)) { return el; } });
    delKeys = keysBefore.filter((el) => { if (!keyAfter.includes(el)) { return el; } });
    noChangeKeys = keyBefore.filter((el) => { if (keyAfter.includes(el) && (typeof (fileBefore[el]) === 'object' && typeof (fileAfter[el]) === 'object')) { return el; } if (keyAfter.includes(el) && (fileBefore[el] !== fileAfter[el])) { newKeys.push(el); delKeys.push(el); }
    });
  };

  determinateKeyChanging(keyBefore, keyAfter);

  allKeys = newKeys.concat(delKeys).concat(noChangeKeys);
  const AST = [];
  const determinateType = (key) => {
    if (newKeys.includes(key) && delKeys.includes(key)) { 
      delete newKeys[newKeys.indexOf(key)]
      return 'new';
    } if (newKeys.includes(key)) {
      return 'new';
    } if (delKeys.includes(key)) {
      return 'del';
    }
    return 'noChange';
  };

  const findObjBoA = (value, type) => {
    const temp = fileAfter[value];
    if (determinateType(value) === 'noChange' && typeof (temp) === 'object') {
      return createAST(fileBefore[value], fileAfter[value]);
    }
    return type === 'del' ? fileBefore[value] : fileAfter[value];
  };

  const iter = (index) => {
    for (const item of allKeys) {
      const determinateTypeValue = determinateType(item);
      AST.push({ type: determinateTypeValue, currentNamekeys: item, body: findObjBoA(item, determinateTypeValue) });
    }
    return AST;
  };

  return iter(0);
};

export default createAST;
