const {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
} = require('./functions.js');

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    let absolutePath;
    const validate = isAbsolute(path) //Valida si la ruta es absoluta

    if(validate) {
      //resolve(isValidePath(path));
      absolutePath = path;
      console.log('1. ' + absolutePath + ' es una ruta absoluta');
    }else{
      //reject(relativeToAbsolute(path));
      absolutePath = relativeToAbsolute(path); //convierte ruta relativa a absoluta
      console.log('1. ' + absolutePath +  ' convertimos tu ruta relativa a absoluta');
    };

    isValidePath(absolutePath)
    .then((res) =>{
      if(res){
        console.log('2. la ruta existe')
      }else{
        console.log('2. la ruta no existe')
      }
    })
  });
};


mdLinks('index.js').then(res => console.log(res))
.catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;

