const { Sequelize: { Op } } = require('sequelize');

const { authService } = require('../services');
const { dateEnum: { FULL_CURRENT_TIME }, JWTEnum: { D10_IN_MS } } = require('../constants');

module.exports = async () => {
    const numOfDeletedTokenPairs = await authService.deleteTokenPair({
        created_at: {
            [Op.lte]: new Date(new Date() - D10_IN_MS)
        }
    });

    console.log(`on ${FULL_CURRENT_TIME} was deleted - ${numOfDeletedTokenPairs} token pairs`);
};
