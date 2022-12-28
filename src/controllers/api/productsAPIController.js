const path = require('path');
const db = require('../../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Products = db.Products;
const Genres = db.Genre;
const Users = db.Users;


const productsAPIController = {
    'list': (req, res) => {
        db.Products.findAll()
        .then(product => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: product.length,
                    url: 'api/products'
                },
                data: product
            }
                res.json(respuesta);
            })
    },
    
    'detail': (req, res) => {
        db.Products.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/product/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            })
            .catch(error => console.log(error));
    },
    create: (req, res) => {
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body
        db.Subcategories.findOne({
            where: {
                name: subcategoriaProducto,
                category_id: categoriaAnimal
            }
        }).then(subcategory => {
            Products
                .create(
                    {
                        name: nombre,
                        description: descripcion,
                        quotesQuantity: cantidadCuotas,
                        stock: stock,
                        cost: costo,
                        discount: descuento,
                        subcategory_id: subcategory.id
                    }
                )
            db.Products_images
                .create(
                    {
                        image: req.files
                    }
                )
                db.Products_brands
                .then(confirm => {
                    let respuesta;
                    if (confirm) {
                        respuesta = {
                            meta: {
                                status: 200,
                                total: confirm.length,
                                url: 'api/products/create'
                            },
                            data: confirm
                        }
                    } else {
                        respuesta = {
                            meta: {
                                status: 200,
                                total: confirm.length,
                                url: 'api/products/create'
                            },
                            data: confirm
                        }
                    }
                    res.json(respuesta);
                })
                .catch(error => res.send(error))
        })

    },
    update: (req, res) => {
        let productId = req.params.id;
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body

        db.Subcategories.findOne({
            where: {
                name: subcategoriaProducto,
                category_id: categoriaAnimal
            }
        }).then(subcategory => {
            Products.update(
                {
                    name: nombre,
                    description: descripcion,
                    quotesQuantity: cantidadCuotas,
                    stock: stock,
                    cost: costo,
                    discount: descuento,
                    subcategory_id: subcategory.id
                },
                {
                    where: { id: productId }
                })
                .then(confirm => {
                    let respuesta;
                    if (confirm) {
                        respuesta = {
                            meta: {
                                status: 200,
                                total: confirm.length,
                                url: 'api/products/update/:id'
                            },
                            data: confirm
                        }
                    } else {
                        respuesta = {
                            meta: {
                                status: 204,
                                total: confirm.length,
                                url: 'api/products/update/:id'
                            },
                            data: confirm
                        }
                    }
                    res.json(respuesta);
                })
                .catch(error => res.send(error))
        })
    },
    destroy: (req,res) => {
        let productId = req.params.id;
        Products
        .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/products/destroy/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    }
    
}

module.exports = productsAPIController;