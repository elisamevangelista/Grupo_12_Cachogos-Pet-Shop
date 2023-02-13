const express = require("express");
const router = express.Router()
const notLogguedCart = require('../middleware/notLogguedCart')

const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);
router.post('/', mainController.buscar)
router.get('/contacto', mainController.contacto);
router.get('/formasdepago', mainController.formasDePago);
router.get('/terminosYCondiciones', mainController.terminos);
router.get('/cart', notLogguedCart, mainController.cart);
router.post('/cart', notLogguedCart, mainController.cartOrder);
router.get('/order/:id', notLogguedCart, mainController.order);
router.delete('/cart/:id', mainController.destroyCart);

module.exports = router