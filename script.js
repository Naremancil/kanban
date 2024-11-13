if(localStorage.getItem('isDarkMode') == 1){
    document.querySelector("body").classList.toggle("dark-mode")
}

document.querySelector('#dark-mode').addEventListener('change', () => {
    document.querySelector("body").classList.toggle("dark-mode")
    if(localStorage.getItem('isDarkMode') == 1){
        localStorage.setItem('isDarkMode', 0)
    } else localStorage.setItem('isDarkMode', 1)
})


async function checkEmail(email){

}