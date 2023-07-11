const path = require('path')
const { access, stat, readdir } = require('node:fs')
const { readFile } = require('fs')


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
      } else if (stats.isFile()) {
        resolve(true)
      } else if (stats.isDirectory()) {
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
        const filePaths = files
          .map((file) => path.join(directoryPath, file))//Devuelve ruta de directorio + archivo
          .filter((filePath) => path.extname(filePath) === '.md') //extrae la ruta de archivo y busca el que tiene extensión md

          //files.forEach(a=>{
          //return a.includes('.md')
          //});

        if (filePaths.length === 0) {
          reject('El directorio no contiene archivos MD');
        } else {
          resolve(filePaths);
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
        resolve(data);
      };
    });
  });
};

readMDFile('C:./README.md')



module.exports = {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
  getFilesInDirectory,
  readMDFile,
}
