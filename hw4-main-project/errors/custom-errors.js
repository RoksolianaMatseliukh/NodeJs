const {
    statusCodesEnum: {
        BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED
    },
    statusMessagesEnum: {
        EMAIL_ALREADY_EXISTS, ID_NOT_FOUND, NO_TOKEN, NOT_VALID_ID, NOT_VALID_BODY, NOT_VALID_TOKEN,
        PERMISSION_DENIED, USER_ALREADY_HAVE_SAME_CAR, WRONG_EMAIL_OR_PASSWORD, WRONG_TEMPLATE_NAME
    }
} = require('../constants');

module.exports = {
    // BAD_REQUEST
    EMAIL_ALREADY_EXISTS: {
        message: EMAIL_ALREADY_EXISTS,
        code: BAD_REQUEST
    },

    NOT_VALID_BODY: {
        message: NOT_VALID_BODY,
        code: BAD_REQUEST
    },

    NOT_VALID_ID: {
        message: NOT_VALID_ID,
        code: BAD_REQUEST
    },

    USER_ALREADY_HAVE_SAME_CAR: {
        message: USER_ALREADY_HAVE_SAME_CAR,
        code: BAD_REQUEST
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: WRONG_EMAIL_OR_PASSWORD,
        code: BAD_REQUEST
    },

    WRONG_TEMPLATE_NAME: {
        message: WRONG_TEMPLATE_NAME,
        code: BAD_REQUEST
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        message: NOT_VALID_TOKEN,
        code: UNAUTHORIZED
    },

    // FORBIDDEN
    PERMISSION_DENIED: {
        message: PERMISSION_DENIED,
        code: FORBIDDEN
    },

    // NOT_FOUND
    ENTITY_NOT_FOUND: {
        message: ID_NOT_FOUND,
        code: NOT_FOUND
    },

    NO_TOKEN: {
        message: NO_TOKEN,
        code: NOT_FOUND
    }
};
