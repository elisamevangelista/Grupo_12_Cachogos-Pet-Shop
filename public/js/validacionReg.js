window.onload = function(){

    let formularioRegister = document.querySelector('form.formuRegister')

    
    let arrayError =[]
        
    formularioRegister.addEventListener('submit', function(e){

        arrayError = []
       
        let nombre = document.querySelector('#nombre')
        if(nombre.value == ""){
            arrayError.push('El campo nombre es obligatorio.')
        } else if (nombre.value.length < 2){
            arrayError.push('El nombre debe tener al menos 2 caracteres.')
        }

        let apellido = document.querySelector('input.lastnameInput')
        if(apellido.value == ""){
            arrayError.push('El campo apellido es obligatorio.')
        } else if (apellido.value.length < 2){
            arrayError.push('El apellido debe tener al menos 2 caracteres.')
        }

        let emailForm = document.querySelector('input.mailInput')

        function isEmail(email){
            return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
        }

        function isPassword(passwor){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(passwor);
        }

        if(emailForm.value == ""){
            arrayError.push('El campo email es obligatorio.')
        } else if (isEmail(emailForm.value) === false){
                arrayError.push('Ingrese un e-mail válido.')
                
        }


        let allowedExtension = ['jpeg', 'jpg', 'png', 'gif']; 
        let fileExtension = document.getElementById('image').value.split('.').pop().toLowerCase()
       
        if (allowedExtension.indexOf(fileExtension) == -1) {
            arrayError.push('El formato de la imagen cargada no es válido.')  
             
        }
      
        
        // for (let i =0; i< allowedExtension.length; i++) {


        //     if (fileExtension === allowedExtension[i]) {
                
        //         break;
        //     } else {
        //         arrayError.push('El formato de la imagen cargada no es válido.')
        //     }
        // }


        let passwordForm = document.querySelector('input.contraInput')

        if(passwordForm.value == ""){
            arrayError.push('El campo password es obligatorio.')
        } else if (passwordForm.value.length < 8){
            arrayError.push('La contraseña tiene que ser de 8 a 16 carácteres.')
        } else if (isPassword(passwordForm.value) === false){
            arrayError.push('La contraseña debe incluir minimamente una mayúscula, una minúscula, un número y un caracter especial.')
        }
         
                                                            //bird-categoria.jpg--> ['bird-categoria', 'jpg' ]  -> ['JPG'] -> ['jpg']
        // function validateFile(fileExtension) {
            
            // if(arrayError.length > 0){

            //     e.preventDefault()

            //     let ularrayError = document.querySelector('div.arrayError ul')  //etiqueta UL dentro del div clase 'arrayError' creado en archivo register.

            //     for(let i =0; i < arrayError.length; i++){

            //         ularrayError.innerHTML += "<li>" + arrayError[i] + "</li>"
            //     }
            // }
            console.log('arrayError:', arrayError)

            let errores = document.querySelector('.errores')

            if (arrayError.length > 0) {
                e.preventDefault()
                errores.innerHTML = ''
                for (let error of arrayError) {
                    errores.innerHTML += `<li>${error}</li>`
                }
            }
    
        })

}