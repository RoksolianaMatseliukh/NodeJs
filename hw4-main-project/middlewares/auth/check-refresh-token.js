const jwt = require('jsonwebtoken');

const { appConfigs: { REFRESH_TOKEN_SECRET } } = require('../../configs');
const { authService } = require('../../services');
const { ErrorHandler, customErrors: { NO_TOKEN, NOT_VALID_TOKEN } } = require('../../errors');
const { JWTEnum: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const refresh_token = req.get(AUTHORIZATION);

        if (!refresh_token) {
            throw new ErrorHandler(NO_TOKEN.message, NO_TOKEN.code);
        }

        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }
        });

        const userWithToken = await authService.getUserWithTokenByParams({ refresh_token });

        if (!userWithToken) {
            throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
        }

        req.user = userWithToken;
        next();
    } catch (e) {
        next(e);
    }
};
