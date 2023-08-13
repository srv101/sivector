form = document.getElementsByTagName('form')[0]
form.addEventListener('submit', handalSubmit)

form.addEventListener('change', handalChange)


function handalChange(e){
    console.log('Change occured')
    let msgEle = document.getElementById('message')
    if(msgEle.classList.contains('success')){
        msgEle.classList.remove('success')
        msgEle.innerText = ''
    }else if(msgEle.classList.contains('error')){
        msgEle.classList.remove('error')
        msgEle.innerText = ''
    }
}

const message = document.getElementById('message')


function handalSubmit(e){
    e.preventDefault()

    handalChange()

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contact').value,
        subject: document.getElementById('subject').value,
        textarea: document.getElementById('textarea').value
    }

    fetch("/form", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        console.log('DATA', data)
        if(data.success){
            const message = document.getElementById('message')
            message.classList.add('success')
            message.innerText = data.data
        }else{
            const message = document.getElementById('message')
            message.classList.add('error')
            message.innerText = data.data
        }
    })
    .catch(err => console.log(err))
}

