const { isAbsolute } = require('./functions.js');

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    const validate = isAbsolute(path)
    if(validate) {
      resolve('Es una ruta absoluta');
    }else{
      reject('No es una ruta absoluta');
    };
  });
};


mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/functions.js').then(res => console.log(res))
.catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;

