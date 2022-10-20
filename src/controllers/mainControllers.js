const mainControllers = {
    index: (req, res) => {
        res.render('index')
    },
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => {
        res.render('users/register')
    },
   
    carrito: (req, res) => {
        res.render('carrito')
    }
}

module.exports = mainControllers