const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/mostrar_numeros', (req, res)=>{
    let num1 = req.body.numero1
    let num2 = req.body.numero2
    num1 = parseInt(num1)
    num2 = parseInt(num2)
    let pagina = '<!DOCTYPE html><html><head></head><body>'
    for(let i = num1; i <= num2; i++){
        pagina += `<a href="/mostrartabla?valor=${i}">${i}</a> - `
    }
    pagina += '</body></html>'
    res.send(pagina)
})

app.get('/mostrartabla', (req, res) => {
    let num = req.query.valor
    num = parseInt(num)
    let pagina = '<!DOCTYPE html><html><head></head><body>'
    for(let i = 1; i <= 10; i++) {
        let tabla = num * i
        pagina += `${num} * ${i} = ${tabla} <br>`
    }
    pagina += '<a href="index.html">Retornar</a>'
    pagina += '</body></html>'
    res.send(pagina)
})

var server = app.listen(8088, ()=>{
    console.log('Servidor web iniciado')
})