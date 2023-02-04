const path = require('path');
const db = require('../../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');



const usersAPIController = {


    list: (req, res) => {

        db.Users.findAll({

            attributes: ['id','name','email']  // id','name','email' coinciden en nombre con las columnas de la base de datos.

        })
        .then(users => {
            return res.status(200).json({

                count: users.length,  // array de registros de users.
                users: users,  //se trae 
                detail: 'api/users',  //users es la ruta dentro de la carpeta api.
                status: 200

            })
         
        })

    },


    show: (req, res) => {

        db.Users.findOne({
            where: {
                id: req.params.id  //id mandado por parametro de la ruta en navegador.
            },
            attributes:{
                exclude: ['password','userType']  //se trae todas las columnas de la tabla excluyendo esas dos.
            }   
        })
        .then(user => { //se trae u solo usuario -> registro.
            return res.status(200).json({

             
                id: user.id,  
                name: user.name,
                surname: user.surname,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                imagenURL: `/images/users/${user.image}`,  //image es el nombre de la columna en la db.
                status: 200

            })
         
        })

    }
}
module.exports = usersAPIController;