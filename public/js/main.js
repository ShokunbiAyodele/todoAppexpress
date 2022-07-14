import {Http} from './httpserver.js'
let http = new Http()
const selectText = document.querySelectorAll('.fa-trash')
const editText = document.querySelectorAll('.fa-edit')

Array.from(selectText).forEach(element => {
    element.addEventListener('click',deletetodo)
})

Array.from(editText).forEach(element => {
    element.addEventListener('click',textEdit)
})

async function deletetodo(){
    const title = this.parentNode.childNodes[1].textContent
    const description = this.parentNode.childNodes[3].textContent
    try {
        const deletedata = await fetch('/deletepost',{
            method : 'delete',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify({
                'title': title,
                'description' : description
            })
        })
        const response = await deletedata.json()
        if(response === 'records deleted successfully'){
            http.printMessage(response,'success')
            location.reload()
        }
      
    } catch (error) {
        http.printMessage(error,'error')
    }
}


async function textEdit(){
    const title = this.parentNode.childNodes[1].textContent
    try {
        const data = await fetch(`/getpost/${title}`)
        let res = await data.json()
        if(res){
            location.href='/edittodo'
        }
        
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('submit', addToDo)
function addToDo(event){
  
    event.preventDefault()
     const description = document.querySelector('#description').value
     const title = document.querySelector('#title').value
     const time = document.querySelector('#time').value
     if(title === '' && description ===''  && time ===''){
      
        http.printMessage('empty saved is not allowed','error')
     }
     else{
        const data = {
            "description" : description,
            "title" : title,
            "time" : time
        }
       http.addTODo('/addtodo',data).then(result => {
            return result
        }).then(res => {
            if(res === 'added successfully'){
                http.printMessage('your todo successfully added','success')
                location.href='/'
            }
        }).catch(error => console.log(error))

     }
     document.querySelector('#description').value = ''
     document.querySelector('#title').value = ''
}





