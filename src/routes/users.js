const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator")  

const validacionRegister = require('../middleware/userRegister')
const validacionLogin = require('../middleware/userLogin')
const notLogguedCart = require('../middleware/notLogguedCart')
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
     
router.post('/register', uploadFile.single('image'),validacionRegister, usersController.store); //validacionRegister-> SERIA EL MIDDLEWARE. 

/*** LOGIN ONE USER***/  

router.get('/login', userLogged, usersController.login) //traigo vista formulario
router.post('/login', validacionLogin, usersController.processLogin) //posteo la informacion cargada, ruta para hacer validación


/*** EDIT ONE USER***/ 
router.get('/edituser', usersController.editUser)  //renderizar la vista del formulario con los datos actuales del perfil
router.post('/edituser', uploadFile.single('image'), usersController.edit); //permite editar y guardar los datos modificados del formulario.
// va por put, porque se usa para cuando ya tenemos datos cargados y queremos editarlos y guardarlos.

router.get('/perfil', authMiddleware, usersController.perfil)
router.get('/logout', usersController.logout)


/*** CARRITO***/ 
router.get('/carrito',notLogguedCart, usersController.carrito)



// /*** EDIT USER***/
// router.get('/perfil', usersControllers.edicionUsuario)
// router.put('/:sku', uploadFile.array('imagen'), productControllers.update); 



module.exports = router