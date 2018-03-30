const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const utils = {
  removeAcentos(s) {
    removeAcentosRegExp.forEach((fn) => {
      s = fn(s);
    });
    return s;
  },
  converteStringToCode(string) {
    string = utils.removeAcentos(string);
    const ret = [];
    for (s in string) {
      const posicao = string[s].toUpperCase();
      if (alfabeto.indexOf(posicao) >= 0)
        ret.push(alfabeto.indexOf(posicao));
      else ret.push(string[s]);
    }
    return ret;
  },
  converteCodeToString(code) {
    const ret = [];
    code.forEach(c => {
      if (alfabeto[c] != null) {
        ret.push(alfabeto[c]);
      }
      else ret.push(c);
    });
    return ret.join('');
  },
  converteCodeToDeslocamento(code, deslocamento) {
    const ret = [];
    code.forEach(c => {
      ret.push(utils.fazDeslocamento(c, deslocamento));
    })
    return ret;
  },
  fazDeslocamento(code, deslocamento) {
    if (typeof code === 'number') {
      const desc = code + deslocamento;
      if (desc >= alfabeto.length) {
        return desc - alfabeto.length;
      }
      return desc;
    } else return code;
  },
  geraAlfabetoAleatorio() {
    const ret = [];
    for(var a in alfabeto)
      verifica(alfabeto[a]);
    return ret;
    function verifica(a) {
      let code = utils.converteStringToCode(a)[0];
      code = code == 0 ? parseInt(Math.random() * 10) : code; 
      code = parseInt((Math.random() * 10) * code);
      if(code >= alfabeto.length)
       code = parseInt(code/ alfabeto.length)
      const srt = utils.converteCodeToString([code]);
      if (ret.every(r => r.eq != srt)) {
        ret.push({
          l: a,
          eq: srt
        });
      } else verifica(a);
    }
  },
  deslocamento(str, des) {
    let code = utils.converteStringToCode(str);
    code = utils.converteCodeToDeslocamento(code, des);
    let newStr =  utils.converteCodeToString(code);
    return {
      key: des,
      out: newStr
    } 

  },
  substituicao(str) {
    const ret = [];
    const aletaorio = utils.geraAlfabetoAleatorio();
    str = utils.removeAcentos(str).toUpperCase();
    aletaorio.forEach(a => {
      var regexpr = new RegExp(a.l, 'g');
      str = str.replace(regexpr, a.eq.toLowerCase());
    });
    return {
      key: aletaorio,
      out: str.toLowerCase()
    } 
  },
  converteSub(sub) {
    sub.key.forEach(a => {
      var regexpr = new RegExp(a.eq.toLowerCase(), 'g');
      sub.out = sub.out.replace(regexpr, a.l.toUpperCase());
    });
    sub.out.toLowerCase();
    return sub
  },
  
}

var removeAcentosRegExp = [];

var mapaAcentos = {
  'á': 'a',
  'Á': 'A',
  'ã': 'a',
  'Ã': 'A',
  'à': 'a',
  'À': 'A',
  'â': 'a',
  'Â': 'A',
  'é': 'e',
  'É': 'E',
  'ẽ': 'e',
  'Ẽ': 'E',
  'è': 'e',
  'È': 'E',
  'ê': 'e',
  'Ê': 'E',
  'í': 'i',
  'Í': 'I',
  'ĩ': 'i',
  'Ĩ': 'I',
  'ì': 'i',
  'Ì': 'I',
  'î': 'i',
  'Î': 'I',
  'ó': 'o',
  'Ó': 'O',
  'õ': 'o',
  'Õ': 'O',
  'ò': 'o',
  'Ò': 'O',
  'ô': 'o',
  'Ô': 'O',
  'ú': 'u',
  'Ú': 'U',
  'ũ': 'u',
  'Ũ': 'U',
  'ù': 'u',
  'Ù': 'U',
  'û': 'u',
  'Û': 'U',
  'ñ': 'n',
  'Ñ': 'N',
  'ç': 'c',
  'Ç': 'C',
};

Object.keys(mapaAcentos).forEach((acento) => {
  var regexpr = new RegExp(acento, 'g');
  var letra = mapaAcentos[acento];
  var fn = (s) => s.replace(regexpr, letra);
  removeAcentosRegExp.push(fn);
});


module.exports = utils;