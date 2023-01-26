const { check, body } = require("express-validator");       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.
const usersControllers = require("../controllers/usersControllers");


let validationRegister = 
    [
        check("nombre").isLength({
            min:2
        })
        .withMessage("el nombre es obligatorio y debe contar al menos con dos caracteres"),
        check("apellido").isLength({
            min:2
        })
        .withMessage("el apellido es obligatorio y debe contar al menos con dos caracteres"),
        check("email").exists().withMessage("El campo de Email es obligatorio"),
        check("email").isEmail().withMessage("Formato de Email no es válido"),
        body('email').custom(function (value){

            let contador = 0;
            for (let i=0; i < users.length; i++) {

                if(users[i].email == value) {

                    contador = contador + 1

                }
            }
                if (contador == 0){

                    return true;


                } else{

                    return false;
                }

            }).withMessage('El usuario ya existe. Por favor, ingrese otro e-mail diferente.'), 
            
            
        check("password").exists().withMessage("La contraseña debe contener al menos 8 caracteres"),
        check("password").isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
        check("password").matches(/^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm),   // el  *\d cheque que al menos haya un numero/digito ingresado.
        //.withMessage('Obligatoriamente debe tener una mayuscula y un numero minimamente'),
        body('image').custom(function (value, {req}){

            let ext
            if(req.file != undefined){

                ext = "" +path.extname(req.file.filename).toLowerCase() 

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

        }).withMessage('Archivo no cargado o no compatible con las siguientes extensiones: JPG, JPEG, PING O GIF.'), 

    ]
    

module.exports = validationRegister
