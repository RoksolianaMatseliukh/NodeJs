const dayjs = require('dayjs');

const now = new Date();

module.exports = {
    CURRENT_YEAR: now.getFullYear(),
    CURRENT_YEAR_MONTH: dayjs().format('YYYY-MM'),
    FULL_CURRENT_DAY: dayjs().format('YYYY-MM-DD'),
    FULL_CURRENT_DAY_FORMAT: 'DD-MM-YYYY',
    LOGS_DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss',
    MIN_MANUFACTURE_CAR_YEAR: now.getFullYear() - 300,

    DAY: 'day',
    DAYS: 'days',
    NOW: 'now'
};
