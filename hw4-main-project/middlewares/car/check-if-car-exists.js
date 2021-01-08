const { carService } = require('../../services');
const { commonValidators: { numericalFieldValidator } } = require('../../validators');
const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { car_id } = req.body;

        const { error } = numericalFieldValidator.validate(+car_id);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST);
        }

        const foundCar = await carService.getCarById(+car_id);

        if (!foundCar) {
            throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
