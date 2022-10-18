const express = require("express");
const router = express.Router()

const productControllers = require('../controllers/productControllers')

router.get('/creacionproducto', productControllers.creacionproducto)
router.get('/productdet', productControllers.productdet)


module.exports = router