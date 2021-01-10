const jwt = require('jsonwebtoken');

const { appConfigs: { ACCESS_TOKEN_SECRET } } = require('../../configs');
const { authService } = require('../../services');
const {
    ErrorHandler, customErrors: {
        NO_TOKEN, NOT_VALID_TOKEN, PERMISSION_DENIED
    }
} = require('../../errors');
const { JWTEnum: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(
                NO_TOKEN.message,
                NO_TOKEN.code,
                NO_TOKEN.customCode
            );
        }

        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    NOT_VALID_TOKEN.code,
                    NOT_VALID_TOKEN.customCode
                );
            }
        });

        const userWithToken = await authService.getUserWithTokenByParams({ access_token });

        if (!userWithToken) {
            throw new ErrorHandler(
                NOT_VALID_TOKEN.message,
                NOT_VALID_TOKEN.code,
                NOT_VALID_TOKEN.customCode
            );
        }

        if (userId && userWithToken.id !== +userId) {
            throw new ErrorHandler(
                PERMISSION_DENIED.message,
                PERMISSION_DENIED.code,
                PERMISSION_DENIED.customCode
            );
        }

        req.user = userWithToken;
        next();
    } catch (e) {
        next(e);
    }
};
