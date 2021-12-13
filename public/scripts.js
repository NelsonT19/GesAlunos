const { response } = require("express");

function init (){
   getNavbar();
   getTipos();
  

}

function getNavbar (){
    const nbar = document.getElementById('nbar')
    fetch('http://localhost:3000/navbar')
    .then(res => res.text())
    .then((html)=>{
        nbar.innerHTML += html;
    })
    .catch((err)=>{
        alert('Ocorreu um erro!')
    })

}

function getTipos(){
    const tipos = document.getElementById('tipo')
    fetch('http://localhost:3000/formdata')
    .then(res => res.json())
    .then(data => {

        for(let i=0; i<data.length; i++){
            const op = `<option value="${data[i].idtipo}">${data[i].designacao}</option>`
            tipos.innerHTML += op
        }
    })
    .catch()
}

function getData(){
    const nome = document.getElementById('nome').value
    if(nome=='')
        alert('Tem de preencher o nome.')

    const morada_rua = document.getElementById('morada').value
    if(morada_rua=='')
        alert('Tem de preencher a rua.')

    const morada_num = document.getElementById('numPort').value
    if(morada_num=='')
        alert('Tem de preencher o número.')

    const dnasc = document.getElementById('data').value
    if(dnasc=='')
        alert('Tem de indicar uma data de nascimento.')
    
    const email = document.getElementById('email').value
    if(email=='')
        alert('Tem de indicar um email.')

    const telem = document.getElementById('telemovel').value
    if(telem=='')
        alert('Tem de indicar um telemóvel.')
    else {
        let i = 0
        for(i; i<telem.length; i++){
            let c = telem.charAt(i)
            console.log(c)
            if(isNaN(c)){
                alert('Numero inválido')
                console.log('número inválido')
                break
            }       
        }
        console.log(i)
        if(i == telem.length){
            const telemInt = parseInt(telem)
            console.log(telemInt)
        }
    }

    const tipo = document.getElementById('tipo').value
    if(tipo=='')
        alert('Tem de indicar um tipo')
        else console.log(tipo)

    //criar objeto com os dados recolhidos do formulario
        let dadosutilizador = 
        {
            nomeUtilizador: nome,
            moradarua: morada_rua,
            moradanumero: morada_num,
            datanascimento: dnasc,
            telemovel: telem,
            email:email,
            idtipo:tipo
        } 
        
        //criar um json do objeto
        let jsonDados = JSON.stringify(dadosutilizador);
        
        //preparar o pedido (contem tudo o que vai ser enviado pelo post)
        const options = 
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:jsonDados
        }

        fetch('http://localhost:3000/utilizador',options)
        .then(res => res.json())
        .then(res => alert(res.text)
        .catch((err) =>{
            alert('Ocorreu um erro com o POST...')
        })
       
    )}

