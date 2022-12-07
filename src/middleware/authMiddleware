function authMiddleware(req,res,next){  //'miUsuario': req.session.usuarioLogueado

    if (req.session.usuarioALoguearse == undefined) {

        return res.redirect('/users/login')
    } 
    next(); 
}
    module.exports = authMiddleware