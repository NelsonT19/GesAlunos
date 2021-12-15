
const express = require('express')
const multer =require('multer')
const inserirutilizadorRoute = express.Router()
const connection = require('../dbconnection')
const cors = require('cors')

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, './public/img')
    },
    filename: (req,file,callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
})

inserirutilizadorRoute.post('/', (req,res) => {
    connection.query(
     'INSERT INTO utilizadores (nomeutilizador,moradarua,moradanumero,datanascimento,telemovel,email,idtipo) VALUES (?,?,?,?,?,?,?)', 
     [req.body.nomeutilizador,req.body.moradarua, req.body.moradanumero,req.body.datanascimento,req.body.telemovel,req.body.email,req.body.idtipo],     
     (err,result) => {
     if(err){
         console.log('Erro na base de dados...')
     }
     else {
         console.log(result)
         res.json({text : 'Utilizador adicionado com sucesso!'})
     }
 })
 
})



module.exports = inserirutilizadorRoute