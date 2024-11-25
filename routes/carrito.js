const { Router } = require('express');
const carritoRouter = Router()
const CarritoCtrl = require('../controllers/carritoControl');


// carritoRouter.get('/render', (req, res) => {
//     res.send('nosotros')
// })

carritoRouter.get('/:id', CarritoCtrl.getAllCarritosControl)
carritoRouter.get('/comprobate/:id', CarritoCtrl.comprobateCarritosControl)
carritoRouter.get('/mis-productos/:id', CarritoCtrl.getMisProductosControl)
carritoRouter.get('/clientes/all/productos', CarritoCtrl.getAllProductosControl)
//post
carritoRouter.post('/create', CarritoCtrl.createOneCarritoControl)
//post
carritoRouter.post('/create-pedido', CarritoCtrl.createOnePedidoControl)
//update
carritoRouter.patch('/update-estado/:idMisProductos', CarritoCtrl.patchOneDataMisProductosControl)
//delete
carritoRouter.delete('/delete/:idProducto/:idCarrito', CarritoCtrl.deleteOneCarritoControl)
carritoRouter.delete('/delete-cart/:idCarrito', CarritoCtrl.deleteAllCarritoControl)




// Middleware para verificar el token
function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    // console.log(req.headers);
    if (!token) {
        req.nick_usuario = "no_identificado";
        req.rol = "no_cliente"
        req.id_usuario = "not_user"
        return res.send({ msg: "sdasd" })
    }
    let tokenSplit = token.split(" ")[1]
    jwt.verify(tokenSplit, SECRET_KEY, (err, decoded) => {
        if (err) {
            req.nick_usuario = "no_identificado";
            req.rol = "no_cliente"
            req.id_usuario = "not_user"
            return next()
        }
        req.nick_usuario = decoded.data.nick_usuario;
        req.rol = decoded.data.rol;
        req.id_usuario = decoded.data.id_usuario
        next();
    });
}

module.exports = carritoRouter
