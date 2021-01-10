const { ErrorHandler, customErrors: { WRONG_NUMBER_OF_DOCS, WRONG_NUMBER_OF_IMGS } } = require('../../errors');
const { uploadFilesEnum: { MAX_DOCS_NUMBER, MAX_IMGS_NUMBER } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const { docs, images } = req;

        if (docs.length > MAX_DOCS_NUMBER) {
            throw new ErrorHandler(WRONG_NUMBER_OF_DOCS.message, WRONG_NUMBER_OF_DOCS.code);
        }

        if (images.length > MAX_IMGS_NUMBER) {
            throw new ErrorHandler(WRONG_NUMBER_OF_IMGS.message, WRONG_NUMBER_OF_IMGS.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
