const { ErrorHandler } = require('../../errors');
const { carValidators: { addCarToUserValidator } } = require('../../validators');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { error } = addCarToUserValidator.validate(req.body);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST);
        }

        next();
    } catch (e) {
        next(e);
    }
};
