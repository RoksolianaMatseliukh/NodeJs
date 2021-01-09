const { ErrorHandler, customErrors: { NOT_VALID_FILE_EXTENSION, TOO_LARGE_FILE } } = require('../../errors');
const {
    uploadFilesEnum: {
        IMAGE_MAX_SIZE, DOC_MAX_SIZE, DOCS_MIMETYPES, IMAGES_MIMETYPES
    }
} = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const files = Object.values(req.files);

        const docs = [];
        const images = [];

        files.forEach((file) => {
            const { mimetype, size } = file;

            if (DOCS_MIMETYPES.includes(mimetype)) {
                if (size > DOC_MAX_SIZE) {
                    throw new ErrorHandler(TOO_LARGE_FILE.message, TOO_LARGE_FILE.code);
                }

                docs.push(file);
            } else if (IMAGES_MIMETYPES.includes(mimetype)) {
                if (size > IMAGE_MAX_SIZE) {
                    throw new ErrorHandler(TOO_LARGE_FILE.message, TOO_LARGE_FILE.code);
                }

                images.push(file);
            } else {
                throw new ErrorHandler(NOT_VALID_FILE_EXTENSION.message, NOT_VALID_FILE_EXTENSION.code);
            }
        });

        req.images = images;
        req.docs = docs;

        next();
    } catch (e) {
        next(e);
    }
};
