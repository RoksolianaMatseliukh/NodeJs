const { Router } = require('express');

const { authController } = require('../../controllers');
const { authMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.post('/', authMiddlewares.checkIsUserValidToLogin, authMiddlewares.checkUserByEmail,
    authMiddlewares.checkPasswordHash, authController.login);

module.exports = userRouter;
