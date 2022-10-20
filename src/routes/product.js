const express = require("express");
const router = express.Router()

const productControllers = require('../controllers/productControllers')

router.get('/creacionproducto', productControllers.creacionproducto)
router.get('/edicionproducto', productControllers.edicionproducto)
router.get('/productdet', productControllers.productdet)
router.get('/verproducto', productControllers.verproducto)


module.exports = router