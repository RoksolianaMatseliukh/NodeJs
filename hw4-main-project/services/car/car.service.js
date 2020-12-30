const { Sequelize: { literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR }, dataBaseEnum: { USER_ID } } = require('../../constants');

module.exports = {
    getCars: () => {
        const CarModel = db.getModel(CAR);

        return CarModel.findAll({ order: literal(USER_ID) });
    },

    getCarByUserId: (user_id) => {
        const CarModel = db.getModel(CAR);

        return CarModel.find({ where: { user_id } });
    },

    createCar: (car) => {
        const CarModel = db.getModel(CAR);

        return CarModel.create(car);
    }
};
