
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

    getDataAllProfileFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select mis_productos.id_usuario, personas.identificacion, personas.nombres, personas.correo, personas.telefono, personas.direccion from mis_productos join personas on   mis_productos.id_usuario = personas.id_usuario'
            conn.query(ssql, (err, rows) => {
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

    createOneUserFotoProfileInDb(req, res) {
        //valida el middelware que se carque o el tipo 
        // console.log(req.file);
        // console.log(req.body);

        if (req.file) {
            //le quita la palabra views a la ruta 
            const pathImages = { imagen: `..` + req.file.path.split("views")[1] }
            const id = req.body.id         
            // console.log(pathImages);
            // console.log(id);
            req.getConnection((err, conn) => {
                if (err) return res.send(err)
                let sql = 'UPDATE personas set ? WHERE id_usuario= ?'
                conn.query(sql, [pathImages, id], (err, rows) => {
                    if (err) return res.send(err)
                    res.redirect('../../views/userProfile.html')
                    // res.send({ msg: 'Perfil Actualizado OK!' })
                })
            })
        } else {
            res.redirect('../../views/notProcessImage1.html')
        }

        // res.sendStatus(200)
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

        return `${year}-${month}-${day} `;
    }

    transformDateFull() {

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
        let hour = date.getHours()
        let minute = date.getMinutes()
        let seconds = date.getSeconds()

        return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
    }

    //patch de contraseña del usuario 
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

    // patch data del uysuario 
    patchOneUserDataProfileInDb(req, res) {
        // console.log(req.body);
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
                            rol: data[0].rol,
                            id_usuario: data[0].id_usuario
                        },

                    }, SECRET_KEY)
                    res.cookie("token", token)
                    // res.set('Authorization', `Bearer ${ token } `);
                    if (data[0].rol === "admin") {
                        res.send({ msg: `Bienvenid@ Admin ${data[0].nick_usuario} `, token })
                    } else if (data[0].rol === "inactivo") {
                        res.send({ msg: `Tu usuario ${data[0].nick_usuario} se encuentra inactivo`, token })
                    } else {
                        res.send({ msg: `Bienvenid@ ${data[0].nick_usuario} `, token })
                    }
                } else {
                    res.send({ msg: "Revisa tus credenciales" })
                }
            })
        })
    }


    // ----------------------Carrito--------------------------

    //selecciona y genera un join de items del carrito con productos para entregarlos  y lo agrupa por productos para sumar el conteo de unidades añadisas
    getAllCarritosFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let ssql = 'select items_carrito.id_producto, productos.nombre_producto, productos.descripcion_producto,productos.imagen_producto ,count(items_carrito.cantidad) AS conteo, productos.inventario, productos.precio from items_carrito inner join productos on items_carrito.id_producto= productos.id_producto where id_carrito =' + req.params.id + ' group by productos.id_producto'
            conn.query(ssql, (err, rows) => {
                if (err) return res.send(err)
                res.json(rows)
            })
        })
    }

    getComprobateCarritosFromDb(req, res) {
        // console.log(req.params.id);
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `select id_carrito from carrito where id_usuario = ?`
            //comprueba si ya hay un carrito 
            conn.query(firstSql, [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                return res.json(rows)
            })
        })

    }


    getComprobateMisProductosFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `select mis_productos.id_usuario, mis_productos.fecha_compra ,mis_productos.cantidad ,mis_productos.estado, mis_productos.id_producto, productos.nombre_producto, productos.descripcion_producto, productos.imagen_producto, productos.precio from mis_productos JOIN productos on  mis_productos.id_producto =  productos.id_producto where id_usuario = ?`
            //comprueba si ya hay un carrito 
            conn.query(firstSql, [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                return res.json(rows)
            })
        })

    }
    getComprobateAllProductosFromDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `select mis_productos.id_usuario, mis_productos.id_mis_productos, mis_productos.fecha_compra ,mis_productos.cantidad ,mis_productos.estado, mis_productos.id_producto, productos.nombre_producto, productos.descripcion_producto, productos.imagen_producto, productos.precio from mis_productos JOIN productos on  mis_productos.id_producto =  productos.id_producto`
            //comprueba si ya hay un carrito 
            conn.query(firstSql, (err, rows) => {
                if (err) return res.send(err)
                return res.json(rows)
            })
        })

    }


    createOneCarritoInDb(req, res) {
        // console.log(req.body);
        // funcion que transforma la fecha para mYsql
        let fecha = this.transformDateFull()
        //datos del carro
        let otrobody = {
            id_usuario: req.body.idUser,
            fecha_creacion: fecha
        }
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `select id_carrito from carrito where id_usuario = ?`
            //comprueba si ya hay un carrito 
            conn.query(firstSql, [req.body.idUser], (err, rows) => {
                let thirdSql = `select id_carrito from carrito where id_usuario = ?`
                if (err) return res.send(err)
                // si hay datos en carro, debe ingresar producto 
                if (rows.length > 0) {
                    conn.query(thirdSql, [req.body.idUser], (err, row) => {
                        if (err) return res.send(err)
                        let IdCarrito = row[0].id_carrito
                        let otroBodyMas = {
                            id_carrito: IdCarrito,
                            id_producto: req.body.idProduct,
                            cantidad: 1
                        }
                        let fourSql = `INSERT INTO items_carrito SET ?`
                        conn.query(fourSql, [otroBodyMas], (err, row) => {
                            if (err) return res.send(err)
                            return res.json({ id_carrito: IdCarrito, msg: 'producto agregado' })
                        })
                    })
                } else {
                    //inserta un carrito si no hay creado 
                    let seconSql = `INSERT INTO carrito SET ?`
                    conn.query(seconSql, [otrobody], (err, rows) => {
                        if (err) return res.send(err)
                        //y luego debe ingresar producto
                        conn.query(thirdSql, [req.body.idUser], (err, row) => {
                            if (err) return res.send(err)
                            let IdCarrito = row[0].id_carrito
                            let otroBodyMas = {
                                id_carrito: IdCarrito,
                                id_producto: req.body.idProduct,
                                cantidad: 1
                            }
                            let fourSql = `INSERT INTO items_carrito SET ?`
                            conn.query(fourSql, [otroBodyMas], (err, row) => {
                                if (err) return res.send(err)
                                return res.json({ msg: 'producto agregado' })
                            })
                        })
                    })
                }
            })
        })
    }

    //create pedido 
    createOnePedidoInDb(req, res) {
        // console.log(req.body);
        req.body.fecha_compra = this.transformDateFull()
        req.body.estado = 'pendiente'
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `INSERT INTO mis_productos SET ?`
            conn.query(firstSql, [req.body], (err, row) => {
                if (err) return res.send(err)
                let seconSql = `select inventario from productos where id_producto = ?`
                conn.query(seconSql, [req.body.id_producto], (err, row) => {
                    if (err) return res.send(err)
                    let inventarioNewValue = row[0].inventario - req.body.cantidad
                    let thirdSql = `UPDATE productos SET inventario = ${inventarioNewValue} where id_producto = ?`
                    conn.query(thirdSql, [req.body.id_producto], (err, row) => {
                        if (err) return res.send(err)
                        return res.json({ msg: 'Pedido agregado' })
                    })
                })
            })
        })
    }


    // patch data de mis productos de usuario 
    patchOneUserDataMisProductosInDb(req, res) {
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let sql = 'UPDATE mis_productos SET ? WHERE id_mis_productos = ?'
            conn.query(sql, [req.body, req.params.idMisProductos], (err, rows) => {
                if (err) return res.send(err)
                // console.log(rows);
                res.send({ msg: 'Estado Actualizado OK!' })
            })
        })
    }

    // borra el carrito creado despues de generar el pedido 
    deleteallCarritosInDb(req, res) {
        let idCarrito = req.params.idCarrito
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let seconSql = `DELETE FROM items_carrito where id_carrito = ?`
            conn.query(seconSql, [idCarrito], (err, rows) => {
                if (err) return res.send(err)
                let thirdSql = `DELETE FROM carrito WHERE id_carrito = ?`
                conn.query(thirdSql, [idCarrito], (err, rows) => {
                    if (err) return res.send(err)
                    return res.json({ msg: 'Carritos Eliminados' })
                })
            })
        })
    }





    deleteOneCarritoInDb(req, res) {

        let idCarrito = req.params.idCarrito
        let idProduct = req.params.idProducto
        req.getConnection((err, conn) => {
            if (err) return res.send(err)
            let firstSql = `DELETE FROM items_carrito WHERE id_producto = ${idProduct} and id_carrito = ${idCarrito}`
            conn.query(firstSql, (err, rows) => {
                if (err) return res.send(err)
                //delete item car ok 
                let seconSql = 'select * from items_carrito  where id_carrito = ?'
                //comprueba si queda items en el carro
                conn.query(seconSql, [req.params.idCarrito], (err, rows) => {
                    if (err) return res.send(err)
                    //si no hay items elimina el carro 
                    if (rows.length == 0) {
                        let thirdSql = `DELETE FROM carrito WHERE id_carrito = ?`
                        conn.query(thirdSql, [req.params.idCarrito], (err, rows) => {
                            if (err) return res.send(err)
                            return res.send({ msg: 'carrito delete OK!' })
                        })
                    } else {
                        return res.send({ msg: "Producto de carrito eliminado " })
                    }
                })
            })
        })
    }

}
module.exports = new DB()
