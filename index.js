const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
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
}).single('image')

app.post('/foto',(req, res) => {
    upload(req, res, (err)=>{
        console.log(req.body.nomeutilizador)
        console.log(req.body.morada_rua)
        console.log(req.body.morada_num)
        console.log(req.body.dnasc)
        console.log(req.body.email)
        console.log(req.body.telem)
        console.log(req.body.tipo)
        if(err){
            res.json({res: err})
        } else {
            if(req.file == undefined){
              res.json({res:'No file selected'})
            }
            else{
                console.log(req.file)
                res.json({res:'Sucesso!'})
            }           
        }
    })  
  });
/*--------------------iserir imagem------------*/