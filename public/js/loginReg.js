window.onload = function(){

    let formularioLog = document.querySelector('form.formuLogin')

    
    let arrayError =[]
        
    formularioLog.addEventListener('submit', function(e){

        arrayError = []
       
        
        let emailForm = document.querySelector('input.mailInput')
      

        if(emailForm.value == ""){
            arrayError.push('El campo email es obligatorio.')                
        }

        let passwordForm = document.querySelector('input.contraInput')

        if(passwordForm.value == ""){
            arrayError.push('El campo password es obligatorio.')
        }
         
        
            let erroresLogin = document.querySelector('.erroresLogin')

            if (arrayError.length > 0) {
                e.preventDefault()
                erroresLogin.innerHTML = ''
                for (let error of arrayError) {
                    erroresLogin.innerHTML += `<li>${error}</li>`
                }
            }
    
        })

}