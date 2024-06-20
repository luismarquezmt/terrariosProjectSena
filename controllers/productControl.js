


// get---------------- Read all products
exports.productShowAll = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        var ssql = 'select * from productos'

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
            res.send('Add OK!')
        })
    })
}

//update --------------- actualizar
exports.productUpdateOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        let sql = 'UPDATE productos set ? WHERE id_product= ?'
        conn.query(sql, [req.body, req.params.number], (err, rows) => {
            if (err) return res.send(err)
            res.send('Product Updated OK!')
        })

    })
}

//delete --------------- eliminar
exports.productDeleteOne = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        let sql = 'DELETE FROM productos WHERE id_product = ?'
        conn.query(sql, [req.params.number], (err, rows) => {
            if (err) return res.send(err)
            res.send('Product delete OK!')
        })
    })
}