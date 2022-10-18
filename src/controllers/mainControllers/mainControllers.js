const mainControllers = {
    index: (req, res) => {
        res.render('index')
    },
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    },
    productDetail: (req, res) => {
        res.render('producDetail')
    },
    carrito: (req, res) => {
        res.render('carrito')
    }
}

module.exports = mainControllers