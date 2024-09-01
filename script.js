// const consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(resposta => resposta.json()) //converte para json
//     //imprime no console os dados pegos da API
//     .then(res => {
//         if (res.erro) {
//             throw Error('Esse CEP não existe!') //caso o CEP pego não exista, é imiprimido a mensagem de erro
//         } else {
//             console.log(res);
//         }
//     })
//     .catch(erro => console.log(erro))//pega o resultado se houver algum erro
// console.log(consultaCep);

async function buscarEndereco(cep) {
    let erroMsg = document.getElementById('erro')
    erroMsg.innerHTML = ''
    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        let consultaCepConvert = await consultaCep.json();
        if (consultaCepConvert.erro) {
            throw Error("CEP não existe!")
        }
        let cidade = document.getElementById('cidade')
        let logradouro = document.getElementById('endereco')
        let estado = document.getElementById('estado')

        cidade.value = consultaCepConvert.localidade
        logradouro.value = consultaCepConvert.logradouro
        estado.value = consultaCepConvert.uf

    } catch (erro) {
        erroMsg.innerHTML = `<p>CEP inválido. Informe um CEP válido</p>`
    }

}

const cep  = document.getElementById('cep')
cep.addEventListener("focusout", () => buscarEndereco(cep.value))