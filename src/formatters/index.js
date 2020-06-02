import prepareSTRforMakeJSON from './json';
import makeStrPlainFormat from './plain';

const selectFormat = (typeFormat) => {
  return (typeFormat === 'plain') ? makeStrPlainFormat : prepareSTRforMakeJSON;
};

export default selectFormat;
