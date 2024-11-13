// Autenticação por Email: O sistema deve permitir que o usuário faça login através do email informado. O acesso será autenticado por meio de um token de sessão.

// Seleção de Quadro: O usuário deverá ser capaz de selecionar um quadro específico a partir dos quadros disponíveis no sistema.

// Apresentação do Quadro: Após a seleção, o sistema deverá exibir o quadro escolhido, com as colunas e tarefas associadas a ele, permitindo o acompanhamento do progresso das atividades.

// Listagem de Colunas do Quadro Selecionado: O sistema deve listar todas as colunas pertencentes ao quadro selecionado, mostrando claramente suas respectivas divisões.

// Listagem de Tarefas da Coluna: O sistema deverá exibir todas as tarefas associadas a uma coluna específica do quadro selecionado.

// Criação, Atualização e Exclusão de Tarefas em uma Coluna Específica: O usuário deverá poder criar novas tarefas, atualizar tarefas existentes ou excluir tarefas em qualquer coluna de seu quadro.

//  Alteração de Tema (Dark/Light): O sistema deve possibilitar ao usuário alternar entre dois temas visuais: Dark e Light, oferecendo uma experiência personalizada de interface.
if(localStorage.getItem('isDarkMode') == 1){
    document.querySelector("body").classList.toggle("dark-mode")
}

document.querySelector('#dark-mode').addEventListener('change', () => {
    document.querySelector("body").classList.toggle("dark-mode")
    if(localStorage.getItem('isDarkMode') == 1){
        localStorage.setItem('isDarkMode', 0)
    } else localStorage.setItem('isDarkMode', 1)
})