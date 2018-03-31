
const utils = require('./utils');


deslocamento('gislainy crisóstomo velasco', 5);
deslocamento('zola', 5);
function deslocamento(str, des) {
  let code = utils.converteStringToCode(str);
  code = utils.converteCodeToDeslocamento(code, des);
  let newStr =  utils.converteCodeToString(code);
  console.log(newStr);
  return newStr;
}
substituicao('string');
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
console.log(utils.deslocamento_volta('XYWNSL HTR YJCYT.'));
console.log(utils.deslocamento_volta('LNXQFNSD HWNXTXYTRT AJQFXHT'));



