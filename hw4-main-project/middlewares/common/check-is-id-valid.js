const { commonValidators: { idValidator } } = require('../../validators');
const { ErrorHandler } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST }, statusCustomCodes: { NOT_VALID_ID_CC } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { carId, userId } = req.params;

        const idChecker = (id) => {
            if (id) {
                const { error } = idValidator.validate(id);

                if (error) {
                    const [{ message }] = error.details;
                    throw new ErrorHandler(message, BAD_REQUEST, NOT_VALID_ID_CC);
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
