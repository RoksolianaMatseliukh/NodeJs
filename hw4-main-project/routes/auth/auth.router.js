const { Router } = require('express');

const { authController } = require('../../controllers');
const { authMiddlewares, commonMiddlewares } = require('../../middlewares');
const { authValidators: { loginValidator } } = require('../../validators');

const { appConfigs: { REFRESH_TOKEN_SECRET } } = require('../../configs');
const { JWTEnum: { REFRESH_TOKEN } } = require('../../constants');

const userRouter = Router();

userRouter.post('/',
    commonMiddlewares.checkIsEntityValid(loginValidator),
    authMiddlewares.checkUserByEmailToLogin,
    authMiddlewares.checkPasswordHash,
    authController.login);

userRouter.post('/refresh',
    authMiddlewares.checkToken(REFRESH_TOKEN, REFRESH_TOKEN_SECRET),
    authController.createNewTokenPair);
userRouter.post('/logout', authController.logout);

module.exports = userRouter;
