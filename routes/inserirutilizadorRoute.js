
const express = require('express')
const inserirutilizadorRoute = express.Router()
const connection = require('../dbconnection')



inserirutilizadorRoute.post('/',(req,res) =>{

    connection.query("INSERT INTO utilizadores (nomeUtilizador,moradarua,moradanumero,datanascimento,telemovel,email,idtipo) VALUES(?,?,?,?,?,?,?) ",[req.body.nomeUtilizador,req.body.moradarua,req.body.moradanumero,req.body.datanascimento,req.body.telemovel,req.body.email,req.body.idtipo],(err,result) =>{
        if(err){
            console.log(err)
            console.log('Erro na BD...')
        }else{
           console.log(result)
            res.json({text:'Utilizador adicionado com Sucesso!'})
        }

   })
  
})


module.exports = inserirutilizadorRoute