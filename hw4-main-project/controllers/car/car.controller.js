const { carService } = require('../../services');
const {
    statusCodesEnum: { CREATED, NO_CONTENT },
    statusMessagesEnum: { ENTITY_CREATED, ENTITY_EDITED }
} = require('../../constants');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            await carService.createCar(req.body);

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    editCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.editCarById(carId, req.body);

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            next(e);
        }
    }
};
