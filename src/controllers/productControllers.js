
// edicionProdcuto

let productlist = [
    {
        "nombre": "PRO PLAN PERRO ADULTO MEDIANO X 15 KG + 3 KG ",
        "categoria": "alimentos",
        "img" : '<img src="/public/image/card-produc1.jpg">',
        "precio" : 100.00
    },
    {
        "nombre": "DOGUI CACHORROS CARNE CEREALES Y LECHE X 21 KG ",
        "categoria": "alimentos",
        "img" : "/image/card-produc1.jpg",
        "precio" : 150.00
    },
    {
        "nombre": "NUTRIQUE PERRO BAJAS CALORIAS X 3 KG ",
        "categoria": "alimentos",
        "img" : "/public/image/card-produc1.jpg",
        "precio" : 300.00
    },
    {
        "nombre": "VITALCAN COMPLETE PERRO CACHORRO RAZA MED/GRA X 3 KG ",
        "categoria": "alimentos",
        "img" : "/public/image/card-produc1.jpg",
        "precio" : 800.00
    },

    {
        "nombre": "OUTLET KONGO NATURAL CACHORROS X 21 KG ",
        "categoria": "alimentos",
        "img" : "/public/image/card-produc1.jpg",
        "precio" : 100.00
    },
    {
        "nombre": "COMPANY PERRO CACHORRO X 20 KG ",
        "categoria": "alimentos",
        "img" : "/public/image/card-produc1.jpg",
        "precio" : 20.00
    },
    
]

const productControllers = {
    creacionproducto: (req, res) => {
        res.render('creacionproducto')
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

    productlist: (req, res) => {
        res.render('productlist', {
            'productlist': productlist
        })
    }
 
}

module.exports = productControllers