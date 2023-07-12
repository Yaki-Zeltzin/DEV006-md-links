const path = require('path')
const { access, stat, readdir } = require('node:fs')
const { readFile, constants} = require('fs')


function isAbsolute(route) {
  return path.isAbsolute(route) //indica si la ruta es absoluta
};

function relativeToAbsolute(route) {//convierte relativa a absoluta
  return path.resolve(route)
}

function isValidePath(route) {
  return new Promise((resolve) => {
    access(route, constants.F_OK, (err) => {//valida que exista el documento
      if (err) { //ruta no existe
        resolve(false);//la ruta no existe
      } else {
        resolve(true);//la ruta existe
      }
    })
  })
};

function isFile(route) {
  return new Promise((resolve, reject) => {
    stat(route, (err, stats) => {
      if (err) {
        reject(err)
      } else if (stats.isFile()) {//devuelve true si el es archivo
        resolve(true)
      } else if (stats.isDirectory()) {//devuelve false si es directorio
        resolve(false)
      }
    });
  });
};

function getFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    readdir(directoryPath, (err, files) => {
      if (err) {
        console.log(err); //Reachaza la promesa si hay un error al leer el directorio
      } else {
        const filePaths = files //devulve todos los archivos encontrados en el directorio
          .map((file) => path.join(directoryPath, file))//Devuelve ruta de directorio + archivo
          .filter((filePath) => path.extname(filePath) === '.md') //extrae la ruta de archivo y busca el que tiene extensión md

          //files.forEach(a=>{
          //return a.includes('.md')
          //});

        if (filePaths.length === 0) {
          reject('El directorio no contiene archivos MD');
        } else {
          resolve(filePaths);//resuelve la promesa con todos los archivos encontrados en el directorio
        };
      };
    });
  });
};


function readMDFile(route) {
  return new Promise((resolve, reject) => {
    readFile(route, 'utf8', (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data); //resuelve promesa con la lectura del archivo
      };
    });
  });
};

function extractLinksFromMarkdown(content, file){
  const regex = /\[(.*?)\]\((https?:\/\/[^\s]+)\)/g; //Encontrar coincidencia con la cadena
  const links = [];
  let match;

  while((match = regex.exec(content)) !== null){
    const text = match[1];
    const url = match[2];
    links.push({ text, url, file });
  }

  return links;
};



module.exports = {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
  isFile,
  getFilesInDirectory,
  readMDFile,
  extractLinksFromMarkdown
}
