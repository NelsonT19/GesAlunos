const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;


//cliente so tem acesso ao public
app.use(express.static('./public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:false}))

//define as rotas possiveis
app.use('/navbar',require('./routes/navbarRoute'))
app.use('/formdata',require('./routes/formdataRoute'))
app.use('/utilizador',require('./routes/inserirutilizadorRoute'))



// pedido em http://localhost:3000\
app.get('/',(req, res) => {
 res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.listen(PORT, function(){
    console.log(`Server is running on PORT: ` + PORT);
 });


