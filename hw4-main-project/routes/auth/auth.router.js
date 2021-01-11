const { Router } = require('express');

const { authController } = require('../../controllers');
const { authMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.post('/',
    authMiddlewares.checkIsUserValidToLogin,
    authMiddlewares.checkUserByEmailToLogin,
    authMiddlewares.checkPasswordHash,
    authController.login);

userRouter.post('/refresh',
    authMiddlewares.checkRefreshToken,
    authController.createNewTokenPair);

userRouter.post('/logout', authController.logout);

module.exports = userRouter;
