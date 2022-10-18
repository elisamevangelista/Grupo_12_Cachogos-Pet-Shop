const express = require("express");
const router = express.Router()
const mainController = require('../controllers/mainControllers/mainControllers')

router.get('/', mainController.index)
router.get('/productdetail', mainController.productDetail)
router.get('/register', mainController.register)
router.get('/login', mainController.login)
router.get('/carrito', mainController.carrito)

module.exports = router