const { Sequelize: { literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const { dataBaseEnum: { USER_ID }, modelNamesEnum: { CAR } } = require('../../constants');

module.exports = {
    getCars: () => {
        const CarModel = db.getModel(CAR);

        return CarModel.findAll({ order: literal(USER_ID) });
    },

    createCar: async (car) => {
        const CarModel = db.getModel(CAR);

        await CarModel.create(car);
    }
};
