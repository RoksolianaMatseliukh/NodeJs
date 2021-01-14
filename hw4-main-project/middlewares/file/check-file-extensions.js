const { ErrorHandler, customErrors: { NOT_VALID_FILE_EXTENSION, TOO_LARGE_FILE } } = require('../../errors');
const {
    uploadFilesEnum: {
        IMG_MAX_SIZE, DOC_MAX_SIZE, DOCS_MIMETYPES, IMGS_MIMETYPES
    }
} = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const receivedFiles = Object.values(req.files || {});

        const docs = [];
        const images = [];

        receivedFiles.forEach((file) => {
            const { mimetype, size } = file;

            if (DOCS_MIMETYPES.includes(mimetype)) {
                if (size > DOC_MAX_SIZE) {
                    throw new ErrorHandler(
                        TOO_LARGE_FILE.message,
                        TOO_LARGE_FILE.code,
                        TOO_LARGE_FILE.customCode
                    );
                }

                docs.push(file);
            } else if (IMGS_MIMETYPES.includes(mimetype)) {
                if (size > IMG_MAX_SIZE) {
                    throw new ErrorHandler(
                        TOO_LARGE_FILE.message,
                        TOO_LARGE_FILE.code,
                        TOO_LARGE_FILE.customCode
                    );
                }

                images.push(file);
            } else {
                throw new ErrorHandler(
                    NOT_VALID_FILE_EXTENSION.message,
                    NOT_VALID_FILE_EXTENSION.code,
                    NOT_VALID_FILE_EXTENSION.customCode
                );
            }
        });

        req.docs = docs;
        req.images = images;

        next();
    } catch (e) {
        next(e);
    }
};
