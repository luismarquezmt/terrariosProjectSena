const { Router } = require('express');
const clientRouter = Router()

const UsersCtrl = require('../controllers/clientControl');

//clientRouter
clientRouter.get('/', UsersCtrl.getAllUserControl)
clientRouter.get('/userlindo', UsersCtrl.getAllUserControl)
clientRouter.post('/cliente/create', UsersCtrl.createOneUserControl)
clientRouter.get('/:id', UsersCtrl.getOneUserControl)
clientRouter.patch('/cliente/:id', UsersCtrl.patchOneUserControl)
clientRouter.delete('/cliente/:id', UsersCtrl.deleteOneUserControl)

module.exports = clientRouter 