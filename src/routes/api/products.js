const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');


//Listado de productos
router.get('/', productsAPIController.list);  //en POSTMAN ->   http://localhost:3000/api/products
//Detalle de un producto
router.get('/:sku', productsAPIController.show);  //en POSTMAN ->   http://localhost:3000/api/products/4

// router.get('/recomended/:rating', productsAPIController.recomended);
// //Agregar un producto
// router.post('/create', productsAPIController.create);
// //Modificar un producto
// router.put('/update/:id', productsAPIController.update);
// //Eliminar un producto
// router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;