const express = require("express");
const router = express.Router()

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})

const uploadFile = multer({ storage });

const usersController = require('../controllers/usersControllers')



/*** CREATE ONE USER***/  
router.get('/register', usersController.register)
router.post('/', uploadFile.single('imagen'), usersController.store); 



router.get('/login', usersController.login)

module.exports = router