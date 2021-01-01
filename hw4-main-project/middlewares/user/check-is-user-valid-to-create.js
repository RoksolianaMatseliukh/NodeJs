const { ErrorHandler, customErrors: { NOT_VALID_BODY } } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const {
            name, age, email, password, ...otherFields
        } = req.body;

        if (!name || !email || !password || !age || age < 0 || !Number.isInteger(+age)
            || Object.values(otherFields).length) {
            throw new ErrorHandler(NOT_VALID_BODY.message, NOT_VALID_BODY.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
