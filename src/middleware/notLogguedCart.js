
// // este M actua como barrera para impedir que un usuario ya registrado y logueado, pueda acceder a los Formu de R y L.

function notLogguedCart(req,res,next){  //'miUsuario': req.session.usuarioLogueado

    if (req.session.usuarioALoguearse === undefined) {

        return res.redirect('/users/login')
 
    }
    next();  
}
    module.exports = notLogguedCart

////el M userLogged funciona unicamente si el usuario esta logueado, es decir tiene abierta su sesion.