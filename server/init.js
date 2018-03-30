const utils = require('./utils');


deslocamento('gi cris', 5);
deslocamento('zola', 5);
function deslocamento(str, des) {
  let code = utils.converteStringToCode(str);
  code = utils.converteCodeToDeslocamento(code, des);
  let newStr =  utils.converteCodeToString(code);
  console.log(newStr);
  return newStr;
}

