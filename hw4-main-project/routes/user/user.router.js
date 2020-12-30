const { Router } = require('express');

const { userController } = require('../../controllers');
const { userMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddlewares.checkUserByQuery, userController.getUsersWithCars);
userRouter.post('/', userMiddlewares.checkIsUserValid, userMiddlewares.checkIfUserAlreadyExists, userController.createUser);

userRouter.get('/:id', userMiddlewares.checkUserByParams, userController.getUserById);
userRouter.delete('/:id', userMiddlewares.checkUserByParams, userController.deleteUserById);
userRouter.put('/:id', userMiddlewares.checkIsUserValid, userMiddlewares.checkUserByParams,
    userMiddlewares.checkUserForEditing,
    userController.editUserById);

module.exports = userRouter;
