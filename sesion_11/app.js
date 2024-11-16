const http = require('http')
const fs = require('fs')
const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'db_tecnologia'
})

conexion.connect(error =>{
    if(error){
        console.log('Problemas de conexión con MySQL')
    }
})

const mime ={
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4',
}

const servidor = http.createServer((pedido, respuesta)=>{
    const url = new URL('http://localhost:8088'+pedido.url)
    let camino = 'public'+url.pathname
    if(camino == 'public/'){
        camino = 'public/index.html'
    }
    encaminar(pedido, respuesta, camino)
})

servidor.listen(8088)


function encaminar(pedido, respuesta, camino) {
    switch(camino){
        case 'public/creartabla': {
            crear(respuesta)
            break
        }
        case 'public/alta':{
            alta(pedido, respuesta)
            break
        }
        case 'public/listado':{
            listado(respuesta)
            break
        }
        case 'public/consultaporcodigo':{
            consulta(pedido, respuesta)
            break
        }
        default:{
            fs.stat(camino, error =>{
                if(!error){
                    fs.readFile(camino, (error,contenido)=>{
                        if(error){
                            respuesta.writeHead(500,{'Content-Type':'text/plain'})
                            respuesta.write('Error interno')
                            respuesta.end()
                        }
                        else{
                            const vec = camino.split('.')
                            const extension = vec[vec.length - 1]
                            const mimearchivo = mime[extension]
                            respuesta.writeHead(200,{'Content-Type':mimearchivo})
                            respuesta.write(contenido)
                            respuesta.end()
                        }
                    })
                }
                else{
                    respuesta.writeHead(404,{'Content-Type':'text/html'})
                    respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
                    respuesta.end()
                }
            })
        }
    }
}

function crear(respuesta){
    conexion.query('drop table if exists articulos', (error,resultado)=>{
        if(error){
            console.log(error)
        }
    })
    conexion.query(`create table articulos (
                                            codigo int primary key auto_increment,
                                            descripcion varchar(50),
                                            precio float
                                            )`, (error, resultado) => {
    if (error) {
        console.log(error)
        return
    }
    })
    respuesta.writeHead(200,{'Content-Type': 'text/html'})
    respuesta.write(`<!doctype html><html><head><body>Se creó la tabla<br><a href="index.html">Retornar
        </a></body></html>`)
    respuesta.end()
}

function alta(pedido, respuesta){
    let info = ''
    pedido.on('data', datosparciales=>{
        info += datosparciales;
    })
    pedido.on('end',()=>{
        const formulario = new URLSearchParams(info)
        const registro = {
            descripcion: formulario.get('descripcion'),
            precio: formulario.get('precio')
        }
        conexion.query('insert into articulos set ?',registro, (error, resultado)=>{
            if(error){
                console.log(error)
                return
            }
        })
        respuesta.writeHead(200,{'Content-Type': 'text/html'})
        respuesta.write(`<!doctype html><html><head><body>Se cargó el artículo<br><a href="index.html">Retornar
        </a></body></html>`)
        respuesta.end()
    })
}

function listado(respuesta){
    conexion.query('select codigo, descripcion, precio from articulos', (error, filas)=>{
        if(error){
            console.log('Error en el listado, verifique')
            return
        }
        respuesta.writeHead(200,{'Content-Type':'text/html'})
        let datos = ''
        for(let i = 0; i < filas.length; i++) {
            datos += 'Código: '+filas[i].codigo+'<br>'
            datos += 'Descripción: '+filas[i].descripcion+'<br>'
            datos += 'Precio, $'+filas[i].precio+'<hr>'
        }
        respuesta.write('<!doctype html><html><head></head><body>')
        respuesta.write(datos)
        respuesta.write('<a href="index.html">Retornar</a>')
        respuesta.write('</body></html>')
        respuesta.end()
    } )
}


function consulta(pedido,respuesta){
    let info = ''
    pedido.on('data', datosparciales=>{
        info += datosparciales
    })
    pedido.on('end',()=>{
        const formulario = new URLSearchParams(info)
        const dato = [formulario.get('codigo')]
        conexion.query('select descripcion,precio from articulos where codigo =?', dato, (error,filas)=>{
            if(error){
                console.log('Error en la consulta, verifique de nuevo!!')
                return
            }
            respuesta.writeHead(200,{'Content-Type':'text/html'})
            let datos = ''
            if(filas.length > 0){
                datos += 'Descripción: '+filas[0].descripcion + '<br>' 
                datos += 'Precio, $'+filas[0].precio + '<hr>'
            }
            else{
                datos = 'No existe un artículo con dicho código.'
            }
            respuesta.write('<!doctype html><html><head></head><body>')
            respuesta.write(datos)
            respuesta.write('<a href="index.html">Retornar</a>')
            respuesta.write('</body></html>')
            respuesta.end()
        })
    })
}
console.log('Servidor web iniciado')