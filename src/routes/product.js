const express = require("express");
const router = express.Router()

const multer = require('multer');
const path = require('path');

const validationProduct = require('../middleware/productCreation')
const validationProductEdit = require('../middleware/productEdit')
const notProdCreation = require('../middleware/notProdCreation')

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
router.post('/', productControllers.buscar )
/*** CREATE ONE PRODUCT***/  
router.get('/creacionproducto', notProdCreation, productControllers.creacionproducto)  //notProdCreation es el M que no permite crear un producto al no estar logged como Admin. Redirige a la home.
router.post('/creacionproducto', uploadFile.array('imagen'), validationProduct, productControllers.store); 


/*** DETAIL OF ONE PRODUCT***/  
router.get('/detail/:sku', productControllers.productdet)
router.post('/detail/:sku', productControllers.añadirCarrito)

/*** EDIT ONE PRODUCT BY SKU***/  

router.get('/edit', notProdCreation, productControllers.edicion)  //renderiza el total de los productos, los cuales puede ser seleccionados y editados.

/*** EDIT ONE PRODUCT***/
router.get('/edit/:sku', notProdCreation, productControllers.edicionproducto)  //trae vista de edicion con info precargada.
router.put('/:sku', uploadFile.array('imagen'), validationProductEdit, productControllers.update); 

/*** DELETE ONE PRODUCT***/  
router.delete('/delete/:sku', productControllers.destroy);  /*** seria: /products/delete/:id ***/ 

// router.get('/verproducto', productControllers.verproducto)



module.exports = router