const { Router } = require('express');
const carritoRouter = Router()
const CarritoCtrl = require('../controllers/carritoControl');


// carritoRouter.get('/render', (req, res) => {
//     res.send('nosotros')
// })

carritoRouter.get('/lala', CarritoCtrl.getAllCarritosControl)




module.exports = carritoRouter
