const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let dicionario = require('./dicionario');

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
      let desc;
      if (deslocamento > 0)
        desc = code + deslocamento;
      else desc = (deslocamento + code);
      if (desc >= alfabeto.length ) {
        return desc - alfabeto.length;
      } else if(desc < 0) {
        return alfabeto.length + desc;
      }
      return desc;
    } else return code;
  },
  geraAlfabetoAleatorio() {
    const ret = [];
    for (var a in alfabeto)
      verifica(alfabeto[a]);
    return ret;

    function verifica(a) {
      let code = utils.converteStringToCode(a)[0];
      code = code == 0 ? parseInt(Math.random() * 10) : code;
      code = parseInt((Math.random() * 10) * code);
      if (code >= alfabeto.length)
        code = parseInt(code / alfabeto.length)
      const srt = utils.converteCodeToString([code]);
      if (ret.every(r => r.eq != srt) && (a != srt)) {
        ret.push({
          l: a,
          eq: srt
        });
      } else verifica(a);
    }
  },
  deslocamento(str) {
    const des = gerarDeslocamento();
    let code = utils.converteStringToCode(str);
    code = utils.converteCodeToDeslocamento(code, des);
    let newStr = utils.converteCodeToString(code);

    newStr = newStr.replace(/\n/g,' ');
    newStr = newStr.replace(/[\\"]/g,' ');
    return {
      key: des,
      out: newStr
    }
    function gerarDeslocamento() {
      const aleatorio = parseInt((Math.random() * 100) % alfabeto.length);
      return aleatorio > alfabeto.length || aleatorio == 0 ? gerarDeslocamento() : aleatorio;
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
    str = str.replace(/\n/g,' ');
    str = str.replace(/[\\"]/g,' ');
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

    sub.out = sub.out.replace(/\n/g,' ');
    sub.out = sub.out.replace(/[\\"]/g,' ');
    return sub
  },
  deslocamento_volta(str) {
    let i = -1;
    let temNoDicionario = false;
    let retorno = str;
    do {
      i++;
      let code = utils.converteStringToCode(str);
      code = utils.converteCodeToDeslocamento(code, -i);
      let textoGerado =  utils.converteCodeToString(code);
      let split = textoGerado.split(' ').map(s => s.replace(/\W/g, ''));
      temNoDicionario = utils.verificaSeTemNoDicionario(split);
      if(temNoDicionario) retorno = textoGerado;
    } while(i < 26 && !temNoDicionario);

    retorno = retorno.replace(/\n/g,' ');
    retorno = retorno.replace(/[\\"]/g,' ');
    return {
      key: temNoDicionario ? i : 'keyless',
      out: retorno
    }
  },
  verificaSeTemNoDicionario(s) {
    return s.some(_s => dicionario.indexOf(_s) > 0);
  }
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
dicionario.map(d => d = utils.removeAcentos(d));

module.exports = utils;