const {
    statusCodesEnum: {
        BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED
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
        customCode: 4001,
        message: EMAIL_ALREADY_EXISTS
    },

    NOT_VALID_FILE_EXTENSION: {
        code: BAD_REQUEST,
        customCode: 4002,
        message: NOT_VALID_FILE_EXTENSION
    },

    TOO_LARGE_FILE: {
        code: BAD_REQUEST,
        customCode: 4003,
        message: TOO_LARGE_FILE
    },

    USER_ALREADY_HAVE_SAME_CAR: {
        code: BAD_REQUEST,
        customCode: 4004,
        message: USER_ALREADY_HAVE_SAME_CAR
    },

    WRONG_EMAIL_OR_PASSWORD: {
        code: BAD_REQUEST,
        customCode: 4005,
        message: WRONG_EMAIL_OR_PASSWORD
    },

    WRONG_NUMBER_OF_AVATAR: {
        code: BAD_REQUEST,
        customCode: 4006,
        message: WRONG_NUMBER_OF_AVATAR
    },

    WRONG_NUMBER_OF_DOCS: {
        code: BAD_REQUEST,
        customCode: 4007,
        message: WRONG_NUMBER_OF_DOCS
    },

    WRONG_NUMBER_OF_IMGS: {
        code: BAD_REQUEST,
        customCode: 4008,
        message: WRONG_NUMBER_OF_IMGS
    },

    WRONG_TEMPLATE_NAME: {
        code: BAD_REQUEST,
        customCode: 4009,
        message: WRONG_TEMPLATE_NAME
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        code: UNAUTHORIZED,
        customCode: 4011,
        message: NOT_VALID_TOKEN
    },

    // FORBIDDEN
    PERMISSION_DENIED: {
        code: FORBIDDEN,
        customCode: 4031,
        message: PERMISSION_DENIED
    },

    // NOT_FOUND
    ENTITY_NOT_FOUND: {
        code: NOT_FOUND,
        customCode: 4041,
        message: ID_NOT_FOUND
    },

    NO_TOKEN: {
        code: NOT_FOUND,
        customCode: 4042,
        message: NO_TOKEN
    }
};
