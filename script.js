// Autenticação por Email: O sistema deve permitir que o usuário faça login através do email informado. O acesso será autenticado por meio de um token de sessão.

// Seleção de Quadro: O usuário deverá ser capaz de selecionar um quadro específico a partir dos quadros disponíveis no sistema.


// Criação, Atualização e Exclusão de Tarefas em uma Coluna Específica: O usuário deverá poder criar novas tarefas, atualizar tarefas existentes ou excluir tarefas em qualquer coluna de seu quadro.



getColunas()
const colunas = []
localStorage.setItem("colunasId", '')
if(localStorage.getItem("colunasId").length != 0) colunas.push(JSON.parse(localStorage.getItem("colunasId")))


// logout
document.querySelector("#sair").addEventListener('click', () => {
    document.querySelector('#login').classList.toggle("off")
    document.querySelector('#logout').classList.toggle("off")
})

document.querySelector("#entrar").addEventListener('click', () => {
    document.querySelector('#login').classList.toggle("off")
    document.querySelector('#logout').classList.toggle("off")
})
//

// DarkMode

document.querySelector('#dark-mode').addEventListener('change', () => {
    // Acionando o dark-mode
    document.querySelector("body").classList.toggle("dark-mode")
    let dark_coluna = document.querySelectorAll(".colunaKanban")
    console.log(dark_coluna)
    dark_coluna.forEach(coluna => {
        coluna.classList.toggle("dark-mode")
        console.log(coluna)
    })

    // salvando estado do dark-mode
    if(localStorage.getItem('isDarkMode') == 1){
        localStorage.setItem('isDarkMode', 0)
    } else localStorage.setItem('isDarkMode', 1)
})

// Efeitos do site
const botaoSair = document.querySelector("#sair")

// Efeito em cima do botão de sair com rostinho triste :c
botaoSair.addEventListener("mouseover", () => {
    document.querySelector('#sadFace').classList.toggle('off')
})

botaoSair.addEventListener("mouseout", () => {
    document.querySelector('#sadFace').classList.toggle('off')
})

// API pra pegar as colunas
async function getColunas() {
    try{
        // retorno do quadro escolhido, 33 no caso
        const response_colunas = await fetch("https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=33")

        // transformando a resposta em Json 
        const data_colunas = await response_colunas.json()
        
       
       // Renderizar Colunas
        data_colunas.forEach(coluna => {
            
            // Salvando as informações pra um próximo render
            colunas.push(coluna.Id)
            localStorage.setItem("colunasId", colunas)

            // Container principal
            var divColuna = document.createElement("div")
            divColuna.classList.toggle("colunaKanban")

            // Titulo do container
            var h2Titulo = document.createElement("h2")
            h2Titulo.classList.toggle("tituloColuna")
            h2Titulo.innerText = `${coluna.Name}`

            // Container de tarefas
            var divTarefas = document.createElement("div")
            divTarefas.classList.toggle("tarefasKanban")
            divTarefas.id = `${coluna.Id}`

            // Botão de criação
            var botao = document.createElement("button")
            botao.classList.toggle("botao-pagina")
            botao.innerText = 'nova tarefa'

            // Montando a estrutura
            divColuna.appendChild(h2Titulo)
            divColuna.appendChild(divTarefas)
            divColuna.appendChild(botao)

            // Renderizando toda a estrutura
            document.querySelector("#kanban").appendChild(divColuna)
        })

    }catch(error){
        console.log("erro ao trazer colunas", error)
    } finally {
        if(localStorage.getItem('isDarkMode') == 1){
            document.querySelector("body").classList.toggle("dark-mode")
            let dark_coluna = document.querySelectorAll(".colunaKanban")
            dark_coluna.forEach(coluna => {
                coluna.classList.toggle("dark-mode")
            })
        }
    }
}

async function getTarefas(id){
    try{
        // retorno de todas as tarefas
        const response_tasks = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/TasksByColumnId?ColumnId=${id}`)

        // Transformando a promise em Json
        const data_tasks = await response_tasks.json()
        
        // pra cada tarefa recolhida, vou colocar dentro do seu respectivo quadro
        data_tasks.forEach(tarefa => {
            // Criação do molde da tarefa
            var pTarefa = document.createElement("p")
            pTarefa.classList.toggle("tarefa")
            pTarefa.innerText = tarefa.Title

            // Colocando dentro da coluna
            var coluna = document.getElementById(`${id}`).appendChild(pTarefa)

        })
        // console.log(data_tasks)
    }catch(error){
        console.log("erro ao trazer tarefas", error)
    }
}

function login() {
    colunas.forEach(id => {
        getTarefas(id)
    })
}