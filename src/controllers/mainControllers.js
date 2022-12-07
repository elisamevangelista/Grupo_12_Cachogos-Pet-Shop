const mainControllers = {
    
    index: (req, res) => {
        res.render('index', {miUsuario: req.session.usuarioALoguearse})     
    }    
}

module.exports = mainControllers