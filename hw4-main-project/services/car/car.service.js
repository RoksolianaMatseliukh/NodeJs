const { Sequelize: { literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const { dataBaseEnum: { USER_ID }, modelNamesEnum: { CAR } } = require('../../constants');

module.exports = {
    getCars: () => {
        const CarModel = db.getModel(CAR);

        return CarModel.findAll({ order: literal(USER_ID) });
    },

    getCarByUserId: (user_id) => {
        const CarModel = db.getModel(CAR);

        return CarModel.findOne({ where: { user_id } });
    },

    createCar: (car) => {
        const CarModel = db.getModel(CAR);

        return CarModel.create(car);
    }
};
