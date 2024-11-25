const db = require('../db');

class CarritoModel {
    constructor(nick_usuario, contrasena) {
        this.nick_usuario = nick_usuario
        this.contrasena = contrasena
    }

    getAllCarritosModel(req, res) {
        db.getAllCarritosFromDb(req, res)
    }
    comprobateCarritosModel(req, res) {
        db.getComprobateCarritosFromDb(req, res)
    }
    comprobateMisProductosModel(req, res) {
        db.getComprobateMisProductosFromDb(req, res)
    }
    comprobateAllProductosModel(req, res) {
        db.getComprobateAllProductosFromDb(req, res)
    }
    createOneCarritoModel(req, res) {
        db.createOneCarritoInDb(req, res)
    }
    createOnePedidoModel(req, res) {
        db.createOnePedidoInDb(req, res)
    }
    patchOneDataMisProductosModel(req, res) {
        db.patchOneUserDataMisProductosInDb(req, res)
    }


    deleteOneCarritoModel(req, res) {
        db.deleteOneCarritoInDb(req, res)
    }
    deleteAllCarritoModel(req, res) {
        db.deleteallCarritosInDb(req, res)
    }
}

module.exports = new CarritoModel