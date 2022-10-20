
// edicionProdcuto


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
    }
 
}

module.exports = productControllers