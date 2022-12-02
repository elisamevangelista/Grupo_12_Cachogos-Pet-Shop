const fs = require('fs');
const path = require('path');
const moment = require('moment')
let bcrypt = require('bcryptjs') //requerir el metodo de la encriptacion de password.

const {validationResult} = require("express-validator")


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

        let contraseña = password

        let contraseñaEncriptada = bcrypt.hashSync(contraseña, 10)
        
        let newUser = {       
            
            id: users[users.length - 1].id + 1,
            fechaCreacion: moment().format('L'),
            nombre: nombre,   
            apellido: apellido,
            email: email,
            imagen: req.file ? req.file.filename : 'bird-categoria.jpg',
            password: contraseñaEncriptada,  
            tipodeusuario: 'usuario'
            }

		    users.push(newUser);
		    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '))

		res.redirect('/')   
       },

    processLogin: function(req, res){   // ESTE ES EL MIDDLEWARE DEL LOGIN.
        let errors = validationResult(req);  //error es un objeto. Validation result es el resultado de la validacion. (req -> llegan los datos del forumlaruio) 
        if(errors.isEmpty()){
            let usersJSON = fs.readFileSync(usersFilePath, 'utf-8')
            let users;
            if(usersJSON == ""){
                users = []
            } else {
                users = JSON.parse(usersJSON)
            }
             //for (const user of users) {
               // if(user.email)
            let usuarioALoguearse;    
            for (let i=0; i<users.length; i++){
                if(users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, users[i].contraseña)){
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if(usuarioALoguearse == undefined){
                return res.render("users/login", {errors:[
                    {msg: "Credenciales Inválidas"}
                ]})      
            }
            req.session.usuarioLoguedo = usuarioALoguearse    //generacion de identificacion del cliente cuando esta logueado.
            res.render("index", {miUsuario: req.session.usuarioLoqueado});  //se utilizara en el header, como identificacion del usuario logueado.
        }else{
            return res.render("users/login", {errors: errors.mapped, old: req.body}) //old: req.body-> mantiene los datos correctos cargados por el usuario.
        }
       }
    }

module.exports = usersControllers