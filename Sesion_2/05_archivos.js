const fs = require('fs')

fs.readFile('./archivo.txt', (error, datos) =>{
    if(error) {
        console.log(error)
    }
    else{
        console.log(datos.toString())
    }
})
console.log('Última línea del programa')