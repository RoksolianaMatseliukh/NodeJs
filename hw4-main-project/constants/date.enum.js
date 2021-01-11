const now = new Date();

module.exports = {
    CURRENT_YEAR: now.getFullYear(),
    FULL_CURRENT_TIME: `${now.getHours()}:${now.getMinutes()}, ${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`,
    MIN_MANUFACTURE_CAR_YEAR: now.getFullYear() - 300,

    NOW: 'now',
};
