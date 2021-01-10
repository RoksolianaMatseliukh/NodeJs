const { carService } = require('../../services');
const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { carId } = req.params;

        const foundCar = await carService.getCarById(carId);

        if (!foundCar) {
            throw new ErrorHandler(
                ENTITY_NOT_FOUND.message,
                ENTITY_NOT_FOUND.code,
                ENTITY_NOT_FOUND.customCode
            );
        }

        req.car = foundCar;
        next();
    } catch (e) {
        next(e);
    }
};
