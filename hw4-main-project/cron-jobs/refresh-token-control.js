const jwt = require('jsonwebtoken');

const { appConfigs: { REFRESH_TOKEN_SECRET } } = require('../configs');
const { authService } = require('../services');
const { dateEnum: { FULL_CURRENT_TIME } } = require('../constants');

module.exports = async () => {
    const tokens = await authService.getTokens();

    let deletedTokens = 0;

    tokens.forEach(({ refresh_token }) => {
        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                authService.deleteTokenPair({ refresh_token });
                deletedTokens++;
            }
        });
    });

    console.log(`at ${FULL_CURRENT_TIME} was deleted - ${deletedTokens} token pairs`);
};
