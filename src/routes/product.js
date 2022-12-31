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

/*** GET ALL PRODUCTS***/  

router.get('/', productControllers.productlist )  // trae lista de productos.

/*** CREATE ONE PRODUCT***/  
router.get('/creacionproducto', productControllers.creacionproducto)
router.post('/', uploadFile.array('imagen'), productControllers.store); 


/*** DETAIL OF ONE PRODUCT***/  
router.get('/detail/:sku', productControllers.productdet)


/*** EDIT ONE PRODUCT BY SKU***/  

router.get('/edit', productControllers.edicionporsku)

/*** EDIT ONE PRODUCT***/
router.get('/edit/:sku', productControllers.edicionproducto)
router.put('/:sku', uploadFile.array('imagen'), productControllers.update); 

/*** DELETE ONE PRODUCT***/  
router.delete('/delete/:sku', productControllers.destroy);  /*** seria: /products/delete/:id ***/ 

// router.get('/verproducto', productControllers.verproducto)

router.get('/carrito', productControllers.carrito)



module.exports = router