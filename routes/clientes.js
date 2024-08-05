const { Router } = require('express');
const clientRouter = Router()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET


const UsersCtrl = require('../controllers/clientControl');

//clientRouter
//gets all user only admin
clientRouter.get('/', verifyToken, UsersCtrl.getAllUserControl)
// ruta para comprobrar quien es   
clientRouter.get('/verify', verifyUser, UsersCtrl.comprobateUserControl)
//gets
clientRouter.get('/perfil/:id', UsersCtrl.getDataProfileControl) 
clientRouter.get('/cliente/:id', UsersCtrl.getOneUserControl)
//post
clientRouter.post('/login', UsersCtrl.loginAllUsers)
clientRouter.post('/cliente/create', UsersCtrl.createOneUserControl)
clientRouter.post('/perfil/create', UsersCtrl.createOneUserDataProfileControl)

//update
clientRouter.patch('/cliente/:id', UsersCtrl.patchOneUserControl)
clientRouter.patch('/perfil/:id', UsersCtrl.patchOneUserDataProfileControl)
//delete
clientRouter.delete('/cliente/:id', UsersCtrl.deleteOneUserControl)




// Rutas protegidas para administradores
// clientRouter.get('/admin', verifyToken, (req, res) => {
//     if (req.rol !== 'admin') {
//         return res.status(403).send('Access forbidden');
//     }
//     res.send("hola");
// });


// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    // console.log(req.headers);
    if (!token) {
        return res.send({ msg: 'No token provided' });
    }
    let tokenSplit = token.split(" ")[1]
    jwt.verify(tokenSplit, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.send({ msg: 'Failed to authenticate token' });
        }
        if (Date.now() > decoded.data.exp) {
            return res.send({ msg: "expiro el token" })
        }
        req.nick_usuario = decoded.data.nick_usuario;
        req.rol = decoded.data.rol;
        next();
    });
}


// Middleware para verificar el token
function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    // console.log(req.headers);
    if (!token) {
        req.nick_usuario = "no_identificado";
        req.rol = "no_cliente"
        return res.send({ msg: "sdasd" })
    }
    let tokenSplit = token.split(" ")[1]
    jwt.verify(tokenSplit, SECRET_KEY, (err, decoded) => {
        if (err) {
            req.nick_usuario = "no_identificado";
            req.rol = "no_cliente" 
            return next()
        }
        req.nick_usuario = decoded.data.nick_usuario;
        req.rol = decoded.data.rol;
        next();
    });
}

module.exports = clientRouter
