const express = require("express");
const router = express.Router()

const validacionRegister = require('../middleware/userRegister')
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

// const userLogged = require('../middleware/userLogged')

/*** REGISTER ONE USER***/    //el M userLogged funciona unicamente si el usuario esta logueado, es decir tiene abierta su sesion.
router.get('/register', usersController.register)  // image es el valor del atributo 'name' para el input de la imagen en el formulario.
router.post('/register',validacionRegister, uploadFile.single('image'), usersController.store); //validacionRegister-> SERIA EL MIDDLEWARE. LO SACAMOS PORQUE DEVUELVE ERROR

/*** LOGIN ONE USER***/  

router.get('/login', usersController.login) //traigo vista formulario
router.post('/login',usersController.processLogin) //posteo la informacion cargada, ruta para hacer validación


router.get('/perfil',usersController.perfil)

module.exports = router