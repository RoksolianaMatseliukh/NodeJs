const { ErrorHandler, errors: { ENTITY_NOT_FOUND } } = require('../../error');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const foundUser = await userService.getUserById(user_id);

        if (!foundUser) {
            throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
