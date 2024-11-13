const db = require('../db');

class CarritoModel {
    constructor(nick_usuario, contrasena) {
        this.nick_usuario = nick_usuario
        this.contrasena = contrasena
    }

    getAllCarritosModel(req, res) {
        db.getAllCarritosFromDb(req, res)
    }
}

module.exports = new CarritoModel