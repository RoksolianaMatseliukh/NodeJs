const cron = require('node-cron');

const { cronScheduleEnum: { EVERY_DAY_AT_00_00, EVERY_DAY_AT_4_AM } } = require('../constants');
const loggedInUsersControl = require('./logged-in-users-control');
const refreshTokenControl = require('./refresh-token-control');
const registeredUsersControl = require('./registered-users-control');

module.exports = () => {
    cron.schedule(EVERY_DAY_AT_00_00, async () => {
        await registeredUsersControl();
    });

    cron.schedule(EVERY_DAY_AT_00_00, async () => {
        await loggedInUsersControl();
    });

    cron.schedule(EVERY_DAY_AT_4_AM, async () => {
        await refreshTokenControl();
    });
};
