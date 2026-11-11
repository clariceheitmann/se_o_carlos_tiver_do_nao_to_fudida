const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'
const conn = require('./db/conn')

require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const funcionarioController = require('./controller/funcionario.controller')
const condominioController = require('./controller/condominio.controller')
const materialController = require('./controller/material.controller')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.post('/funcionario', funcionarioController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req,res) =>{
    return res.status(200).json({message: 'Aplicação rodando!'})
})

app.use(authMiddleware)

app.post('/condominio', condominioController.cadastrar)
app.get('/condominio/buscar/:nome', condominioController.consultarNome)
app.put('/condominio/:id', condominioController.atualizar)
app.delete('/condominio/:id', condominioController.apagar)

app.post('/material', materialController.cadastrar)
app.put('/material/:id', materialController.atualizar)

conn.sync()
    .then(()=>{
        app.listen(PORT, hostname, ()=>{
            console.log(`Aplicação rodando em: http://${PORT}:${hostname}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao se conectar com o banco de dados!')
    })