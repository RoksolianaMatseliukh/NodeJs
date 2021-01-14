const { ErrorHandler } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST }, statusCustomCodes: { NOT_VALID_BODY_CC } } = require('../../constants');

module.exports = (validator) => (req, res, next) => {
    try {
        const { error } = validator.validate(req.body);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST, NOT_VALID_BODY_CC);
        }

        next();
    } catch (e) {
        next(e);
    }
};
