const { carService } = require('../../services');
const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { car_id } = req.body;

        const foundCar = await carService.getCarById(car_id);

        if (!foundCar) {
            throw new ErrorHandler(
                ENTITY_NOT_FOUND.message,
                ENTITY_NOT_FOUND.code,
                ENTITY_NOT_FOUND.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
