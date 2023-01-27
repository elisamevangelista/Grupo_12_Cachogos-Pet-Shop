const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator")  

//const validacionRegister = require('../middleware/userRegister')
const validacionLogin = require('../middleware/userLogin')
const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersControllers')

const userLogged = require('../middleware/userLogged')
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db/models');

/*** REGISTER ONE USER***/    //el M userLogged funciona unicamente si el usuario esta logueado, es decir tiene abierta su sesion.
router.get('/register', userLogged, usersController.register)  // image es el valor del atributo 'name' para el input de la imagen en el formulario.

db.Users.findAll()
    .then((users) => {
        
        router.post('/register', uploadFile.single('image'), 
        [
            check("nombre")
            .exists()
            .withMessage("El campo de nombre es obligatorio")
            .bail()
            .isLength({ min:2 })
            .withMessage("El campo debe contar al menos con dos caracteres"),
    
            check("apellido")
            .exists()
            .withMessage("El campo de apellido es obligatorio")
            .bail()
            .isLength({ min:2 })
            .withMessage("el campo debe contar al menos con dos caracteres"),
    
            check("email")
            .custom(async function (value){
                console.log("value:", value)
                if(typeof value == '') {
                    return Promise.reject('El email es obligatorio');
                }
                let contador = 0;
                for (let i=0; i < users.length; i++) {
    
                    if(users[i].email == value) {
    
                        contador = contador + 1
    
                    }
                }
                //console.log("contador:", contador)
                    if (contador == 0){
    
                        return true;
    
    
                    } else {
    
                        return false;
                    }
    
                })
            .withMessage('El usuario ya existe. Por favor, ingrese otro e-mail diferente.')
            .bail() //es como un .next, si pasa la primera validación pasa a analizar la segunda
            .isEmail()
            .withMessage("Formato de Email no es válido"),
                         
            check("password")
            .exists()
            .withMessage("El password es obligatorio")
            .bail()
            .isLength({ min: 8 })
            .withMessage("La contraseña debe contener al menos 8 caracteres")
            .bail()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/gm)   // el  *\d cheque que al menos haya un numero/digito ingresado.
            .withMessage('La contraseña debe incluir minimamente una mayúscula, una minúscula, un número y un caracter especial'),
            
            body('image')
            .custom(function (value, {req}){
    
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
    
            })
            .withMessage('Archivo no cargado o no compatible con las siguientes extensiones: JPG, JPEG, PING O GIF.'), 
    
        ], usersController.store); //validacionRegister-> SERIA EL MIDDLEWARE. LO SACAMOS PORQUE DEVUELVE ERROR

    })
    .catch((errors) => {
        console.log(errors)

    })



/*** LOGIN ONE USER***/  

router.get('/login', userLogged, usersController.login) //traigo vista formulario
router.post('/login', validacionLogin, usersController.processLogin) //posteo la informacion cargada, ruta para hacer validación


/*** EDIT ONE USER***/ 
router.get('/edituser', usersController.editUser)  //renderizar la vista del formulario con los datos actuales del perfil
router.post('/edituser', uploadFile.single('image'), usersController.edit); //permite editar y guardar los datos modificados del formulario.
// va por put, porque se usa para cuando ya tenemos datos cargados y queremos editarlos y guardarlos.

router.get('/perfil', authMiddleware, usersController.perfil)
router.get('/logout', usersController.logout)

// /*** EDIT USER***/
// router.get('/perfil', usersControllers.edicionUsuario)
// router.put('/:sku', uploadFile.array('imagen'), productControllers.update); 



module.exports = router