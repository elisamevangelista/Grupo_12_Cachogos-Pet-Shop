const fs = require('fs');
const path = require('path');
const moment = require('moment')

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersControllers = {
    
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => { 
        res.render('users/register')   //archivo dentro de carpeta users
    },

    store: (req, res) => {
        let {nombre, apellido, email, password, terminos} = req.body

      
        // let imagen = []
        // for (let i = 0; i < 1; i++) {
        //     imagen.push({
        //         imagen1: req.files[i + 1] ? req.files[i + 1].filename : null,  //foto por default-> corregir ruta.
        //         imagen2: req.files[i + 1] ? req.files[i + 1].filename : null,
    
        //     })
        // }
        

        let newUser = {       
            
            id: users[users.length - 1].id + 1,
            nombre: nombre,   
            apellido: apellido,
            email: email,
            password: password,
            imagen: req.file.filename,
            terminos: terminos  //esta bien?
            }

		    users.push(newUser);
		    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

		res.redirect('/products') 
    
       
}}

module.exports = usersControllers