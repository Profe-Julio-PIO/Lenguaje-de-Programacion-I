const http = require('http')
const fs = require('fs')

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/ico',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
}

const servidor = http.createServer((req, res)=>{
    const url = new URL('http://localhost:8088'+ req.url)
    let camino = 'public' + url.pathname
    if(camino == 'public/'){
        camino = 'public/index.html'
    }
    encaminar(req, res, camino)
})
servidor.listen(8088)

function encaminar(req, res, camino){
    console.log(camino)
    switch(camino){
        case 'public/recuperar_datos':{
            recuperar(req, res)
            break
        }
        default:{
            fs.stat(camino, error =>{
                if(!error){
                    fs.readFile(camino, (error,contenido)=>{
                        if(error){
                            res.writeHead(500,{'Content-Type': 'text/plain'})
                            res.write('Error interno')
                            res.end()
                        }
                        else{
                            const vec = camino.split('.')
                            const extension = vec[vec.length - 1]
                            const mimearchivo = mime[extension]
                            res.writeHead(200,{'Content-Type': mimearchivo})
                            res.write(contenido)
                            res.end()
                        }
                    })
                }
                else{
                    res.writeHead(404,{'Content-Type': 'text/html'})
                    res.write('<!DOCTYPE html><html><head></head><body> Recurso inexistente! </body></html>')
                    res.end()
                }
            })
        }    
    }
}

function recuperar(req, res){
    let info = ''
    req.on('data', datosparciales =>{
        info += datosparciales
    })
    req.on('end', ()=>{
        const formulario = new URLSearchParams(info)
        console.log(formulario)
        res.writeHead(200,{'Content-Type': 'text/html'})
        const pagina = `<!DOCTYPE html><html><head><body>
        Nombre de usuario: ${formulario.get('nombre')} <br>
        Clave: ${formulario.get('clave')} <br>
        <a href="index.html">Retornar</a>
        </body></html>`
        res.end(pagina)
    })
}
console.log('Servidor web ha iniciado')