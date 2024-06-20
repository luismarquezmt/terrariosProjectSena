const { Router } = require('express');
const productRouter = Router()
const { productShowAll,
    productShowOne,
    productCreateOne,
    productUpdateOne,
    productDeleteOne,
    solution } = require('../controllers/productControl');
const { getal } = require('../controllers/clientControl');


// productRouter.use((req, res, next) => {
//     console.log(req.ip);
//     next()
// })
productRouter.get('/rendera', (req, res) => {
    res.render('nosotros')
})

// get---------------- Read all products
productRouter.get('/', productShowAll)




//  get----------------read one product
productRouter.get(`/producto/:number`, productShowOne)

// insert --------------- insertar
productRouter.post('/createProduct', productCreateOne)


//update --------------- actualizar
productRouter.patch('/producto/:number', productUpdateOne)


//delete --------------- eliminar
productRouter.delete('/producto/:number', productDeleteOne)


module.exports = productRouter