const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;
const connection = require('./dbconnection')


//cliente so tem acesso ao public
app.use(express.static('./public'))



app.get('/formdata',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/formdata.html'))
})

app.get('/navbar',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/navbar.html'))
})
// pedido em http://localhost:3000\
app.get('/',(req, res) => {
 res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.listen(PORT, function(){
    console.log(`Server is running on PORT: ` + PORT);
 });


