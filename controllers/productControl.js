
// get---------------- Read all products
exports.productShowAll = (req, res) => {
    let rol = req.rol
    let nick_usuario = req.nick_usuario
    let id_usuario = req.id_usuario

    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        var ssql = 'select * from productos where inventario > 0'
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.send({ rows, rol, nick_usuario, id_usuario })
        })
    })
}
// get---------------- Read all id products
exports.productIdShow = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        var ssql = 'select id_producto, imagen_producto from productos'
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
}


//  get----------------read one product
exports.productShowOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        var ssql = 'select * from productos where id_producto =' + req.params.number
        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
}

// insert --------------- insertar
exports.productCreateOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        let sql = "INSERT INTO productos SET ?"
        conn.query(sql, [req.body], (err, rows) => {
            if (err) return res.send(err)
                res.json({ msg: 'Add OK!' })
        })
    })
}

exports.createOneDataFotoProductInDb = (req, res) => {
    //valida el middelware que se carque o el tipo 
    if (req.file) {
        //le quita la palabra views a la ruta 
        const pathImages = { imagen_producto: `..` + req.file.path.split("views")[1] }
        const idProducto = req.body.id_product
        // console.log(pathImages);
        // console.log(id);
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'UPDATE productos set ? WHERE id_producto = ?'
            conn.query(sql, [pathImages, idProducto], (err, rows) => {
                if (err) return res.send(err)
                res.redirect('../../views/gestionproductos.html')
                // res.send({ msg: 'Perfil Actualizado OK!' })
            })
        })
    } else {
        res.redirect('../../views/notproccessimg.html')
    }

    // res.sendStatus(200)
}



//update --------------- actualizar
exports.productUpdateOne = (req, res) => {
    // console.log(req.body);
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        let sql = 'UPDATE productos set ? WHERE id_producto = ?'
        conn.query(sql, [req.body, req.params.number], (err, rows) => {
            if (err) return res.send(err)
            res.json({ msg: 'Product Updated OK!' })
        })

    })
}

//delete --------------- eliminar
exports.productDeleteOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        let sql = 'DELETE FROM productos WHERE id_producto = ?'
        conn.query(sql, [req.params.number], (err, rows) => {
            if (err) return res.send(err)
            res.json({ msg: 'Product delete OK!' })
        })
    })
}


