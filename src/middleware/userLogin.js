const { check, body } = require("express-validator")       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.

let validationLogin = 
    [
        body("email")
        .custom(async function (value){

            if(value == '') {
                return Promise.reject('El email es obligatorio'); //Promise.reject -> forma de devolver un mensaje de rechazo.
            }
            })

        .bail() //es como un .next, si pasa la primera validación pasa a analizar la segunda
        .isEmail()
        .withMessage("Formato de Email no es válido"),
        check("password")
        .custom(async function (value){
            if(value == '') {
                return Promise.reject('La contraseña es obligatoria'); //Promise.reject -> forma de devolver un mensaje de rechazo.
            }
            })     
        
    ]
    

module.exports = validationLogin