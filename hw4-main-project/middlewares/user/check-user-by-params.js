const { commonValidators: { numericalValueValidator } } = require('../../validators');
const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');
const { userService } = require('../../services');
const { statusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const { error } = numericalValueValidator.validate(+userId);

        if (error) {
            const [{ message }] = error.details;
            throw new ErrorHandler(message, BAD_REQUEST);
        }

        const foundUser = await userService.getUserById(userId);

        if (!foundUser) {
            throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.code);
        }

        req.user = foundUser;
        next();
    } catch (e) {
        next(e);
    }
};
