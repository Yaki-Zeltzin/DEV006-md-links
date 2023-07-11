const {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
  isFile,
  getFilesInDirectory,
  readMDFile,
  extractLinksFromMarkdown
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
      absolutePath = relativeToAbsolute(path); //si la ruta es relativa la convierta a absoluta
      console.log('1. ' + absolutePath +  ' convertimos tu ruta relativa a absoluta');
    };

    isValidePath(absolutePath)//valida que exista el documento
    .then((resp) =>{
      if(!resp){
        console.log('2. la ruta no existe')
      }
      console.log('2. la ruta si existe')
      return isFile(absolutePath)
      })
      .then((resp) => { //devulve tru si es archivo - false si es directorio
       console.log('3. el archivo existe ' + resp)
       if(!absolutePath.endsWith('.md') && !absolutePath.endsWith('.MD')){
        console.log('El archivo no tiene extension md');
        return [];
       }
       console.log('Es un archivo .md');
      return[absolutePath]
     })
    //  .then((filePaths) => {
    //   if(filePaths.length === 0){
    //     console.log('El directorio no contiene archivos md')
    //   }

      // const promises = filePaths.map((file => {
      //   return readMDFile(file)
      //   .then((fileContent) => {
      //     const links = extractLinksFromMarkdown(fileContent,file);
      //     if(options.validate){
      //       const linkPromises = links.map((link) => {
      //         console.log(link)
      //       })
      //     }
      //   })
      // }))
     })
  //});
};

//mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/node_modules/follow-redirects/README.md')
mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/node_modules/follow-redirects/README.md').then(res => console.log(res))
.catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;

