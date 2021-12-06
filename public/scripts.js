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
            const op = 
            `<option value"${data[i].idtipo}">${data[i].designacao}</option>`
            tipos.innerHTML += op
        }
    })
    .catch()
}

function getDados(){
    const name = document.getElementById('nome').value
    const morada = document.getElementById('morada').value
    const data = document.getElementById('data').value
    const email = document.getElementById('email').value
    const tipo = document.getElementById('tipo').value

    
    const dados = {name,morada,data,email,tipo}
    console.log(dados)
}

