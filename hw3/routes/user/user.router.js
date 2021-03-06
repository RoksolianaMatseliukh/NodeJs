const { Router } = require('express');

const { userController } = require('../../controllers');
const { userMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', userMiddlewares.checkIsUserValid, userMiddlewares.checkIfUserAlreadyExists, userController.createUser);

userRouter.get('/:email', userMiddlewares.checkUserByParams, userController.getUserByEmail);
userRouter.delete('/:email', userMiddlewares.checkUserByParams, userController.deleteUserByEmail);
userRouter.put('/:email', userMiddlewares.checkIsUserValid, userMiddlewares.checkUserByParams,
    userMiddlewares.checkUserForEditing,
    userController.editUserByEmail);

module.exports = userRouter;
