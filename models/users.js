const db = require('../db');

class UserModel {
    constructor(id_usuario, nick_usuario, contraseña) {
        this.id_usuario = id_usuario
        this.nick_usuario = nick_usuario
        this.contraseña = contraseña
    }

    getAllUsers(req, res) {
        db.getAllUsersFromDb(req, res)
    }

    getOneUser(req, res) {
        db.getOneUserFromDb(req, res)
    }

    createOneUser(req, res) {
        db.createOneUserInDb(req, res)
    }

    patchOneUser(req, res) {
        db.patchOneUserInDb(req, res)
    }
    deleteOneUser(req, res) {
        db.deleteOneUserInDb(req, res)
    }

}

module.exports = new UserModel