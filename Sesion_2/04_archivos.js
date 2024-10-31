const fs = require('fs');

fs.writeFile('./archivo.txt', 'Línea 1\nLínea 2,', error =>{
    if(error){
        console.log(error)
    }
    else{
        console.log('El archivo fue creado')
    }
})
console.log('Última línea de este programa')