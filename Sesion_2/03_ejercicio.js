/*
    Confeccionar un programa que requiera el módulo 'os' para recuperar el espacio libre de memoria. 
    Mostrar inicialmente el espacio libre mediante el método freemem().
    Luego crear un vector y mediante el método push almacenar 1000000 de enteros. 
    Mostrar luego de la creación y carga del vector la cantidad de espacio libre.
 */

const os = require('os');

console.log('Memoria libre: '+os.freemem())
const array = []
for(let i = 0; i < 1000000; i++){
    array.push(i)
}

console.log('Memoria libre después de crear el array: '+os.freemem())