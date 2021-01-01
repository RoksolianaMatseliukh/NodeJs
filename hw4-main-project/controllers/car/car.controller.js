const { carService } = require('../../services');
const { statusCodesEnum: { CREATED, OK }, statusMessagesEnum: { ENTITY_CREATED } } = require('../../constants');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getCars();

            res.status(OK).json(cars);
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
    }
};
