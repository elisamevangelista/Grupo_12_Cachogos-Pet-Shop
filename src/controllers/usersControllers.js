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
        let {nombre, apellido, email, password} = req.body
        
        let newUser = {       
            
            id: users[users.length - 1].id + 1,
            nombre: nombre,   
            apellido: apellido,
            email: email,
            imagen: req.file.filename,
            password: password,  //esta bien?
            }

		    users.push(newUser);
		    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

		res.redirect('/products') 
    
       
}}

module.exports = usersControllers