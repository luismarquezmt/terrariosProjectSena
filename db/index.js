class DB {
    constructor(userData) {
        this.userData = userData
    }

    getAllUsersFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            var ssql = 'select * from usuarios'

            conn.query(ssql, (err, rows) => {
                if (err) return res.send(err)
                return res.render("index", { data: rows })
            })
        })
    }
    // processdata(rows) {
    //     rows.map((unidades) => {
    //         console.log(unidades);
    //     })
    // }


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
        console.log(req.body);
        req.getConnection((err, conn) => {
            if (err) return console.log(err)
            let sql = "INSERT INTO usuarios SET ?"
            this.transformDate()
            req.body.fecha_registro = this.transformDate()
            console.log(req.body.fecha_registro);
            conn.query(sql, [req.body], (err, rows) => {
                if (err) return console.log(err)
                console.log('User Add OK!')
            })
        })
    }

    transformDate() {

        const date = new Date();
        // Formatear la fecha como YYYY-MM-D
        let day = date.getDate();
        let month = date.getMonth() + 1; // Los meses empiezan desde 0
        const year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${day}`;
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
