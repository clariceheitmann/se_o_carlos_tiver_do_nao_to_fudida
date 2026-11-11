const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_consultar = document.getElementById('btn_consultar')
const resposta = document.getElementById('resposta')

btn_consultar.addEventListener('click', (e) =>{
    e.preventDefault()

    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/condominio/buscar/${nome}`,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : token
        },
    })
    .then(res =>{
        if(res.status === 401){
            localStorage.clear()
            alert('Sessão expirada!')
            location.href = '../index.html'
            throw new Error('Sessão expirada!')
        }
        return res.json()
    })
    .then(dados =>{
        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
        }else{
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody([dados])}
            </table>
            `
        }
    })
    .catch((err)=>{
        console.error('Erro ao consultar condomínio!',err)
        resposta.innerHTML = '<p>Erro ao consultar condomínio!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codCondominio | el.id}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.cnpj}</td>`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código do Condomínio</th>
            <th>Nome</th>
            <th>CNPJ</th>
        </tr>
    </thead>
    `
}

