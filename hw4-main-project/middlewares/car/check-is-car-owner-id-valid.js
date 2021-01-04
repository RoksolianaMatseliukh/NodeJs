const { commonValidators: { numericalFieldValidator } } = require('../../validators');
const { ErrorHandler } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { user_id } = req.body;

        const { error } = numericalFieldValidator.validate(user_id);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST);
        }

        next();
    } catch (e) {
        next(e);
    }
};
