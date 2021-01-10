const { ErrorHandler, customErrors: { WRONG_NUMBER_OF_AVATAR } } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const [avatar] = req.images;

        if (req.images.length > 1) {
            throw new ErrorHandler(WRONG_NUMBER_OF_AVATAR.message, WRONG_NUMBER_OF_AVATAR.code);
        }

        req.avatar = avatar;
        next();
    } catch (e) {
        next(e);
    }
};
