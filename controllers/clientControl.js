const userModel = require('../models/users');
const db = require('../db');


class UsersCtrl {

    constructor() {
        // this.users = [
        //     {
        //         id: 1,
        //         name: "pedro",
        //         email: "email@sds"
        //     }
        // ]

        // bindea el objeto this para que el objeto this no cambie donde se invoque 
        this.getAll = this.getAll.bind(this)
    }

    getAllUserControl (req, res) {
        let perra =userModel.getAllUsers(req, res);
       
        // res.render("index", {
        //     path: '../views'
        // })
    }

    getOneUserControl(req, res) {
        userModel.getOneUser(req, res)
    }
    createOneUserControl(req, res) {
        userModel.createOneUser(req, res)
        res.redirect(`../`)

    }
    patchOneUserControl(req, res) {
        userModel.patchOneUser(req, res)
    }
    deleteOneUserControl(req, res) {
        userModel.deleteOneUser(req, res)
    }



    getAll(req, res) {
        console.log(this.users);
        const json = {
            response: 'ok',
            data: this.users,
            total: 1
        }
        res.send(json)
    }
    getOne(req, res) {
        const user = {
            id: req.params.id,
            name: `GENERIC${req.params.id}`,
            email: `GENERIC${req.params.id}@gmail.com`,
        }
        res.send(user)
    }

    postOne(req, res) {
        console.log(req.body);
        const json = {
            response: "ok",
            data: {
                id: 100,
                name: req.body.name
            }
        }
        res.send(json)
    }



}

module.exports = new UsersCtrl()

