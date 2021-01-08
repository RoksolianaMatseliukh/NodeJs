const { commonValidators: { numericalFieldValidator } } = require('../../validators');
const { ErrorHandler } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { carId, userId } = req.params;

        const idChecker = (id) => {
            if (id) {
                const { error } = numericalFieldValidator.validate(id);

                if (error) {
                    const [{ message }] = error.details;
                    throw new ErrorHandler(message, BAD_REQUEST);
                }
            }
        };

        idChecker(carId);
        idChecker(userId);

        next();
    } catch (e) {
        next(e);
    }
};
