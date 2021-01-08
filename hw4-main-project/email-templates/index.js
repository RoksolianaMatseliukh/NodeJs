const { emailActionsEnum: { WELCOME, USER_DELETED } } = require('../constants');

module.exports = {
    [WELCOME]: {
        subject: 'welcome',
        templateName: 'welcome'
    },

    [USER_DELETED]: {
        subject: 'your account is deleted',
        templateName: 'user-deleted'
    }
};
