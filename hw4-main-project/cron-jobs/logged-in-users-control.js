const dayjs = require('dayjs');
const { Sequelize: { Op } } = require('sequelize');

const { authService } = require('../services');
const {
    appSettingsEnum: { LOGGED_IN_USERS_MSG },
    dateEnum: { DAY },
    folderFileNamesEnum: { LOGGED_IN_USERS_CONTROL }
} = require('../constants');
const winston = require('../logger');

const logger = winston(LOGGED_IN_USERS_CONTROL);

module.exports = async () => {
    const numOfLoggedInUsers = await authService.getNumberOfTokensByDistinctUserId({
        created_at: {
            [Op.gt]: dayjs().subtract(1, DAY).toISOString()
        }
    });

    logger.info(`${numOfLoggedInUsers} ${LOGGED_IN_USERS_MSG}`);
};
