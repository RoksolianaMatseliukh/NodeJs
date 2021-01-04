const jwt = require('jsonwebtoken');

const { authService, carService } = require('../../services');
const {
    ErrorHandler, customErrors: {
        ENTITY_NOT_FOUND, NO_TOKEN, NOT_VALID_TOKEN, PERMISSION_DENIED
    }
} = require('../../errors');
const { JWTEnum: { AUTHORIZATION, ACCESS_TOKEN_SECRET } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { userId, carId } = req.params || {};
        const { user_id } = req.body;

        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(NO_TOKEN.message, NO_TOKEN.code);
        }

        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
            }
        });

        const userWithToken = await authService.getUserWithTokenByParams({ access_token });

        if (!userWithToken) {
            throw new ErrorHandler(NOT_VALID_TOKEN.message, NOT_VALID_TOKEN.code);
        }

        if (userId && userWithToken.id !== +userId) {
            throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
        }

        // when add car to user
        if (!userId && !carId && userWithToken.id !== user_id) {
            throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
        }

        // when edit / delete car
        if (carId) {
            const { user_id: carOwnerId } = await carService.getCarById(carId) || {};

            if (!carOwnerId) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.code);
            }

            if (userWithToken.id !== carOwnerId) {
                throw new ErrorHandler(PERMISSION_DENIED.message, PERMISSION_DENIED.code);
            }
        }

        req.user = userWithToken;
        next();
    } catch (e) {
        next(e);
    }
};
