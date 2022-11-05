const express = require("express");
const router = express.Router()

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const uploadFile = multer({ storage });



const productControllers = require('../controllers/productControllers')

router.get('/', productControllers.productlist )  // trae lista de productos.


router.get('/creacionproducto', productControllers.creacionproducto)
router.post('/', uploadFile.single('imagen'), productControllers.store); 


router.get('/detail/:id', productControllers.productdet)



router.get('/edit', productControllers.edicionporsku)


router.get('/edit/:id', productControllers.edicionproducto)
router.put('/:id', uploadFile.single('imagen'), productControllers.update); 



router.get('/verproducto', productControllers.verproducto)

router.get('/carrito', productControllers.carrito)



module.exports = router