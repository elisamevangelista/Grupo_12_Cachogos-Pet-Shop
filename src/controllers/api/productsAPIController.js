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
    // 'recomended': (req, res) => {
    //     db.Movie.findAll({
    //         include: ['genre'],
    //         where: {
    //             rating: {[db.Sequelize.Op.gte] : req.params.rating}
    //         },
    //         order: [
    //             ['rating', 'DESC']
    //         ]
    //     })
    //     .then(movies => {
    //         let respuesta = {
    //             meta: {
    //                 status : 200,
    //                 total: movies.length,
    //                 url: 'api/movies/recomended/:rating'
    //             },
    //             data: movies
    //         }
    //             res.json(respuesta);
    //     })
    //     .catch(error => console.log(error))
    // },
    create: (req,res) => {
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg} = req.body
        Products
        .create(
            {
                name: nombre,
                description: descripcion,
                quotesQuantity: cantidadCuotas,
                stock: stock,
                cost: costo,
                discount: descuento,
                subcategory_id: subcategory_id
            }
        )
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/products/create'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/create'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    update: (req,res) => {
        let movieId = req.params.id;
        Movies.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
        })
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/update/:id'
                    },
                    data:confirm
                }
            }
            res.json(respuesta);
        })    
        .catch(error => res.send(error))
    },
    destroy: (req,res) => {
        let movieId = req.params.id;
        Movies
        .destroy({where: {id: movieId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(confirm => {
            let respuesta;
            if(confirm){
                respuesta ={
                    meta: {
                        status: 200,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
                    },
                    data:confirm
                }
            }else{
                respuesta ={
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: 'api/movies/destroy/:id'
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