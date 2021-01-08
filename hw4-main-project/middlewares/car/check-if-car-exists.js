const { carService } = require('../../services');
const { commonValidators: { numericalFieldValidator } } = require('../../validators');
const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { car_id } = req.body;
        const { carId } = req.params;

        const actionsWithId = async (id) => {
            if (id) {
                const { error } = numericalFieldValidator.validate(+id);

                if (error) {
                    const [{ message }] = error.details;
                    throw new ErrorHandler(message, BAD_REQUEST);
                }

                const foundCar = await carService.getCarById(id);

                if (!foundCar) {
                    throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.code);
                }
            }
        };

        await actionsWithId(car_id);
        await actionsWithId(carId);

        next();
    } catch (e) {
        next(e);
    }
};
