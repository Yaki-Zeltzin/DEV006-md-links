const path = require('path')
const { access, constants } = require('node:fs')

function isAbsolute (route) {
  return path.isAbsolute(route) //indica si la ruta es absoluta
};

function relativeToAbsolute (route) {//convierte relativa a absoluta
  return path.resolve(route)
}

 function isValidePath(route){
  return new Promise((resolve) => {
    access(route, constants.F_OK, (err) => {//valida que exista el documento
      if(err){ //ruta no existe
        resolve(false);//la ruta no existe
      } else {
        resolve(true);//la ruta existe
      }
    })
  })
 };



module.exports = {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
}
