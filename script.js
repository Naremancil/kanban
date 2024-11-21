// Autenticação por Email: O sistema deve permitir que o usuário faça login através do email informado. O acesso será autenticado por meio de um token de sessão.

// Criação, Atualização e Exclusão de Tarefas em uma Coluna Específica: O usuário deverá poder criar novas tarefas, atualizar tarefas existentes ou excluir tarefas em qualquer coluna de seu quadro.


//getColunas()
getQuadros()

// memória do dark-mode
if(localStorage.getItem('isDarkMode') == 1){
    document.querySelector("body").classList.toggle("dark-mode")
    let dark_coluna = document.querySelectorAll(".colunaKanban")
    dark_coluna.forEach(coluna => {
        coluna.classList.toggle("dark-mode")
    })
}

// logout
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

async function getQuadros() {
    try{
        const response = await fetch("https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards")
        const data = await response.json()
        data.forEach(quadro => {
            var option = document.createElement("option")
            option.innerText = quadro.Name
            option.value = quadro.Id
            option.classList.toggle("opcao")
            document.querySelector('#boardSelect').appendChild(option)
        })

    }catch(error){
        console.log("nao consegui pegar os quadros\n", error)
    }
}

async function getColunas(id) {
    try{
        const response_colunas = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${id}`)
        const data_colunas = await response_colunas.json()
        
        data_colunas.forEach(coluna => {
            var divColuna = document.createElement("div")
            divColuna.classList.toggle("colunaKanban")

            // Titulo do container
            var h2Titulo = document.createElement("h2")
            h2Titulo.classList.toggle("tituloColuna")
            h2Titulo.innerText = `${coluna.Name}`

            // Container de tarefas
            var divTarefas = document.createElement("div")
            divTarefas.classList.toggle("tarefasKanban")

            // Botão de criação
            var botao = document.createElement("button")
            botao.classList.toggle("botao-pagina")
            botao.innerText = 'nova tarefa'

            // Montando a estrutura
            divColuna.appendChild(h2Titulo)
            divColuna.appendChild(divTarefas)
            divColuna.appendChild(botao)
            
            
            getTarefas(coluna.Id, divColuna)
            // Renderizando toda a estrutura
            
            document.querySelector(".quadro-tarefas").appendChild(divColuna)
        })
    }catch(error){
        console.log("erro ao trazer colunas\n", error)
    }
}

function getTarefas(id, coluna){
    try{
        // retorno de todas as tarefas
        fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/TasksByColumnId?ColumnId=${id}`)
        .then(res => res.json())
        .then((tasks) => {
            tasks.forEach(tarefa => {
                    // Criação do molde da tarefa
                    var pTarefa = document.createElement("p")
                    pTarefa.classList.toggle("tarefa")
                    pTarefa.innerText = tarefa.Title
        
                    // Colocando dentro da coluna
                    coluna.childNodes[1].appendChild(pTarefa)
                })
        })
    }catch(error){
        console.log("erro ao trazer tarefas\n", error)
    }
}

// API pra postar quadros[

async function postQuadros(){
    try{
        const post = new XMLHttpRequest()
        post.open('POST', 'https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board', true)

        post.send({
        "Name": `${document.querySelector('novoQuadroNome').value}`,
        "Description": `${document.querySelector('novoQuadroDescricao').value}`,
        "HexaBackgroundCoor": `${document.querySelector('novoQuadroCor').value}`,
        "IsActive": true,
        "CreatedBy": 7,
        })
        console.log(post.status)

    }catch(error){
        console.log("erro ao postar quadro\n", error)
    }
}

async function postColunas(){

}

async function postTarefas(){

}

const teste = document.querySelector(".quadro-tarefas")

// API
document.querySelector("#boardSelect").addEventListener("change", e => {
    if(document.querySelector(".quadro-tarefas").childNodes != null){
        teste.innerHTML = ''
    }
    document.querySelector(".quadro-tarefas").id = e.target.value
    getColunas(e.target.value)
})

async function login(email) {
    try{
        const response = await fetch(`https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/GetPersonByEmail?Email=${email.trim()}`)
        //console.log(response.status)
        if(response.status == 200) {
            document.querySelector("#logout").classList.toggle("off")
            document.querySelector("#login").classList.toggle("off")
        } else if(response.status == 422){
            var random = Math.floor(Math.random() * 4)
            console.log(random)
            switch (random){
                case 0:
                    document.querySelector("i").classList.value = "fa-solid fa-face-sad-tear"
                    break;
                case 1:
                    document.querySelector("i").classList.value = "fa-solid fa-face-sad-cry"
                    break
                case 2:
                    document.querySelector("i").classList.value = "fa-solid fa-face-frown-open"
                    break
                case 3:
                    document.querySelector("i").classList.value = "fa-solid fa-face-dizzy"
                    break
                default: document.querySelector("i").classList.value = "fa-solid fa-face-flushed"
            }
            document.querySelector("#login-errado").innerText = "Ops... não achei esse email"
            if(document.querySelector("#login-errado").classList.value == "off"){
                document.querySelector("#login-errado").classList.toggle("off")
            }
        } else if(response.status ==  504){
            console.log("no internet friend")
        }
    }catch(error){
        console.log("Nao encontrei essa pessoa XD\n", error)
    }finally{
        getQuadros()
    }
}

document.querySelector("#sair").addEventListener("click", () => {
    document.querySelector("#logout").classList.toggle("off")
    document.querySelector("#login").classList.toggle("off")
})

document.querySelector("#entrar").addEventListener("click", e => {
    e.preventDefault()
    login(document.querySelector('#login-email').value)
})