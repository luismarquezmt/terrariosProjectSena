
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//secreto_para_jwt
const SECRET_KEY = process.env.JWT_SECRET


class DB {
    constructor(userData) {
        this.userData = userData
    }

    getAllUsersFromDb(req, res) {
        if (req.rol !== 'admin') {
            return res.send({ msg: 'Access forbidden' });
        }
        let nick_usuario = req.nick_usuario
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select * from usuarios'

            conn.query(ssql, (err, rows) => {
                if (err) return res.send(err)
                return res.json({ rows, nick_usuario, msg: `Bienvenido ${nick_usuario} a control de Acceso` })
            })
        })
    }
    // processdata(rows) {
    //     rows.map((unidades) => {
    //         console.log(unidades);
    //     })
    // }

    comprobatefromUserFromToken(req, res) {
        let nick_usuario = req.nick_usuario
        let rol = req.rol
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select id_usuario from usuarios where nick_usuario=?'
            conn.query(ssql, [nick_usuario], (err, row) => {
                if (err) return res.send(err)
                if (row.length === 0) {
                    row = { 0: { id_usuario: "nodata" } };
                }
                return res.send({ nick_usuario, rol, row })
            })
        })
    }


    getDataProfileFromDb(req, res) {

        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select * from personas where id_usuario= ?'
            conn.query(ssql, [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                return res.send(rows)
            })
        })
    }

    getOneUserFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select * from usuarios where id_usuario =' + req.params.id
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
            // inserta fecha con formato para mysqwl
            this.transformDate()
            req.body.fecha_registro = this.transformDate()
            req.body.rol = "cliente"
            // crea el hast de la contraseña antes de insertarlo en BD
            req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 8);
            // console.log(req.body.fecha_registro);
            // console.log(req.body.nick_usuario);
            // valida que el usuario no se encuentre en bd
            let anotherSql = "select * from usuarios where nick_usuario = ?"
            conn.query(anotherSql, [req.body.nick_usuario], (err, data) => {
                if (err) return console.log(err)
                if (data.length === 0) {
                    conn.query(sql, [req.body], (err, rows) => {
                        if (err) return console.log(err)
                        console.log('User Add OK!')
                        res.send("Usuario añadido exitosamente")
                    })
                } else {
                    // console.log("User Already Exist")
                    res.send("Usuario registrado previamente")
                }
            })

        })

    }


    createOneUserDataProfileInDb(req, res) {
        // console.log(req.body);
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'INSERT INTO personas SET ?'
            conn.query(sql, [req.body], (err, rows) => {
                if (err) return res.send(err)
                res.send({ msg: `${req.body.nombres} tu perfil ha sido creado correctamente!` })
            })
        })
    }


    //   util
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
        // console.log(req.body);
        req.getConnection((err, conn) => {
            if (err) return console.log(err)
            let sql = 'UPDATE usuarios set ? WHERE id_usuario= ?'
            // if (req.body.contrasena) {
            //     req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 8);
            // }
            // si viene con old pass el cliente esta editando su contrASEÑA
            if (req.body.oldpass) {
                let getOldPassSql = 'SELECT contrasena from usuarios where id_usuario = ?'
                conn.query(getOldPassSql, [req.params.id], (err, oldKey) => {
                    if (err) return console.log(err)
                    // console.log(req.body.contrasena);
                    // console.log(req.params.id);
                    // console.log(oldKey[0].contrasena);
                    let comparison = bcrypt.compareSync(req.body.oldpass, oldKey[0].contrasena)
                    if (comparison) {
                        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 8);
                        let otrobody = {
                            contrasena: req.body.contrasena
                        }
                        conn.query(sql, [otrobody, req.params.id], (err, rows) => {
                            if (err) return console.log(err)
                            res.send({ msg: 'Contraseña de usuario Actualizada OK!' })
                        })
                    } else {
                        console.log("lelele");
                        return res.send({ msg: 'Contraseña no coincide con la registrada' })
                    }

                })
            }

            // si NO  viene con old pass ES UN EDIT del admin 
            if (!req.body.oldpass) {
                //si tiene pwd lo cryptea 
                if (req.body.contrasena) {
                    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 8);
                }
                // continua enviando el data a bd y esperando la respuesta 
                conn.query(sql, [req.body, req.params.id], (err, rows) => {
                    if (err) return console.log(err)
                    res.send({ msg: 'User Updated OK!' })
                })
            }

        })
    }

    patchOneUserDataProfileInDb(req, res) {
        console.log(req.body);
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'UPDATE personas set ? WHERE id_usuario= ?'
            conn.query(sql, [req.body, req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send({ msg: 'Perfil Actualizado OK!' })
            })
        })
    }


    deleteOneUserInDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'DELETE FROM usuarios WHERE id_usuario = ?'
            conn.query(sql, [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.send({ msg: 'User delete OK!' })
            })
        })
    }

    //al validar credenciales de usuario aki crea el token  
    validateUsersDb(req, res) {
        req.getConnection(async (err, conn) => {
            if (err) return console.log(err)
            // let sql = "INSERT INTO usuarios SET ?"
            const client = req.body.nick_usuario
            const pwdClient = req.body.contrasena
            // let pwdHashiado = await bcrypt.hash(pwdClient, 8)
            let anotherSql = "select * from usuarios where nick_usuario = ?"
            conn.query(anotherSql, [req.body.nick_usuario], (err, data) => {
                if (err) return console.log(err)
                if (data.length === 0) {
                    return res.send({ msg: "Usuario no existente" })
                }
                let comparison = bcrypt.compareSync(pwdClient, data[0].contrasena)
                if (client === data[0].nick_usuario && comparison) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 10),
                        data:
                        {
                            nick_usuario: data[0].nick_usuario,
                            rol: data[0].rol
                        },

                    }, SECRET_KEY)
                    res.cookie("token", token)
                    // res.set('Authorization', `Bearer ${token}`);
                    if (data[0].rol === "admin") {
                        res.send({ msg: `Bienvenido Admin ${data[0].nick_usuario}`, token })
                    } else {
                        res.send({ msg: `Bienvenido ${data[0].nick_usuario}`, token })
                    }
                } else {
                    res.send({ msg: "Revisa tus credenciales" })
                }
            })
        })
    }
}

module.exports = new DB()
