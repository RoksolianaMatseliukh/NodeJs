const { emailActionsEnum: { ACTIVATE_ACCOUNT, RESTORE_ACCOUNT } } = require('../constants');

module.exports = {
    [ACTIVATE_ACCOUNT]: {
        subject: 'activate your account',
        templateName: 'activate-account'
    },

    [RESTORE_ACCOUNT]: {
        subject: 'restore your account',
        templateName: 'restore-account'
    }
};
