const { check, body } = require("express-validator");       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.
const path = require('path')


let validationProduct = 
     [
    check("nombre")   //nombre -> es el valor del 'name' del inmput del formulario.
    .custom(async function (value){
        if(value == '') {
            return Promise.reject('El nombre es obligatorio'); //Promise.reject -> forma de devolver un mensaje de rechazo.
        }
        })     
    .bail()  // no muestra siguiente error si no cumple la primera.
    .isLength({ min:5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),

    check("descripcion")
    .optional({nullable: true, checkFalsy: true})  //si no se completa nada, esta ok. Si se completa, debe tener un minimo de 20 caracteres.
    .bail()
    .isLength({ min:20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

    
    body('imagen')
    .custom(function (value, {req}){
       
        if(req.files != undefined){    // req.files  -> va 'files' en plural porque es un array, que viene de la declaracion de la ruta.
      
            let ext = []
            for (let i of req.files) {  //req.files es un array.   ->  i es cada posicion del array.
                ext.push("" +path.extname(i.filename).toLowerCase()) 
            }
            // const ext = "" +path.extname(req.files.filename).toLowerCase() 
            console.log('ext:', ext)
            if (!ext.includes(".jpg" || ".jpeg" || ".png" || ".gif" )) {
                    return false;  //el false corta y arroja el mensaje
                } else {
                    return true
                }
        } else {
            return false
        }         

    })
    .withMessage('Archivo de imagen no cargado o no compatible con las siguientes extensiones: JPG, JPEG, PING O GIF.'), 

] 

module.exports = validationProduct
