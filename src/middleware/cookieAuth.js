const fs = require('fs');
const path = require('path');


let cookieAuth = (req, res, next) => { //M que atraviesa toda la app para recordar el correo del usuario registrado por 1 min, luego de cerrado el navegador.

    console.log('cookie:', req.cookies)
    console.log('usuarioLogueado:', usuarioALoguearse)
    // recordame viene de -> res.cookie('recordame', usuarioALoguearse.email, {maxAge: 60000})
    if (req.cookies.recordame != undefined &&  //si existe un mail guardado en la cookie y se ha cerrado el navegador sin volverse a loguear, hace lo sguiente:
        usuarioALoguearse == undefined) {

        let usersJSON = fs.readFileSync(usersFilePath, 'utf-8')
        let users;
        if (usersJSON == "") {
            users = []
        } else {
            users = JSON.parse(usersJSON)
        }


        let usuarioALoguearse;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.recordame) {  //si coincidde el mail guardado en la cookie con un mail de algun usaurio de la base, reescribe 'usuarioALoeguerse'
                usuarioALoguearse = users[i];
                break;
            }
        }               //  'usuarioALoeguerse se almacena en session'
        req.session.usuarioALoguearse = usuarioALoguearse;

    }

    next();
}


module.exports = cookieAuth