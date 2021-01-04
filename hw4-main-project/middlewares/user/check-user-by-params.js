const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

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
