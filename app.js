

const getDadosCep = async (cep) =>{
    
    const url = `https://brasilapi.com.br/api/cep/v1/${cep}`
    
    try {
        //fetch é um metodo que faz uam requisição e precisa de uma url como parametro
        const response = await fetch(url) 
        //pega o objeto da resposta da requisição e extrai o json dele
        const data = await response.json()
    
        return data
    } catch (error) {
        return false
    }
    
}

 const preencherFormulario = async() =>{
    const inputbox = document.getElementById('inputbox')
    const cep = document.getElementById('cep').value
    
    const dadosCep = await getDadosCep(cep)

    if(!dadosCep){
        document.getElementById('endereco').value = ''
        document.getElementById('bairro').value = ''
        document.getElementById('cidade').value = ''
        document.getElementById('estado').value = ''
        return errorCep()
    }
    inputbox.classList.remove('error')

    document.getElementById('endereco').value = dadosCep.street
    document.getElementById('bairro').value = dadosCep.neighborhood
    document.getElementById('cidade').value = dadosCep.city
    document.getElementById('estado').value = dadosCep.state

    console.log(dadosCep)
} 


const errorCep = () =>{
    const inputbox = document.getElementById('inputbox')
    inputbox.classList.add('error')
}

document.getElementById('cep').addEventListener('focusout', preencherFormulario)