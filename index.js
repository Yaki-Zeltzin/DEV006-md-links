const { default: axios } = require('axios');
const {
  isAbsolute,
  relativeToAbsolute,
  isValidePath,
  isFile,
  getFilesInDirectory,
  readMDFile,
  extractLinksFromMarkdown
} = require('./functions.js');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    let absolutePath;
    const validate = isAbsolute(path) //Valida si la ruta es absoluta

    if (validate) {
      //resolve(isValidePath(path));
      absolutePath = path;
      console.log('1. ' + absolutePath + ' es una ruta absoluta');
    } else {
      //reject(relativeToAbsolute(path));
      absolutePath = relativeToAbsolute(path); //si la ruta es relativa la convierta a absoluta
      console.log('1. ' + absolutePath + ' convertimos tu ruta relativa a absoluta');
    };

    isValidePath(absolutePath)//valida que exista el documento
      .then((resp) => {
        if (!resp) {
          console.log('2. la ruta no existe')
        }
        console.log('2. la ruta si existe')
        return isFile(absolutePath)
      })
      .then((resp) => { //devulve tru si es archivo - false si es directorio
        console.log('3. el archivo existe ' + resp)
        if (resp) {
          if (!absolutePath.endsWith('.md') && !absolutePath.endsWith('.MD')) {
            console.log('4. El archivo no tiene extension md');
            return [];
          }
          console.log('4. Es un archivo .md');
          return [absolutePath]
        } else {
          return getFilesInDirectory(absolutePath)
        }
      })
      .then((filePaths) => {//retorna archivos que tiene extension md
        if (filePaths.length === 0) {
          console.log('4. El directorio no contiene archivos md')
        }

        const promises = filePaths.map((file) => {
          return readMDFile(file)
          .then((resp) => {
            console.log( resp + '5. esta es la respuesta de la lectura del archivo');
            const links = extractLinksFromMarkdown(resp, file);//Lectura de archivos md, rutas de archivos .md en array
            if(options.validate){
              const linkPromises = links.map((link) => {//Recibe un array de objetos con todos los links encontrados
                return axios
                .head(link.url)
                .then((response) => ({
                  ...link,
                  status: response.status,
                  ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail'}
                ))
                .catch((error) => ({
                  ...link,
                  status:null,
                  ok:fail
                }))
              })
              return Promise.all(linkPromises);
            }else{
              return links;
            }
          })
          .catch((error) => {
            console.log(`Error al leer archivo ${file}:`, error);
            return[]
          });
        });
        return Promise.all(promises);
      })
      .then((results) => {
        const flattenedResults = results.flat();
        console.log('Aca puedes obtener el resultado de los enlaces: ');
        console.log(flattenedResults);
        resolve(flattenedResults);
      })
      .catch((error) => {
        console.error('Error: ', error);
        reject(error)
      })
  })
};
//C:\Users\zeltz\OneDrive\Documentos\proyectos\MD-Links\DEV006-md-links\node_modules\mime-db

//mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/node_modules/follow-redirects/README.md')
// mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/node_modules/mime-db').then(res => console.log(res))
//   .catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;

mdLinks('C:/Users/zeltz/OneDrive/Documentos/proyectos/MD-Links/DEV006-md-links/node_modules/mime-db', { validate: true })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
