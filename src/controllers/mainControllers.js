const mainControllers = {
    
    index: (req, res) => {
        res.render('index')
    },
    login: (req, res) => {
        res.render('users/login')
    },
    register: (req, res) => { 
        res.render('users/register')   //archivo dentro de carpeta users
    },
   
    
}

module.exports = mainControllers