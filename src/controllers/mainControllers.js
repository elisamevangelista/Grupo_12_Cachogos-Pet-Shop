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
   
    carrito: (req, res) => {
        res.render('carrito')
    }
}

module.exports = mainControllers