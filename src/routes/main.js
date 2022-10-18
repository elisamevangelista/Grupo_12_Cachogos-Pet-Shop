const express = require("express");
const router = express.Router()

const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index)
router.get('/register', mainController.register)
router.get('/login', mainController.login)
router.get('/carrito', mainController.carrito)

module.exports = router