/*
    Implementar un servidor web con Node.js que retorne HTML con un mensaje indicando que el sitio esta 
    en desarrollo. No importa que archivo pidamos del servidor retornar siempre el mismo HTML.
*/

var http = require('http')

http.createServer(function (pedido, respuesta){
    respuesta.writeHead(200,{'Content-Type': 'text/html'})
    respuesta.end('<!doctype html><html><head><meta charset="UTF-8"></head><body><h1>Sitio en construcción</h1></body></html>')
    
}).listen(8088)

console.log('Servidor web iniciado')

