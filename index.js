const { isAbsolute } = require('./functions.js');
const { relativeToAbsolute } = require('./functions.js');

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    const validate = isAbsolute(path)
    if(validate) {
      resolve('Es una ruta absoluta');
    }else{
      reject(relativeToAbsolute(path));
    };
  });
};


mdLinks('index.js').then(res => console.log(res))
.catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;

