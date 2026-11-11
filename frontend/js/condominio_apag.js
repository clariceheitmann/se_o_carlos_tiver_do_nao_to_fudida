const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('id').value

    if(!id){
        resposta.innerHTML = '<p>Informe o código do condomínio!</p>'
        return
    }

    if(!confirm('Tem certeza de que deseja apagar esse condomínio?'))
        return

    fetch(`http://localhost:3000/condominio/${id}`,{
        method: 'DELETE',
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
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset
    })
    .catch((err)=>{
        console.error('Erro ao apagar condomínio!',err)
        resposta.innerHTML = '<p>Erro ao apagar condomínio!</p>'
    })
})

