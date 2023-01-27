// const { check, body } = require("express-validator");       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.
// const usersControllers = require("../controllers/usersControllers");
// const db = require('../db/models');

// let validationRegister 

// db.Users.findAll()
//     .then((users) => {

//     validationRegister = 
//     [
//         check("nombre")
//         .exists()
//         .withMessage("El campo de nombre es obligatorio")
//         .bail()
//         .isLength({ min:2 })
//         .withMessage("El campo debe contar al menos con dos caracteres"),

//         check("apellido")
//         .exists()
//         .withMessage("El campo de apellido es obligatorio")
//         .bail()
//         .isLength({ min:2 })
//         .withMessage("el campo debe contar al menos con dos caracteres"),

//         check("email")
//         .custom(async function (value){
//             let contador = 0;
//             for (let i=0; i < users.length; i++) {

//                 if(users[i].email == value) {

//                     contador = contador + 1

//                 }
//             }
//             console.log("contador:", contador)
//                 if (contador == 0){

//                     return false;


//                 } else {

//                     return true;
//                 }

//             })
//         .withMessage('El usuario ya existe. Por favor, ingrese otro e-mail diferente.')
//         .bail() //es como un .next, si pasa la primera validación pasa a analizar la segunda
//         .isEmail()
//         .withMessage("Formato de Email no es válido"),
                     
//         check("password")
//         .exists()
//         .withMessage("El password es obligatorio")
//         .bail()
//         .isLength({ min: 8 })
//         .withMessage("La contraseña debe contener al menos 8 caracteres")
//         .bail()
//         .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/gm)   // el  *\d cheque que al menos haya un numero/digito ingresado.
//         .withMessage('La contraseña debe incluir minimamente una mayúscula, una minúscula, un número y un caracter especial'),
        
//         body('image')
//         .custom(function (value, {req}){

//             let ext
//             if(req.file != undefined){

//                 ext = "" +path.extname(req.file.filename).toLowerCase() 

//                 if (
//                     ext == ".jpg" ||
//                     ext == ".jpeg" ||
//                     ext == ".png"   ||
//                     ext == ".gif" ) {
    
//                         return true;
//                     } else {
//                         return false
//                     }
//             } else {
//                 return false
//             }         

//         })
//         .withMessage('Archivo no cargado o no compatible con las siguientes extensiones: JPG, JPEG, PING O GIF.'), 

//     ]
// })   

// module.exports = validationRegister
