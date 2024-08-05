const db = require('../db');

class UserModel {
    constructor(nick_usuario, contrasena) {
        this.nick_usuario = nick_usuario
        this.contrasena = contrasena
    }

    getAllUsers(req, res) {
        db.getAllUsersFromDb(req, res)
    }

    comprobateUser(req, res) {
        db.comprobatefromUserFromToken(req, res)
    }


    getDataProfile(req, res) {
        db.getDataProfileFromDb(req, res)
    }



    getOneUser(req, res) {
        db.getOneUserFromDb(req, res)
    }

    createOneUser(req, res) {
        db.createOneUserInDb(req, res)
    }
    createOneUserDataProfile(req, res) {
        db.createOneUserDataProfileInDb(req, res)
    }

    patchOneUser(req, res) {
        db.patchOneUserInDb(req, res)
    }


    patchOneUserDataProfile(req, res) {
        db.patchOneUserDataProfileInDb(req, res)
    }


    deleteOneUser(req, res) {
        db.deleteOneUserInDb(req, res)
    }

    loginUsers(req, res) {
        db.validateUsersDb(req, res)
    }


}

module.exports = new UserModel