const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR, CAR_FILE } } = require('../../constants');

module.exports = {
    getCars: (where, offset, limit) => {
        const CarModel = db.getModel(CAR);
        const CarFileModel = db.getModel(CAR_FILE);

        return CarModel.findAll({
            where,
            include: CarFileModel,
            offset,
            limit
        });
    },

    getCarById: (id) => {
        const CarModel = db.getModel(CAR);
        const CarFileModel = db.getModel(CAR_FILE);

        return CarModel.findByPk(id, {
            include: CarFileModel
        });
    },

    createCar: (car, transaction) => {
        const CarModel = db.getModel(CAR);

        return CarModel.create(car, {
            transaction
        });
    },

    editCarById: async (id, editedCar, transaction) => {
        const CarModel = db.getModel(CAR);

        await CarModel.update(editedCar, {
            where: { id },
            transaction
        });
    },

    deleteCarById: async (id) => {
        const CarModel = db.getModel(CAR);

        await CarModel.destroy({
            where: { id }
        });
    },

    getNumberOfCars: () => {
        const CarModel = db.getModel(CAR);

        return CarModel.count();
    }
};
