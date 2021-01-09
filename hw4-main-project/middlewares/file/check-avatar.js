const { ErrorHandler, customErrors: { WRONG_NUMBER_OF_IMAGES } } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const [avatar] = req.images;

        if (req.images.length > 1) {
            throw new ErrorHandler(WRONG_NUMBER_OF_IMAGES.message, WRONG_NUMBER_OF_IMAGES.code);
        }

        req.avatar = avatar;
        next();
    } catch (e) {
        next(e);
    }
};
