const { CURRENT_YEAR_MONTH, FULL_CURRENT_DAY } = require('./date.enum');

module.exports = {
    APP: 'app',
    AVATAR: 'avatar',
    CARS: 'cars',
    DAY_TXT: `${FULL_CURRENT_DAY}.txt`,
    DOCS: 'docs',
    EMAIL_TEMPLATES: 'email-templates',
    ERRORS: 'errors',
    IMAGES: 'images',
    INFORMATION: 'information',
    LOGGED_IN_USERS_CONTROL: 'cron-job: logged-in-users-control',
    LOGS: 'logs',
    MONTH_TXT: `${CURRENT_YEAR_MONTH}.txt`,
    PUBLIC: 'public',
    REFRESH_TOKEN_CONTROL: 'cron-job: refresh-token-control',
    REGISTERED_USERS_CONTROL: 'cron-job: registered-users-control',
    USERS: 'users'
};
