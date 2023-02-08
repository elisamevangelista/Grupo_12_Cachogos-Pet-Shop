const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const mainControllers = {
    
    index: (req, res) => {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    },
    buscar: async function (req, res) {

        console.log('req.body.buscar:', req.body.buscar)
        let productoSearch =  req.body.buscar;
        let productos
        let palabraClave = productoSearch.split(' ').map(p => {
            p = p.toLowerCase()
            if (p.length <= 1) {
                return p = p
              } else {
                return p = p.charAt(0).toUpperCase() + p.slice(1)
              }
            })

            let indiceClave = palabraClave.indexOf('Perro') != -1 ? palabraClave.indexOf('Perro') : -1
             indiceClave = palabraClave.indexOf('Gato') != -1 ? palabraClave.indexOf('Gato') : indiceClave
             indiceClave = palabraClave.indexOf('Ave') != -1 ? palabraClave.indexOf('Ave') : indiceClave
             indiceClave = palabraClave.indexOf('Pez') != -1 ? palabraClave.indexOf('Pez') : indiceClave

        console.log('productoClave:', palabraClave[indiceClave])
        let producto = await db.Products.findOne({
            where:{
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + palabraClave[indiceClave] + '%'
                    }
                }, {
                    description: {
                        [Op.like]: '%' + palabraClave[indiceClave] + '%'
                    }
                }],
            },
            include: [
            {
                model: db.Subcategories,
                as: 'subcategories',
                include: [{
                    model: db.Categories,
                    as: 'categories'
                }]
            },
            {
                model: db.Foods,
                as: 'foods'
            },
            {
                model: db.Products_images,
                as: 'products_images'
            }
        ]
        })
        console.log('producto:', producto)
        console.log('indiceClave:', indiceClave)
        if (producto != null) {

        if (indiceClave != -1) {
            productos = await db.Products.findAll({
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + palabraClave[indiceClave] + '%'
                        }
                    }, {
                        description: {
                            [Op.like]: '%' + palabraClave[indiceClave] + '%'
                        }
                    }],
                },
                include: [{
                    model: db.Subcategories,
                    as: 'subcategories',
                    include: {
                        model: db.Categories,
                        as: 'categories',
                        where: {
                            animalType: palabraClave[indiceClave]
                        }
                    }
                },
                {
                    model: db.Foods,
                    as: 'foods'
                },
                {
                    model: db.Products_images,
                    as: 'products_images'
                }
            ]
            })
        }
        
        return res.render("productlist", { productlist: productos, miUsuario: req.session.usuarioALoguearse})
    } else {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    }
    },    
}
module.exports = mainControllers