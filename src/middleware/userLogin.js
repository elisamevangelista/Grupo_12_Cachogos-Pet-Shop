const { check, body } = require("express-validator")       //Middleware utilizado para verificar que los datos ingresados por el usuario al registrarse en el formulario, tengan el formato correcto esperado.


let validationLogin = 
    [
        body("email")
        .exists()
        .withMessage("el email es requerido")
        .bail()
        .isEmail()
        .withMessage("Formato de Email no válido"),
        body("password")
        .isLength({ min: 8 })
        .withMessage("La contraseña debe contener al menos 8 caracteres")
        //.matches(/^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm)   // el  *\d cheque que al menos haya un numero/digito ingresado.
        //.withMessage('Obligatoriamente debe tener una mayuscula y un numero minimamente'),
    ]
    

module.exports = validationLogin