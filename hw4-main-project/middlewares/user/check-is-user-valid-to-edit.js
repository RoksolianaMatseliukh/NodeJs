const { ErrorHandler } = require('../../errors');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { userValidators: { editUserFieldsValidator } } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { error } = editUserFieldsValidator.validate(req.body);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST);
        }

        next();
    } catch (e) {
        next(e);
    }
};
