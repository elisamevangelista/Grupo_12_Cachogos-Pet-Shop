const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const mainControllers = {
    
    index: (req, res) => {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    },
    buscar: async function (req, res) {

        let productoSearch =  req.body.buscar;
        let productos
     
        let producto = await db.Products.findOne({
            where:{
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + productoSearch + '%'
                    }
                }, {
                    description: {
                        [Op.like]: '%' + productoSearch + '%'
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
        
        if (producto != null) {

            productos = await db.Products.findAll({
                where: {
                    [Op.or]: [{
                        name: {
                            [Op.like]: '%' + productoSearch + '%'
                        }
                    }, {
                        description: {
                            [Op.like]: '%' + productoSearch + '%'
                        }
                    }],
                },
                include: [{
                    model: db.Subcategories,
                    as: 'subcategories',
                    include: {
                        model: db.Categories,
                        as: 'categories'
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
        
        return res.render("productlist", { productlist: productos, miUsuario: req.session.usuarioALoguearse})
    } else {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    }
    },   
}
module.exports = mainControllers