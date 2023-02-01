const fs = require('fs');
const path = require('path');
const moment = require('moment')
const db = require('../db/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productControllers = {

    productlist: (req, res) => {
        db.Products.findAll({
            include: ['products_images', 'foods']
        })
        .then(products => {
            console.log('products:', products.foods)
            res.render('productlist', {
                productlist: products,
                miUsuario: req.session.usuarioALoguearse
            })
        })
        // res.render('productlist', {
        //     productlist: products,
        //     miUsuario: req.session.usuarioALoguearse
        // })
    },
    
    creacionproducto: (req, res) => {
        let brand = db.Brands.findAll({
            attributes: ['id', 'brand']
        });
        let category = db.Categories.findAll({
            attributes: ['id', 'animalType']
        });
        let subcategory = db.Subcategories.findAll({
            attributes: ['name'],
            group: ['name']
        })
        Promise.all([category, subcategory, brand])
        .then(([allCategory, allSubcategory, allBrand]) => {
            allBrand = JSON.parse(JSON.stringify(allBrand));
            console.log('allBrand:', allBrand)
            // console.log('allCategory, allBrand:', {allCategory, allSubcategory, allBrand})
        res.render('creacionproducto', {allCategory, allSubcategory, allBrand})})
        .catch(error => res.send(error))  //muestra vista de formulario de creacion
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body
        let subcategory = db.Subcategories.findOne({
            where: {
                name: subcategoriaProducto,
                category_id: categoriaAnimal
            },
            attributes: ['id', 'name', 'category_id'] 
        })
        let brand = db.Brands.findOne({
            where: {
                id: marca
            },
            attributes: ['id', 'brand']
        })
        Promise.all([subcategory, brand])
        .then(([allSubcategory, allBrand]) => {
            db.Products
                .create(
                    {
                        name: nombre,
                        description: descripcion,
                        quotesQuantity: cantidadCuotas,
                        stock: stock,
                        cost: costo,
                        discount: descuento,
                        subcategory_id: allSubcategory.id
                    }
                )
                .then(product => {
                    for (let img of req.files) {
                        db.Products_images
                            .create(
                                {
                                    product_sku: product.sku,
                                    image: img.filename
                                }
                            )
                    }
                    db.Products_brands
                        .create({
                            product_sku: product.sku,
                            brand_id: allBrand.id
                        })
                    if (allSubcategory.name == 'Alimentos') {
                        for (let i = 0; i < kg.length; i++) {
                            db.Foods
                                .create({
                                    product_sku: product.sku,
                                    weight: Number(kg[i]),
                                    cost_x_bag: Number(precio[i]),
                                    quotesQuantity: Number(cantCuotasSegunKg[i])
                                })
                        }
                    }
                })
                .then(() => {
                    return res.redirect('/products')
                })
                .catch(error => res.send(error))
                })

            } else{     //errors.errors  -> porque 'errors' es un objeto con distintas claves, una clave es 'errors' que es un array de objetos tambien.
                console.log('errores;', errors)
                return res.render("creacionproducto", {errores: errors.errors, old: req.body}) //old: req.body-> mantiene los datos correctos cargados por el usuario.
            }
            
    },
	
    productdet: (req, res) => {

                    //req.params.sku es el sku que ingresamos por navegador. De ese registro de SKU, trae las tablas del include.
        db.Products.findByPk(req.params.sku, {include: ['subcategories', 'foods', 'brands', 'products_images']})
        .then(producto => {
            // let product = new Array(producto)
            let pesoSeleccionado = producto.foods.filter(p => p.weight == req.query.kg)
              
            console.log('pesoSeleccionado:', pesoSeleccionado)
            res.render('productdet', {
                products: producto,
                productSelect: pesoSeleccionado[0],
                miUsuario: req.session.usuarioALoguearse
            } )

        })
        // let product = products.find(p => p.sku == req.params.sku)
        // let objetoPesos = product.pesos.filter(p => p.kg == req.query.kg)  //'kg' es el la propiedad de los objetos que estan dentro de la clave 'pesos' de cada producto del .json      		
        // precio -> es un objeto del array 'pesos' que tiene las pros 'kg' y 'precio'.
        
    },


    edicionporsku: (req, res) => {

        let product = products.find(p => p.sku == req.params.sku)
		res.render('edicionporsku', {products: product} )
    },

    buscar: async function (req, res) {

        let productoSearch =  req.query.buscar;
        let productos
        let palabraClave = productoSearch.split(' ').map(p => {
            p = p.toLowerCase()
            if (p.length <= 1) {
                p = p
              } else {
                p = p.charAt(0).toUpperCase() + p.slice(1)
              }
            })

        let productoClave = palabraClave.join('-')
        let indiceClave = palabraClave.indexOf('Perro' || 'Gato' || 'Ave' || 'Pez')

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
            include: [{
                model: Subcategories,
                include: [{
                    model: Categories
                }]
            },
            {
                model: db.Foods
            },
            {
                model: db.Products_images
            }
        ]
        })

        if (producto != undefined) {

        if (indiceClave != -1) {
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
                    model: Subcategories,
                    include: {
                        model: Categories,
                        where: {
                            animalType: palabraClave[indiceClave]
                        }
                    }
                },
                {
                    model: db.Foods
                },
                {
                    model: db.Products_images
                }
            ]
            })
        }
            
        console.log(productos)

        return res.render("productlist", { product: productos , queryProduct: productoClave })

    }
    },



    // edicionproducto: (req, res) => {

    //     let product = products.find(p => p.sku == req.params.sku)
	// 	res.render('edicionproducto', {products: product} )
    // },

    edicionproducto: (req, res) => {

        let brand = db.Brands.findAll({
            attributes: ['id', 'brand']
        });
        let category = db.Categories.findAll({
            attributes: ['id', 'animalType']
        });
        let subcategory = db.Subcategories.findAll({
            attributes: ['name'],
            group: ['name']
        })
        Promise.all([category, subcategory, brand])
        .then(([allCategory, allSubcategory, allBrand]) => {
            db.Products.findByPk(req.params.sku, {include: ['subcategories', 'foods', 'brands']})
            .then(product => {
                db.Categories.findOne({
                    where: {
                        id: product.subcategories.category_id
                    }
                })
                .then(category => {
                    res.render('edicionproducto', {products: product, category, allCategory, allSubcategory, allBrand} )
                })
            })
        })
    },

    
    update: (req, res) => {
		let product_sku = req.params.sku
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, stock, cantCuotasSegunKg } = req.body
        let subcategory = db.Subcategories.findOne({
            where: {
                name: subcategoriaProducto,
                category_id: categoriaAnimal
            },
            attributes: ['id', 'name', 'category_id'] 
        })
        let brand = db.Brands.findOne({
            where: {
                id: marca
            },
            attributes: ['id', 'brand']
        })
        Promise.all([subcategory, brand])
        .then(([allSubcategory, allBrand]) => {
            db.Products
                .update(
                    {
                        name: nombre,
                        description: descripcion,
                        quotesQuantity: cantidadCuotas,
                        stock: stock,
                        cost: costo,
                        discount: descuento,
                        subcategory_id: allSubcategory.id
                    },
                    {
                        where: {
                            sku: req.params.sku
                        }
                    }
                )
                // .then(product => {
                    for (let img of req.files) {
                        db.Products_images
                            .update(
                                {
                                    image: img.filename
                                },
                                {
                                    where: {
                                        product_sku: product_sku
                                    }
                                }
                            )
                    }
                    db.Products_brands
                        .update(
                            {
                                brand_id: allBrand.id
                            },
                            {
                                where: {
                                    product_sku: product_sku
                                }
                            }
                        )
                    if (allSubcategory.name === 'Alimentos') {
                        for (let i = 0; i < kg.length; i++) {
                            db.Foods
                                .update(
                                    {
                                        weight: Number(kg[i]),
                                        cost_x_bag: Number(precio[i]),
                                        quotesQuantity: Number(cantCuotasSegunKg[i])
                                    },
                                    {
                                        where: {
                                            product_sku: product_sku
                                        }
                                    }
                                    )
                                }
                    }
                }).then(() => {
                    return res.redirect('/products')
                })
                .catch(error => res.send(error))
                

    //     let pesos = []
    //     for (let i = 0; i < kg.length; i++) {
    //         pesos.push({
    //             kg: Number(kg[i]),
    //             precio: Number(precio[i])
    //         })
    //     }

    //     let imagen = []
    //     for (let i = 0; i < 1; i++) {
    //         imagen.push({
    //             imagen1: req.files[i] ? req.files[i].filename : null,
    //             imagen2: req.files[i + 1] ? req.files[i + 1].filename : null,
    //             imagen3: req.files[i + 2] ? req.files[i + 2].filename : null,
    //         })
    //     }
    //     products[req.params.sku - 1].fechaActualizada =  moment().format('L'),
	// 	products[req.params.sku - 1].marca = req.body.marca,
    //     products[req.params.sku - 1].nombre = req.body.nombre,
    //     products[req.params.sku - 1].descuento = Number(req.body.descuento),  // edito el objeto cuya posicion dentro del array corresponde al id asignado.
    //     products[req.params.sku - 1].descripcion = req.body.descripcion,
    //     products[req.params.sku - 1].imagen = imagen ? imagen[0] : null,
    //     products[req.params.sku - 1].kilogramos1 = Number(req.body.kilogramos1),
    //     products[req.params.sku - 1].categoriaAnimal = req.body.categoriaAnimal,
    //     products[req.params.sku - 1].subcategoriaProducto = req.body.subcategoriaProducto,
    //     products[req.params.sku - 1].precio = Number(req.body.precio),
    //     products[req.params.sku - 1].cantidadCuotas = Number(req.body.cantidadCuotas),
    //     products[req.params.sku - 1].montoCuotas = Number(req.body.precio/req.body.cantidadCuotas),
    //     products[req.params.sku - 1].stock = Number(req.body.stock),
    //     products[req.params.sku - 1].depositoEntrante = Number(req.body.depositoEntrante)

    
    // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))   

    // res.redirect('/products')  // luego de poner 'guardar/sobreescribir' envia a pagina de productos.
},

    destroy : (req, res) => {

        let product_sku = req.params.sku;
        db.Foods
        .destroy({where: {product_sku: product_sku}})
        db.Products_brands
        .destroy({where: {product_sku: product_sku}})
        db.Products_images
        .destroy({where: {product_sku: product_sku}})
        db.Products
        .destroy({where: {sku: product_sku}}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 

    // let producstFiltrados = products.filter(p => p.sku != req.params.sku)
  
    // fs.writeFileSync(productsFilePath, JSON.stringify(producstFiltrados, null, ' '))   

    // res.redirect('/products')  // luego de poner 'guardar/sobreescribir' envia a pagina de productos.
    
    
},

    // verproducto: (req, res) => {
    //     res.render('verproducto')
    // },

    
    carrito: (req, res) => {
        res.render('carrito')
    }
 
}

module.exports = productControllers