const CarritoModel = require('../models/carrito');
const db = require('../db');


class CarritoCtrl {

    constructor() {
    }

    getAllCarritosControl(req, res) {
        CarritoModel.getAllCarritosModel(req, res);
    }
    comprobateCarritosControl(req, res) {
        CarritoModel.comprobateCarritosModel(req, res);
    }
    getMisProductosControl(req, res) {
        CarritoModel.comprobateMisProductosModel(req, res);
    }
    getAllProductosControl(req, res) {
        CarritoModel.comprobateAllProductosModel(req, res);
    }
    createOneCarritoControl(req, res) {
        CarritoModel.createOneCarritoModel(req, res);
    }
    createOnePedidoControl(req, res) {
        CarritoModel.createOnePedidoModel(req, res);
    }
    patchOneDataMisProductosControl(req, res) {
        CarritoModel.patchOneDataMisProductosModel(req, res);
    }
    deleteOneCarritoControl(req, res) {
        CarritoModel.deleteOneCarritoModel(req, res);
    }
    deleteAllCarritoControl(req, res) {
        CarritoModel.deleteAllCarritoModel(req, res);
    }
    

}
module.exports = new CarritoCtrl()
