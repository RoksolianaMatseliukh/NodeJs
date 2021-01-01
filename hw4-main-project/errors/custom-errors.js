const {
    statusCodesEnum: { BAD_REQUEST, NOT_FOUND },
    statusMessagesEnum: {
        EMAIL_ALREADY_EXISTS, ID_NOT_FOUND, NOT_VALID_ID, NOT_VALID_BODY
    }
} = require('../constants');

module.exports = {
    EMAIL_ALREADY_EXISTS: {
        message: EMAIL_ALREADY_EXISTS,
        code: BAD_REQUEST
    },

    ENTITY_NOT_FOUND: {
        message: ID_NOT_FOUND,
        code: NOT_FOUND
    },

    NOT_VALID_BODY: {
        message: NOT_VALID_BODY,
        code: BAD_REQUEST
    },

    NOT_VALID_ID: {
        message: NOT_VALID_ID,
        code: BAD_REQUEST
    }
};
