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


/*** REGISTER ONE USER***/  
router.get('/register', usersController.register)  // image es el valor del atributo 'name' para el input de la imagen en el formulario.
router.post('/',validacionRegister, uploadFile.single('image'), usersController.store); //validacionRegister-> SERIA EL MIDDLEWARE. LO SACAMOS PORQUE DEVUELVE ERROR

/*** LOGIN ONE USER***/  

router.get('/login', usersController.login)
router.post("/login",usersController.processLogin) //ruta para hacer validación

module.exports = router