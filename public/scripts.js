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
    fetch('http://localhost:3000/formdata')
    .then()
    .then()
    .catch()
}