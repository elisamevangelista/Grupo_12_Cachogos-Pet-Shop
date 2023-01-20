window.addEventListener('load', function(){

    let formularioRegister = document.querySelector('form.formuRegister')

    formularioRegister.addEventListener('submit', function(e){


        let errores =[]
        
        let nombre = document.querySelector('input.nameInput')
        if(nombre.value == ""){
            errores.push('Este campo es obligatorio.')
        } else if (nombre.value.length < 2){
            errores.push('El nombre debe tener al menos 2 caracteres.')
        }

        let apellido = document.querySelector('input.lastnameInput')
        if(apellido.value == ""){
            errores.push('Este campo es obligatorio.')
        } else if (apellido.value.length <= 2){
            errores.push('El apellido debe tener al menos 2 caracteres.')
        }

        let emailForm = document.querySelector('input.mailInput')

        function isEmail(email){
            return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z](2,4))$/.test(email);
        }

        function isPassword(passwor){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(passwor);
        }

        if(emailForm.value == ""){
            errores.push('Este campo es obligatorio.')
        } else if (isEmail(emailForm.value) === false){
                errores.push('Ingrese un e-mail válido.')
                
        }

        let passwordForm = document.querySelector('input.contraInput')

        if(passwordForm.value == ""){
            errores.push('Este campo es obligatorio.')
        } else if (passwordForm.value.length <= 8){
            errores.push('La contraseña debe tener al menos 8 caracteres.')
        } else if (isPassword(passwordForm.value) === false){
            errores.push('La contraeña no es válida.')
        }
         
                            
        // function validateFile(fileExtension) {
            let allowedExtension = ['jpeg', 'jpg', 'png', 'gif']; 
            let fileExtension = document.getElementById('image').value.split('.').pop().toLowerCase()
           
            for (let i =0; i< allowedExtension.length; i++) {

                if (fileExtension === allowedExtension[i]) {
                    
                    break;
                } else {
                    errores.push('El formato de la imagen cargada no es válido.')
                }
            }

            if(errores.length > 0){

                e.preventDefault()

                let ulErrores = document.querySelector('div.errores ul')  //etiqueta UL dentro del div clase 'errores' creado en archivo register.

                for(let i =0; i < errores.length; i++){

                    ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
                }
            }
    
        })

})