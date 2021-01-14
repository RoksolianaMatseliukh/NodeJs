const {
    statusCodesEnum: {
        BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED
    },
    statusCustomCodes: {
        EMAIL_ALREADY_EXISTS_CC,
        ENTITY_NOT_FOUND_CC,
        NO_TOKEN_CC,
        NOT_VALID_FILE_EXTENSION_CC,
        NOT_VALID_TOKEN_CC,
        PERMISSION_DENIED_CC,
        TOO_LARGE_FILE_CC,
        USER_ALREADY_HAVE_SAME_CAR_CC,
        WRONG_EMAIL_OR_PASSWORD_CC,
        WRONG_NUMBER_OF_AVATAR_CC,
        WRONG_NUMBER_OF_DOCS_CC,
        WRONG_NUMBER_OF_IMGS_CC,
        WRONG_TEMPLATE_NAME_CC
    },
    statusMessagesEnum: {
        EMAIL_ALREADY_EXISTS,
        ID_NOT_FOUND,
        NO_TOKEN,
        NOT_VALID_FILE_EXTENSION,
        NOT_VALID_TOKEN,
        PERMISSION_DENIED,
        TOO_LARGE_FILE,
        USER_ALREADY_HAVE_SAME_CAR,
        WRONG_EMAIL_OR_PASSWORD,
        WRONG_NUMBER_OF_AVATAR,
        WRONG_NUMBER_OF_DOCS,
        WRONG_NUMBER_OF_IMGS,
        WRONG_TEMPLATE_NAME
    }
} = require('../constants');

module.exports = {
    // BAD_REQUEST
    EMAIL_ALREADY_EXISTS: {
        code: BAD_REQUEST,
        customCode: EMAIL_ALREADY_EXISTS_CC,
        message: EMAIL_ALREADY_EXISTS
    },

    NOT_VALID_FILE_EXTENSION: {
        code: BAD_REQUEST,
        customCode: NOT_VALID_FILE_EXTENSION_CC,
        message: NOT_VALID_FILE_EXTENSION
    },

    TOO_LARGE_FILE: {
        code: BAD_REQUEST,
        customCode: TOO_LARGE_FILE_CC,
        message: TOO_LARGE_FILE
    },

    USER_ALREADY_HAVE_SAME_CAR: {
        code: BAD_REQUEST,
        customCode: USER_ALREADY_HAVE_SAME_CAR_CC,
        message: USER_ALREADY_HAVE_SAME_CAR
    },

    WRONG_EMAIL_OR_PASSWORD: {
        code: BAD_REQUEST,
        customCode: WRONG_EMAIL_OR_PASSWORD_CC,
        message: WRONG_EMAIL_OR_PASSWORD
    },

    WRONG_NUMBER_OF_AVATAR: {
        code: BAD_REQUEST,
        customCode: WRONG_NUMBER_OF_AVATAR_CC,
        message: WRONG_NUMBER_OF_AVATAR
    },

    WRONG_NUMBER_OF_DOCS: {
        code: BAD_REQUEST,
        customCode: WRONG_NUMBER_OF_DOCS_CC,
        message: WRONG_NUMBER_OF_DOCS
    },

    WRONG_NUMBER_OF_IMGS: {
        code: BAD_REQUEST,
        customCode: WRONG_NUMBER_OF_IMGS_CC,
        message: WRONG_NUMBER_OF_IMGS
    },

    WRONG_TEMPLATE_NAME: {
        code: BAD_REQUEST,
        customCode: WRONG_TEMPLATE_NAME_CC,
        message: WRONG_TEMPLATE_NAME
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        code: UNAUTHORIZED,
        customCode: NOT_VALID_TOKEN_CC,
        message: NOT_VALID_TOKEN
    },

    // FORBIDDEN
    PERMISSION_DENIED: {
        code: FORBIDDEN,
        customCode: PERMISSION_DENIED_CC,
        message: PERMISSION_DENIED
    },

    // NOT_FOUND
    ENTITY_NOT_FOUND: {
        code: NOT_FOUND,
        customCode: ENTITY_NOT_FOUND_CC,
        message: ID_NOT_FOUND
    },

    NO_TOKEN: {
        code: NOT_FOUND,
        customCode: NO_TOKEN_CC,
        message: NO_TOKEN
    }
};
