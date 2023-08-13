const btn = document.getElementById('btn')
const form = document.getElementById('form')
form.addEventListener('submit', handalSubmit)

btn.addEventListener('submit', handalSubmit)

function handalSubmit(e){
    console.log("clicked")
    e.preventDefault()
    const ele = document.getElementById('btn')
    const spinner = document.getElementById('spinner')
    btn.setAttribute('disabled', true)
    spinner.classList.add('spinner-border')
    spinner.classList.add('spinner-border-sm')

    setTimeout(() => {
        btn.removeAttribute('disabled')
        spinner.classList.remove('spinner-border')
        spinner.classList.remove('spinner-border-sm')
    }, 3000)
}