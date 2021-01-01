const { ErrorHandler, errors: { NOT_VALID_ID, ENTITY_NOT_FOUND } } = require('../../error');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (userId <= 0 || !Number.isInteger(+userId)) {
            throw new ErrorHandler(NOT_VALID_ID.message, NOT_VALID_ID.code);
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
