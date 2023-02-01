const fs = require('fs');
const path = require('path');
const moment = require('moment')
let bcrypt = require('bcryptjs') //requerir el metodo de la encriptacion de password.

const { check, validationResult} = require("express-validator");
const db = require('../db/models');


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

    store: async (req, res) => {
        let errors = validationResult(req);
       
        if (errors.isEmpty()) {
            let {nombre, apellido, email, password} = req.body
            let users = await db.Users.count({  //count devuelve el numero de registros encontrados que cumplen el 'where'.
                where: {
                    email: email   // email del cambo de base de datos sea igual al valor del input email del req.body del formulario
                }
            })
            console.log('users:', users)
            if (users > 0){
                errors[0] = {msg: 'El email ya esta registrado. Por favor, ingrese otro email.'}
                // console.log('errors[0].emailError: ', errors[0].emailError )
                return res.render("users/register", {errores: errors.errors, old: req.body})

            }

            let contraseña = password
    
            let contraseñaEncriptada = bcrypt.hashSync(contraseña, 10)
            console.log('req.files:', email)
            db.Users
            .create({
                name: nombre,
                surname: apellido,
                email: email,
                image: req.file.filename,
                password: contraseñaEncriptada,
                userType: 'user'
            })
            .then((user) => {
                delete user.password
                req.session.usuarioALoguearse = user
                res.redirect("/users/perfil")
                
            })
           
        } else{     //errors.errors  -> porque 'errors' es un objeto con distintas claves, una clave es 'errors' que es un array de objetos tambien.
            console.log('errores;', errors)
            return res.render("users/register", {errores: errors.errors, old: req.body}) //old: req.body-> mantiene los datos correctos cargados por el usuario.
        }
       
        
       },

       editUser: (req, res) => {  
        res.render('users/edituser', {miUsuario: req.session.usuarioALoguearse})   //renderizar vista 'edituser' con formulario para modifcar data
    },

        edit: async (req, res) => {

        
        let errors = validationResult(req);
        console.log('error:', errors)

        if (errors.isEmpty()) {
            let {nombre, apellido, email} = req.body   //lo que ingreso se guarda en los 'name' de los input del formulario 
            let user

            await db.Users
            .update({
                name: nombre,    //en formulario, name="nombre" y en la tabla de la db, name es el nombre la columna
                surname: apellido,
                image: req.file.filename,
                
            },{
                where: {
                    email: email,  
                }
            })
            .then(async () => {
                user = await db.Users.findOne({
                    where: {
                        email: email
                    }
                }) 
                // console.log('user: ', user) 
                delete user.password
                req.session.usuarioALoguearse = user     
            })         
                res.redirect("/users/perfil")

        } else{
            return res.render("users/edituser", {errors: errors.mapped, old: req.body}) //old: req.body-> mantiene los datos correctos cargados por el usuario.
        }       
       },

    processLogin: function(req, res){   // ESTE ES EL MIDDLEWARE DEL LOGIN.
     
        let errors = validationResult(req);  //error es un objeto. Validation result es el resultado de la validacion. (req -> llegan los datos del forumlaruio) 
        
         if(errors.isEmpty()){
            // let usersJSON = fs.readFileSync(usersFilePath, 'utf-8')
            let usuarioALoguearse;
            db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (user == undefined){
                    return res.render("users/login", {errors:[
                        {msg: "Email no registrado."}
                    ]})      

                }
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    delete user.password
                    usuarioALoguearse = user
                }
                    
                if(usuarioALoguearse == undefined){
                    return res.render("users/login", {errors:[
                        {msg: "Credenciales Inválidas."}
                    ]})      
                }
                    //console.log("usuarioALog:", usuarioALoguearse)
                    req.session.usuarioALoguearse = usuarioALoguearse    //generacion de identificacion del cliente cuando esta logueado.
                   //console.log('req.session:', req.session)
    
                                                            //recordame es el valor del atributo 'name' del formulario de login.
                    if(req.body.recordame != undefined){  //si por Formu se clickeo el checkbox 'recordarme', entonces se guarda en la cookie el mail del usuario regristrado, en un tiempo de 1 min.
                        
                        res.cookie('recordame', usuarioALoguearse.email, {maxAge: 600000})   
                       // console.log("cookieres:", res.cookie())
                    }
                                
                    
                    res.redirect("/users/perfil")
                })
                
            
        }else{
            return res.render("users/login", {errors: errors.errors, old: req.body}) //old: req.body-> mantiene los datos correctos cargados por el usuario.
        }
       },

       perfil: function(req, res){   // ESTE ES EL MIDDLEWARE DEL LOGIN.
        return res.render("perfil", {miUsuario: req.session.usuarioALoguearse});  //se utilizara en el header, como identificacion del usuario logueado.    
       },
      
       logout: function(req, res){
        req.session.destroy();
        return res.redirect("/")
       }
}
module.exports = usersControllers