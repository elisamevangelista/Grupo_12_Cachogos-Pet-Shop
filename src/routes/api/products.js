const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de películas
router.get('/', productsAPIController.list);
//Detalle de una película
router.get('/:id', productsAPIController.detail);
//Filtrar películas por rating. Puede colocar desde 1 hasta 10
// router.get('/recomended/:rating', productsAPIController.recomended);
//Agregar una película
router.post('/create', productsAPIController.create);
//Modificar una película
router.put('/update/:id', productsAPIController.update);
//Eliminar una película
router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;