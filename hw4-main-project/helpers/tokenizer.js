const jwt = require('jsonwebtoken');

const { appConfigs: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } } = require('../configs');
const { JWTEnum: { D10, M10 } } = require('../constants');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: M10 });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: D10 });

    return {
        access_token,
        refresh_token
    };
};
