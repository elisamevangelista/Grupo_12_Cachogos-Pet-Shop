const path = require('path');
const db = require('../../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


const productsAPIController = {

    list: (req, res) => {

        db.Products.findAll({

            attributes: ['sku','name','description'],  // id','name','email' coinciden en nombre con las columnas de la base de datos.
            include: ['foods','subcategories']   // subcategories es el nombre de la asociacion que se determina en el modelo de products para conectarse al modelo de subcategories de sus respectivas tablas en la db.
        })

       
        .then(products => {
           
            let countAlimentos = 0
            let countJuguetes = 0
            let countCamasEIndumentaria = 0
            let countPaseosYViajes = 0

            products = JSON.parse(JSON.stringify(products));  // transformo los datos de tipo Json en formato objeto, no Json, de forma tal de der realizar el map sobre el array de objetos.
           
            let productos = products.map(p => {

                countAlimentos = p.subcategories.name === 'Alimentos' ? countAlimentos = countAlimentos +1 : countAlimentos
                countJuguetes = p.subcategories.name === 'Juguetes' ? countJuguetes = countJuguetes +1 : countJuguetes
                countCamasEIndumentaria = p.subcategories.name === 'Camas e indumentaria' ? countCamasEIndumentaria= countCamasEIndumentaria +1 : countCamasEIndumentaria
                countPaseosYViajes = p.subcategories.name === 'Paseos y viajes' ? countPaseosYViajes= countPaseosYViajes+1 : countPaseosYViajes
                
                return {
                                            
                    sku: p.sku,
                    name: p.name,
                    description: p.description,
                    foods: p.foods,
                    subcategories: p.subcategories,
                    detail: `api/products/${p.sku}`,  //users es la ruta dentro de la carpeta api.
                    
                }
            })
            
            return res.status(200).json({

                count: products.length,  // array de registros de users.
                // ????  categoriesCount: products.category_id.length, como hacer para agregar la cantidad de animales que tnemos?
                countByCategory: [
                    {
                        name: 'Alimentos',
                        count: countAlimentos
                    },
                    {
                        name: 'Juguetes',
                        count: countJuguetes
                    },
                    {
                        name: 'Camas e indumentaria',
                        count: countCamasEIndumentaria
                    },
                    {
                        name: 'Paseos y viajes',
                        count: countPaseosYViajes
                    }
                ],
                products: productos,  // se trae unicamente lo que esta dentro del 'return'. Es un array de objetos, que a su vez tiene una clave 'foods' que su valor es un array.
                status: 200

            })
         
        })

    },

    detail: (req, res) => {
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


    show: (req, res) => {

        db.Products.findOne({
            where: {
                sku: req.params.sku  //sku mandado por parametro de la ruta en navegador.
            },
                    //los nombres de los elementos del siguiente array 'include', corresponden al 'alias' definido en cada asociacion que tiene un modelo con otro.
                    
                                        // Products.belongsToMany(models.Brands, {
                                        //     as: "brands",
                                        //     through: 'products_brands',
                                        //     foreignKey: 'product_sku',
                                        //     otherKey: 'brand_id',
                                        //     timestamps: false
                                        // }),

            include: ['brands', 'foods', 'products_images', 'subcategories']
            
        })
        .then(product => { //se trae u solo usuario -> registro.
            
            product = JSON.parse(JSON.stringify(product));


            let imagenes = product.products_images.map(i => {

                               //product es unico segun el sku ingresado por navegador. product es un objeto. Recorro ese producto en la tabla 'products_images' y mapeo cada imagen guardada en la col 'image' para ese sku.
                return {
                    
                    url: `/images/${i.image}`,
                      
                }
            })

            return res.status(200).json({

             
                sku: product.sku,  
                name: product.name,
                description: product.description,
                email: product.email,
                quotesQuantity: product.quotesQuantity,
                stock: product.stock,
                updatedAt: product.updatedAt,
                deletedAt: product.deletedAt,
                cost: product.cost,
                discount: product.discount,
                createdAt: product.createdAt,
                subcategory: product.subcategories.name, 
                foods: product.foods, //relacion 1 a muchos, trae todo los campos de la tabla de foods.
                images: product.products_images, //relacion 1 a muchos, trae todo los campos de la tabla de products_images.
                brand: product.brands,
                imagenURL: imagenes, 
                status: 200

            })
         
        })

    }
    // create: (req, res) => {
    //     let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body
    //     db.Subcategories.findOne({
    //         where: {
    //             name: subcategoriaProducto,
    //             category_id: categoriaAnimal
    //         }
    //     }).then(subcategory => {
    //         Products
    //             .create(
    //                 {
    //                     name: nombre,
    //                     description: descripcion,
    //                     quotesQuantity: cantidadCuotas,
    //                     stock: stock,
    //                     cost: costo,
    //                     discount: descuento,
    //                     subcategory_id: subcategory.id
    //                 }
    //             )
    //         db.Products_images
    //             .create(
    //                 {
    //                     image: req.files
    //                 }
    //             )
    //             db.Products_brands
    //             .then(confirm => {
    //                 let respuesta;
    //                 if (confirm) {
    //                     respuesta = {
    //                         meta: {
    //                             status: 200,
    //                             total: confirm.length,
    //                             url: 'api/products/create'
    //                         },
    //                         data: confirm
    //                     }
    //                 } else {
    //                     respuesta = {
    //                         meta: {
    //                             status: 200,
    //                             total: confirm.length,
    //                             url: 'api/products/create'
    //                         },
    //                         data: confirm
    //                     }
    //                 }
    //                 res.json(respuesta);
    //             })
    //             .catch(error => res.send(error))
    //     })

    // },
    // update: (req, res) => {
    //     let productId = req.params.id;
    //     let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body

    //     db.Subcategories.findOne({
    //         where: {
    //             name: subcategoriaProducto,
    //             category_id: categoriaAnimal
    //         }
    //     }).then(subcategory => {
    //         Products.update(
    //             {
    //                 name: nombre,
    //                 description: descripcion,
    //                 quotesQuantity: cantidadCuotas,
    //                 stock: stock,
    //                 cost: costo,
    //                 discount: descuento,
    //                 subcategory_id: subcategory.id
    //             },
    //             {
    //                 where: { id: productId }
    //             })
    //             .then(confirm => {
    //                 let respuesta;
    //                 if (confirm) {
    //                     respuesta = {
    //                         meta: {
    //                             status: 200,
    //                             total: confirm.length,
    //                             url: 'api/products/update/:id'
    //                         },
    //                         data: confirm
    //                     }
    //                 } else {
    //                     respuesta = {
    //                         meta: {
    //                             status: 204,
    //                             total: confirm.length,
    //                             url: 'api/products/update/:id'
    //                         },
    //                         data: confirm
    //                     }
    //                 }
    //                 res.json(respuesta);
    //             })
    //             .catch(error => res.send(error))
    //     })
    // },
    // destroy: (req,res) => {
    //     let productId = req.params.id;
    //     Products
    //     .destroy({where: {id: productId}, force: true}) // force: true es para asegurar que se ejecute la acción
    //     .then(confirm => {
    //         let respuesta;
    //         if(confirm){
    //             respuesta ={
    //                 meta: {
    //                     status: 200,
    //                     total: confirm.length,
    //                     url: 'api/products/destroy/:id'
    //                 },
    //                 data:confirm
    //             }
    //         }else{
    //             respuesta ={
    //                 meta: {
    //                     status: 204,
    //                     total: confirm.length,
    //                     url: 'api/products/destroy/:id'
    //                 },
    //                 data:confirm
    //             }
    //         }
    //         res.json(respuesta);
    //     })    
    //     .catch(error => res.send(error))
    // }
    
}

module.exports = productsAPIController;