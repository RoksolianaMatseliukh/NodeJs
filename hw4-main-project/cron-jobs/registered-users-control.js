const dayjs = require('dayjs');
const { Sequelize: { Op } } = require('sequelize');

const {
    appSettingsEnum: { REGISTERED_USERS_MSG },
    dateEnum: { DAY },
    folderFileNamesEnum: { REGISTERED_USERS_CONTROL }
} = require('../constants');
const { userService } = require('../services');
const winston = require('../logger');

const logger = winston(REGISTERED_USERS_CONTROL);

module.exports = async () => {
    const numOfRegisteredUsers = await userService.getNumberOfUsers({
        registered_at: {
            [Op.gt]: dayjs().subtract(1, DAY).toISOString()
        }
    });

    logger.info(`${numOfRegisteredUsers} ${REGISTERED_USERS_MSG}`);
};
