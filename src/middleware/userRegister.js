const { check, body } = require("express-validator");       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.
const path = require('path')


let validationRegister = 
     [
    check("nombre")   //nombre -> es el valor del 'name' del inmput del formulario.
    .custom(async function (value){
        if(value == '') {
            return Promise.reject('El nombre es obligatorio'); //Promise.reject -> forma de devolver un mensaje de rechazo.
        }
        })     
    .bail()  // no muestra siguiente error si no cumple la primera.
    .isLength({ min:2 })
    .withMessage("El nombre debe contar al menos con dos caracteres"),

    check("apellido")
    .custom(async function (value){
        if(value == '') {
            return Promise.reject('El apellido es obligatorio'); //Promise.reject -> forma de devolver un mensaje de rechazo.
        }
        })     
    .bail()
    .isLength({ min:2 })
    .withMessage("el apellido debe contar al menos con dos caracteres"),

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
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener al menos 8 caracteres")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/gm)   // el  *\d cheque que al menos haya un numero/digito ingresado.
    .withMessage('La contraseña debe incluir minimamente una mayúscula, una minúscula, un número y un caracter especial'),
    
    body('image')
    .custom(function (value, {req}){
        if(req.file != undefined){
            const ext = "" +path.extname(req.file.filename).toLowerCase() 
            if (
                ext == ".jpg" ||
                ext == ".jpeg" ||
                ext == ".png"   ||
                ext == ".gif" ) {

                    return true;
                } else {
                    return false
                }
        } else {
            return false
        }         

    })
    .withMessage('Archivo no cargado o no compatible con las siguientes extensiones: JPG, JPEG, PING O GIF.'), 

] 

module.exports = validationRegister
