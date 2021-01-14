const dayjs = require('dayjs');
const { Sequelize: { Op } } = require('sequelize');

const { authService } = require('../services');
const {
    appSettingsEnum: { REFRESH_TOKEN_CONTROL_MSG },
    dateEnum: { DAYS }, JWTEnum: { D10_FOR_CRON },
    folderFileNamesEnum: { REFRESH_TOKEN_CONTROL }
} = require('../constants');
const winston = require('../logger');

const logger = winston(REFRESH_TOKEN_CONTROL);

module.exports = async () => {
    const numOfDeletedTokenPairs = await authService.deleteTokenPair({
        created_at: {
            [Op.lte]: dayjs().subtract(D10_FOR_CRON, DAYS).toISOString()
        }
    });

    logger.info(`${numOfDeletedTokenPairs} ${REFRESH_TOKEN_CONTROL_MSG}`);
};
