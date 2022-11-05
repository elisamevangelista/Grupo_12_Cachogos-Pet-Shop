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

        let newPoduct = {       //kilogramos: igual a clave del database, y req.body.kilogramos > kilogramos debe ser igual al "name" del input del formulario de la vista.
                                
                                // le doy formato a la fecha. No hace falta incluir campo de fecha en creacion de prodcuto. Se asigna automatica// en la DB.
                                // se debe 1ro instalar > npm install moment --save, y 2do > crear const moment = require('moment') para requerirlo.
            
            fechaCreacion: moment().format('L'),   
            sku: products[products.length - 1].sku + 1,
            marca: req.body.marca,
            nombre: req.body.nombre,
            descuento: Number(req.body.descuento),
            descripción: req.body.descripcion,
            imagen: req.file.filename,
            kilogramos1: Number(req.body.kilogramos1),
            kilogramos2: Number(req.body.kilogramos2),
            kilogramos3: Number(req.body.kilogramos3),
            categoriaAnimal: req.body.categoriaAnimal,
            subcategoriaProducto: req.body.subcategoriaProducto,
            precio: Number(req.body.precio),
            cantidadCuotas: Number(req.body.cantidadCuotas),
            montoCuotas: Number(req.body.precio/req.body.cantidadCuotas),
            stock: Number(req.body.stock),
            depositoEntrante: Number(req.body.depositoEntrante)
        }

		    products.push(newPoduct);
		    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

		res.redirect('/products') 
	},

    
    productdet: (req, res) => {

        let product = products.find(p => p.sku == req.params.id)
		res.render('productdet', {products: product} )
    },


    edicionporsku: (req, res) => {

        let product = products.find(p => p.sku == req.params.id)
		res.render('edicionporsku', {products: product} )
    },



    edicionproducto: (req, res) => {

        let product = products.find(p => p.sku == req.params.id)
		res.render('edicionproducto', {products: product} )
    },

    
    update: (req, res) => {
		
		
        products[req.params.id - 1].name = req.body.name ? req.body.name : null,
        products[req.params.id - 1].price = Number(req.body.price) ? Number(req.body.price) : null ,
        products[req.params.id - 1].discount = Number(req.body.discount) ? Number(req.body.discount) : null,  // edito el objeto cuya posicion dentro del array corresponde al id asignado.
        products[req.params.id - 1].category = req.body.category ? req.body.category : null
        products[req.params.id - 1].description = req.body.description ? req.body.description : null,
        products[req.params.id - 1].image = req.file.filename  ? req.file.filename  : null
    
    
        

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))   

    res.redirect('/products')  // luego de poner 'guardar/sobreescribir' envia a pagina de productos.
},



    verproducto: (req, res) => {
        res.render('verproducto')
    },

    
    carrito: (req, res) => {
        res.render('carrito')
    }
 
}

module.exports = productControllers