const CarritoModel = require('../models/carrito');
const db = require('../db');


class CarritoCtrl {

    constructor() {
    }

    getAllCarritosControl(req, res) {
        CarritoModel.getAllCarritosModel(req, res);
    }


}
module.exports = new CarritoCtrl()
