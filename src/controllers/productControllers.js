const fs = require('fs');
const path = require('path');

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

        let newPoduct = {

            fechaCreacion: Date.now(),
            sku: products[products.length - 1].sku + 1,
            marca: req.body.marca ? req.body.marca : null,
            nombre: req.body.name? req.body.name : null,
            descuento: Number(req.body.descuento)? Number(req.body.descuento) : null,
            descripción: req.body.descripcion? req.body.descripcion : null,
            imagen: req.file.filename? req.body.filename : null,
            kilogramos: Number(req.body.kilogramos)? Number(req.body.kilogramos) : null,
            categoriaAnimal: req.body.categoriaAnimal? req.body.categoriaAnimal : null,
            subcategoriaProducto: req.body.subcategoriaProducto? req.body.subcategoriaProducto : null,
            precio: Number(req.body.precio)? Number(req.body.precio): null,
            cantidadCuotas: Number(req.body.cantidadCuotas)? Number(req.body.cantidadCuotas) : null,
            montoCuotas: Number(req.body.montoCuotas)? Number(req.body.montoCuotas): null,
            stock: Number(req.body.stock)? Number(req.body.stock): null,
            depositoEntrante: Number(req.body.depositoEntrante)? Number(req.body.depositoEntrante): null
        }

		    products.push(newPoduct);
		    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))

		res.redirect('/products') 
	},



    edicionproducto: (req, res) => {
        res.render('edicionproducto')
    },








    productdet: (req, res) => {
        res.render('productdet')
    },
    verproducto: (req, res) => {
        res.render('verproducto')
    },

    
    carrito: (req, res) => {
        res.render('carrito')
    }
 
}

module.exports = productControllers