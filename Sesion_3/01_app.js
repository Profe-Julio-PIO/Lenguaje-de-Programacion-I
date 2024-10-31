const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width"></head>
        <body><h1>Hola, es mi primera pagina con el Framework Express</h1><br>
        Ya estoy aprendiendo un poco más Javascript del lado del servidor </body></html>`)
})

app.listen(8088,()=>{
    console.log('Servidor web iniciado')
})