const cron = require('node-cron');

const { cronScheduleEnum: { EVERY_DAY_AT_4_AM } } = require('../constants');
const refreshTokenControl = require('./refresh-token-control');

module.exports = () => {
    cron.schedule(EVERY_DAY_AT_4_AM, async () => {
        await refreshTokenControl();
    });
};
