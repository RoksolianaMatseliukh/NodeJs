const jwt = require('jsonwebtoken');

const {
    JWTEnum: {
        ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, D10, M10
    }
} = require('../constants');

module.exports = () => {
    const access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: M10 });
    const refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: D10 });

    return {
        access_token,
        refresh_token
    };
};
