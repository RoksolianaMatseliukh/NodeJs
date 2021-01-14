const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const {
    ErrorHandler, customErrors: {
        NO_TOKEN, NOT_VALID_TOKEN, PERMISSION_DENIED
    }
} = require('../../errors');
const { JWTEnum: { AUTHORIZATION, ACCESS_TOKEN } } = require('../../constants');

module.exports = (token_name, token_secret) => async (req, res, next) => {
    try {
        const { userId } = req.params;

        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(
                NO_TOKEN.message,
                NO_TOKEN.code,
                NO_TOKEN.customCode
            );
        }

        jwt.verify(token, token_secret, (err) => {
            if (err) {
                throw new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    NOT_VALID_TOKEN.code,
                    NOT_VALID_TOKEN.customCode
                );
            }
        });

        const userWithToken = await authService.getUserWithTokenByParams({ [token_name]: token });

        if (!userWithToken) {
            throw new ErrorHandler(
                NOT_VALID_TOKEN.message,
                NOT_VALID_TOKEN.code,
                NOT_VALID_TOKEN.customCode
            );
        }

        if (token_name === ACCESS_TOKEN && +userId !== userWithToken.id) {
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
