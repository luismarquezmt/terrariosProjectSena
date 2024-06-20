


class DB {

    getAllUsersFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            var ssql = 'select * from usuarios'
            conn.query(ssql, (err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
        })

    }

    getOneUserFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            var ssql = 'select * from usuarios where id_usuario =' + req.params.id
            conn.query(ssql, (err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
        })
    }

    createOneUserInDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = "INSERT INTO usuarios SET ?"
            conn.query(sql, [req.body], (err, rows) => {
                if (err) return res.send(err)
                res.send('User Add OK!')
            })
        })
    }

    patchOneUserInDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'UPDATE usuarios set ? WHERE id_usuario= ?'
            conn.query(sql, [req.body, req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send('User Updated OK!')
            })

        })
    }

    deleteOneUserInDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'DELETE FROM usuarios WHERE id_product = ?'
            conn.query(sql, [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send('User delete OK!')
            })
        })
    }

}

module.exports = new DB()
