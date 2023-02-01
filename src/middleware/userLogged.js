
// // este M actua como barrera para impedir que un usuario ya registrado y logueado, pueda acceder a los Formu de R y L.

function userLogged(req,res,next){  //'miUsuario': req.session.usuarioLogueado

    if (req.session.usuarioALoguearse) {

        return res.redirect('/users/perfil')
    } 
    next(); 
}
    module.exports = userLogged

////el M userLogged funciona unicamente si el usuario esta logueado, es decir tiene abierta su sesion.
    