const { Router } = require('express');

const productRouter = Router()
const { productShowAll,
    productShowOne,
    productCreateOne,
    productUpdateOne,
    productDeleteOne,
    solution } = require('../controllers/productControl');
const { getal } = require('../controllers/clientControl');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET


// productRouter.use((req, res, next) => {
//     console.log(req.ip);
//     next()
// })
productRouter.get('/rendera', (req, res) => {
    res.send('nosotros')
})

// get---------------- Read all products
productRouter.get('/', verifyToken, productShowAll)


//  get----------------read one product
productRouter.get(`/producto/:number`, productShowOne)

// insert --------------- insertar
productRouter.post('/createProduct', productCreateOne)


//update --------------- actualizar
productRouter.patch('/producto/:number', productUpdateOne)


//delete --------------- eliminar
productRouter.delete('/producto/:number', productDeleteOne)


// Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    // console.log(req.headers);
    if (!token) {
        req.nick_usuario = "no_identificado";
        req.rol = "no_cliente"
        return next()
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

module.exports = productRouter