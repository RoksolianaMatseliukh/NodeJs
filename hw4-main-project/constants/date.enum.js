const dayjs = require('dayjs');

const now = new Date();

module.exports = {
    CURRENT_YEAR: now.getFullYear(),
    FULL_CURRENT_TIME: dayjs().format('dddd, MMMM D, YYYY h:mm A'),
    MIN_MANUFACTURE_CAR_YEAR: now.getFullYear() - 300,

    NOW: 'now',
};
