const express = require("express");
const router = express.Router()

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

const {check} = require("express-validator")
const validacionRegister = [check("email").isEmail().withMessage("Email inválido"),
check("password").isLength({min:8})("La contraseña debe contener al menos 8 caracteres")]

/*** CREATE ONE USER***/  
router.get('/register', validacionRegister, usersController.register)
router.post('/', uploadFile.single('imagen'), usersController.store); 



router.get('/login', usersController.login)
router.post("/login", usersController.processLogin) //ruta para hacer validación

module.exports = router