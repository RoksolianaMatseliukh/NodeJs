const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR } } = require('../../constants');

module.exports = {
    getCars: () => {
        const CarModel = db.getModel(CAR);

        return CarModel.findAll();
    },

    getCarById: (id) => {
        const CarModel = db.getModel(CAR);

        return CarModel.findByPk(id);
    },

    createCar: async (car) => {
        const CarModel = db.getModel(CAR);

        await CarModel.create(car);
    },

    deleteCarById: async (id) => {
        const CarModel = db.getModel(CAR);

        await CarModel.destroy({
            where: { id }
        });
    },

    editCarById: async (id, editedCar) => {
        const CarModel = db.getModel(CAR);

        await CarModel.update(
            { ...editedCar },
            { where: { id } }
        );
    },
};
