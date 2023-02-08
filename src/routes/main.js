const express = require("express");
const router = express.Router()

const mainController = require('../controllers/mainControllers')

router.get('/', mainController.index);
router.post('/', mainController.buscar)

module.exports = router