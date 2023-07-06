const validate = false;

function mdLinks(path, options){
  return new Promise((resolve, reject) => {
    if(validate) {
      resolve('El link es válido');
    }else{
      reject('El mdLinks esta roto');
    }
  })
}


mdLinks().then(res => console.log(res))
.catch(err => console.log(err))
//const linkRegex expresion irregular= /\[(.*)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
