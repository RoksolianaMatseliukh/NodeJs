const { appConfigs: { PORT } } = require('../configs');

const { FULL_CURRENT_DAY } = require('./date.enum');

module.exports = {
    // app listen msg
    APP_IN_PROCESS: `app ${PORT} in process`,

    // morgan format
    DEV: 'dev',

    // mogoose error
    ERROR: 'error',

    // crone-jobs msg
    LOGGED_IN_USERS_MSG: `logged in users per ${FULL_CURRENT_DAY}`,
    REFRESH_TOKEN_CONTROL_MSG: 'token pairs was deleted',
    REGISTERED_USERS_MSG: `registered users per ${FULL_CURRENT_DAY}`
};
