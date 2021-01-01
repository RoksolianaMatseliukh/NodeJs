const { ErrorHandler, customErrors: { NOT_VALID_BODY } } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const {
            model, price, year, user_id, ...otherFields
        } = req.body;

        if (!model || !price || !year || !user_id || user_id < 0 || !Number.isInteger(+user_id)
            || Object.values(otherFields).length) {
            throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
