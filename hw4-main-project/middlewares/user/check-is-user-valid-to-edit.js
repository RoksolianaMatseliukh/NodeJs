const { ErrorHandler, errors: { NOT_VALID_BODY } } = require('../../error');

module.exports = (req, res, next) => {
    try {
        const {
            // eslint-disable-next-line no-unused-vars
            name, age, password, email, ...otherFields
        } = req.body;

        if ((age && (age <= 0 || !Number.isInteger(+age))) || Object.values(otherFields).length) {
            throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
