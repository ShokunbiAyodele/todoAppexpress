export class Http{
    // constructor(title=null, description=null){
    //     this.title = title
    //     this.description = description
    // }
    async deletodo(url,data){
        const deletepost = await fetch(url,{
               method: 'delete',
               headers : {'Content-Type':'application/json'},
               body : JSON.stringify(data)
           })
           const res = await deletepost.json()
           return res
       }
       
    async addTODo(url,data){
        const postTdo = await fetch(url,{
            method : 'POST',
            headers : {'Content-Type':'application/json'},
            body : JSON.stringify(data)
        })
        const response = await postTdo.json()
        return response
    }
   
    printMessage(message,classalert){
        //create div
       const div = document.createElement('div')
        div.className = classalert
        div.appendChild(document.createTextNode(message))
          //get a form element 
          const section = document.querySelector('section')
          //get body element 
          const body = document.querySelector('body')
          body.insertBefore(div,section)
          this.removeaLERT(`.${classalert}`)      
    }

    removeaLERT(classType){
        if(classType !== ''){
            setTimeout(() => {
                document.querySelector(classType).remove()
            }, 5000);
          }

    }
}


