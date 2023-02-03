
// // este M actua como barrera para impedir que un usuario ya registrado y logueado, pueda acceder a los Formu de R y L.

function notProdCreation(req,res,next){  //'miUsuario': req.session.usuarioLogueado
console.log('usuarioaloguearse:',req.session.usuarioALoguearse)
if (req.session.usuarioALoguearse && req.session.usuarioALoguearse?.userType != 'admin') {

        return res.redirect('/')
    } else if (req.session.usuarioALoguearse === undefined) {

        return res.redirect('/')
    }
    next(); 
}
    module.exports = notProdCreation


////el M userLogged funciona unicamente si el usuario esta logueado, es decir tiene abierta su sesion.
    