const db = require('../db');

class UserModel {
    constructor(nick_usuario, contrasena) {
        this.nick_usuario = nick_usuario
        this.contrasena = contrasena
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