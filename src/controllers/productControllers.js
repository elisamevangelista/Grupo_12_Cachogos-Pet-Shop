const fs = require('fs');
const path = require('path');
const moment = require('moment')

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productControllers = {

    productlist: (req, res) => {
        res.render('productlist', {
            productlist: products
        })
    },
    
    creacionproducto: (req, res) => {
        res.render('creacionproducto')
    },
  

	//Method to store
	store: (req, res) => {
        let { marca, nombre, descuento, descripcion, kg, precio, categoriaAnimal, subcategoriaProducto, costo, cantidadCuotas, depositoEntrante } = req.body

        let pesos = []
        for (let i = 0; i < kg.length; i++) {
            pesos.push({
                kg: Number(kg[i]),
                precio: Number(precio[i])
            })
        }

        let imagen = []
        for (let i = 0; i < 1; i++) {
            imagen.push({
                imagen1: req.files[i] ? req.files[i].filename : null,
                imagen2: req.files[i + 1] ? req.files[i + 1].filename : null,
                imagen3: req.files[i + 2] ? req.files[i + 2].filename : null,
            })
        }
        // : req.files.map(i => i.filename)
        // console.log('imagenes:', imagenes)

        let newPoduct = {       //kilogramos: igual a clave del database, y req.body.kilogramos > kilogramos debe ser igual al "name" del input del formulario de la vista.
                                // le doy formato a la fecha. No hace falta incluir campo de fecha en creacion de prodcuto. Se asigna automatica// en la DB.
                                // se debe 1ro instalar > npm install moment --save, y 2do > crear const moment = require('moment') para requerirlo.
            fechaCreacion: moment().format('L'),   
            sku: products[products.length - 1].sku + 1,
            marca: marca,
            nombre: nombre,
            descuento: Number(descuento),
            descripcion: descripcion,
            imagen: imagen ? imagen[0] : null,
            pesos,
            categoriaAnimal: categoriaAnimal,
            subcategoriaProducto: subcategoriaProducto,
            costo: Number(costo),
            cantidadCuotas: Number(cantidadCuotas),
            montoCuotas: Number(precio/cantidadCuotas),
            stock: Number(depositoEntrante),
            depositoEntrante: Number(depositoEntrante),
            fechaActualizada: null
        }

		    products.push(newPoduct);
		    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

		res.redirect('/products') 
	},

    
    productdet: (req, res) => {

        let product = products.find(p => p.sku == req.params.sku)
        let precio = product.pesos.filter(p => p.kg == req.query.kg)  //'kg' es el la propiedad de los objetos que estan dentro de la clave 'pesos' de cada producto del .json
        console.log("precio =", precio)

		
        // precio -> es un objeto del array 'pesos' que tiene las pros 'kg' y 'precio'.
        res.render('productdet', {
            products: product,
            precioKGSeleccionado:precio[0]
        } )
    },


    edicionporsku: (req, res) => {

        let product = products.find(p => p.sku == req.params.sku)
		res.render('edicionporsku', {products: product} )
    },



    edicionproducto: (req, res) => {

        let product = products.find(p => p.sku == req.params.sku)
		res.render('edicionproducto', {products: product} )
    },

    
    update: (req, res) => {
		
        let pesos = []
        for (let i = 0; i < kg.length; i++) {
            pesos.push({
                kg: Number(kg[i]),
                precio: Number(precio[i])
            })
        }

        let imagen = []
        for (let i = 0; i < 1; i++) {
            imagen.push({
                imagen1: req.files[i] ? req.files[i].filename : null,
                imagen2: req.files[i + 1] ? req.files[i + 1].filename : null,
                imagen3: req.files[i + 2] ? req.files[i + 2].filename : null,
            })
        }
        products[req.params.sku - 1].fechaActualizada =  moment().format('L'),
		products[req.params.sku - 1].marca = req.body.marca,
        products[req.params.sku - 1].nombre = req.body.nombre,
        products[req.params.sku - 1].descuento = Number(req.body.descuento),  // edito el objeto cuya posicion dentro del array corresponde al id asignado.
        products[req.params.sku - 1].descripcion = req.body.descripcion,
        products[req.params.sku - 1].imagen = imagen ? imagen[0] : null,
        products[req.params.sku - 1].kilogramos1 = Number(req.body.kilogramos1),
        products[req.params.sku - 1].categoriaAnimal = req.body.categoriaAnimal,
        products[req.params.sku - 1].subcategoriaProducto = req.body.subcategoriaProducto,
        products[req.params.sku - 1].precio = Number(req.body.precio),
        products[req.params.sku - 1].cantidadCuotas = Number(req.body.cantidadCuotas),
        products[req.params.sku - 1].montoCuotas = Number(req.body.precio/req.body.cantidadCuotas),
        products[req.params.sku - 1].stock = Number(req.body.stock),
        products[req.params.sku - 1].depositoEntrante = Number(req.body.depositoEntrante)

    
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))   

    res.redirect('/products')  // luego de poner 'guardar/sobreescribir' envia a pagina de productos.
},

    destroy : (req, res) => {

    let producstFiltrados = products.filter(p => p.sku != req.params.sku)
  
    fs.writeFileSync(productsFilePath, JSON.stringify(producstFiltrados, null, ' '))   

    res.redirect('/products')  // luego de poner 'guardar/sobreescribir' envia a pagina de productos.
    
    
},

    // verproducto: (req, res) => {
    //     res.render('verproducto')
    // },

    
    carrito: (req, res) => {
        res.render('carrito')
    }
 
}

module.exports = productControllers