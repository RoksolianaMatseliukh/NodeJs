const cron = require('node-cron');

const { cronScheduleEnum: { EVERY_SEC } } = require('../constants');
const calc = require('./calculate-shop-info');

module.exports = () => {
    cron.schedule(EVERY_SEC, async () => {
        console.log('iteration start');
        await calc();
        console.log('iteration finish');
    });

    // cron.schedule(EVERY_SEC, async () => {
    //     console.log('iteration start');
    //     await calc();
    //     console.log('iteration finish');
    // });
};
