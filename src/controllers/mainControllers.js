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
        
        return res.render('productlist', { productlist: productos, miUsuario: req.session.usuarioALoguearse})
    } else {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    }
    },   

    contacto: (req, res) => {
        res.render('contacto', {miUsuario: req.session.usuarioALoguearse})    

    },
                                        // formasDePago -> es la vista.
    formasDePago: (req, res) => {
        res.render('formasDePago', {miUsuario: req.session.usuarioALoguearse})    

    },
    terminos: (req, res) => {
        res.render('terminosYCondiciones', {miUsuario: req.session.usuarioALoguearse})    
    },
    cart: async function (req, res) {
        let cart = await db.Carts.findAll({
            where: {
                user_id: req.session.usuarioALoguearse.id,
                sold: 0
            },
            include: {
                model: db.Products,
                as: 'products'
            }
          });
          cart = JSON.parse(JSON.stringify(cart))
       let total = []
       for (let prod of cart) {
            total.push(Number(prod.products.cost)*prod.quantityItems)
          }
          
           let precioTotal = total.reduce((acum, product) => acum + product, 0);
          
          
          console.log('cart:', cart)
        return res.render('cart', {miUsuario: req.session.usuarioALoguearse, cart, precioTotal});
    },
    cartOrder: async function (req, res) {
        let { shippingMethod, paymentMethod } = req.body
        let cart = await db.Carts.findAll({
            where: {
                user_id: req.session.usuarioALoguearse.id,
                sold: 0
            },
            include: {
                model: db.Products,
                as: 'products'
            }
          });
          cart = JSON.parse(JSON.stringify(cart))
       let total = []
       for (let prod of cart) {
            total.push(Number(prod.products.cost)*prod.quantityItems)
            await db.Carts.update({
                sold: 1
            },
            {
                where: {
                    user_id: req.session.usuarioALoguearse.id,
                    product_sku: prod.products.sku
                }
            })
          }
          
        let precioTotal = total.reduce((acum, product) => acum + product, 0);
        let order = await db.Order.create({
         total: precioTotal,
         paymentMethod: paymentMethod,
         shippingMethod: shippingMethod,
         user_id: req.session.usuarioALoguearse.id
        });

        for (let prod of cart) {
            await db.OrderItem.create({
                name: prod.products.name,
                price: Number(prod.products.cost),
                quantity: prod.quantityItems,
                product_sku: prod.products.sku,
                order_id: order.id
               });
        }
        
        return res.render('cart', { cart, precioTotal, miUsuario: req.session.usuarioALoguearse });
    },

    order: async function (req, res) {
        let order = await db.Order.findOne({
          where: {
            id: req.params.id,
            user_id: req.session.usuarioALoguearse.id
          },
          include: {
            model: db.OrderItem,
            as: 'orderItems'
          }
        });
        order = JSON.parse(JSON.stringify(order))

        let orderDetalle = await Promise.all(order.orderItems.map(o => o))

        console.log('order:', orderDetalle)
        return res.render('order', { order, miUsuario: req.session.usuarioALoguearse, orderDetalle: orderDetalle });
    },
}
module.exports = mainControllers