const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const app = express()
const PORT = 3000;
const connection = require('./dbconnection')



//cliente so tem acesso ao public
app.use(express.static('./public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:false}))


//define as rotas possiveis
app.use('/navbar',require('./routes/navbarRoute'))
app.use('/formdata',require('./routes/formdataRoute'))
//app.use('/utilizador',require('./routes/inserirutilizadorRoute'))



// pedido em http://localhost:3000\
app.get('/',(req, res) => {
 res.sendFile(path.join(__dirname,'/public/index.html'))
})

app.listen(PORT, function(){
    console.log(`Server is running on PORT: ` + PORT);
 });

/*--------------------iserir imagem------------*/

 app.use(cors())
app.use((req,res,next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

let filename

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, './public/img')
    },
    filename: (req,file,callback)=>{
        filename = Date.now() + '--' + file.originalname
        callback(null,filename)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image')

app.post('/utilizador',(req, res) => {
    upload(req, res, (err)=>{
        console.log(req.file)
        console.log(path.extname(req.file.filename))
        connection.query(
            'INSERT INTO utilizadores (nomeutilizador,moradarua,moradanumero,datanascimento,telemovel,email,idtipo,fotourl) VALUES (?,?,?,?,?,?,?,?)', 
            [req.body.nomeutilizador,req.body.moradarua, req.body.moradanumero,req.body.datanascimento,req.body.telemovel,req.body.email,req.body.idtipo,filename],     
            (err,result) => {
            if(err){
                console.log(err)
            }
            else {
                console.log('Novo ID: '+ result.insertId)
                res.json({res : 'Utilizador adicionado com sucesso!'})
            }
        })
        if(err){
            res.json({res: err})
        } else {
            if(req.file == undefined){
              res.json({res:'No file selected'})
            }
            else{
                console.log(req.file)
                console.log(path.extname(req.file.filename))
                
            }           
        }
       
    })  
  });

 
  
/*--------------------iserir imagem------------*/