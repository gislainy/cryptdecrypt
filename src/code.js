
const utils = require('./utils');
const fs = require('fs');

// fs.unlink('/out/poema.txt', (err) => {
//   if (err) throw err;
//   console.log('successfully deleted /tmp/hello');
// });
// deslocamento(string, 5);
// deslocamento('zola', 5);
function deslocamento(str, des) {
  let code = utils.converteStringToCode(str);
  code = utils.converteCodeToDeslocamento(code, des);
  let newStr =  utils.converteCodeToString(code);
  console.log(newStr);
  return newStr;
}
substituicao(string);
function substituicao(str) {
  const ret = [];
  const aletaorio = utils.geraAlfabetoAleatorio();
  str = utils.removeAcentos(str).toUpperCase();
  aletaorio.forEach(a => {
    var regexpr = new RegExp(a.l, 'g');
    str = str.replace(regexpr, a.eq);
  });
  console.log(aletaorio)
  console.log(str);
  return str;
}
