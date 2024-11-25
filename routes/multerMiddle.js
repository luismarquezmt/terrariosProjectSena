const { join } = require('path');
const multer = require('multer')
const CURRENT_DIR = join(__dirname, '../views/public/uploads')
const MIMETYPES = ['image/jpeg', 'image/png']

// https://www.npmjs.com/package/multer
const multerMiddleware = multer({
    storage: multer.diskStorage({
        destination: CURRENT_DIR,
        filename: (req, file, callback) => {
            const id = req.body.id

            if (file.originalname) {
                // path.extname(path string ) Funcion que extrae la ext
                // console.log(file.originalname.split(".")[1]);
                // console.log(`Solo se permiten archivos ${MIMETYPES.join(' ')}`);

                callback(null, `${id}.${file.originalname.split(".")[1]}`)

            } else {
                callback(new Error("Error al nombrar archivo "))
            }
        }
    }),

    fileFilter: (req, file, callback) => {
        if (MIMETYPES.includes(file.mimetype)) {
            callback(null, true)

        } else {
            // callback(new Error(`Solo se permiten archivos ${MIMETYPES.join(' ')}`))
            // callback(new Error('No'))
            callback(null, false)
        }
    },
    limits: {
        fieldSize: 10000000
    }
})

module.exports = multerMiddleware;


const multerMiddlewareProducts = multer({
    storage: multer.diskStorage({
        destination: CURRENT_DIR,
        filename: (req, file, callback) => {
            // el body se llama con el name del html 
            const id = req.body.id_product
            if (file.originalname) {
                // path.extname(path string ) Funcion que extrae la ext
                // console.log(file.originalname.split(".")[1]);
                // console.log(`Solo se permiten archivos ${MIMETYPES.join(' ')}`);
                callback(null, `${id}.${file.originalname.split(".")[1]}`)
            } else {
                callback(new Error("Error al nombrar archivo "))
            }
        }
    }),

    fileFilter: (req, file, callback) => {
        if (MIMETYPES.includes(file.mimetype)) {
            callback(null, true)

        } else {
            // callback(new Error(`Solo se permiten archivos ${MIMETYPES.join(' ')}`))
            // callback(new Error('No'))
            callback(null, false)
        }
    },
    limits: {
        fieldSize: 10000000
    }
})


module.exports = multerMiddlewareProducts;
