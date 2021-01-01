const { Router } = require('express');

const { userController } = require('../../controllers');
const { userMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.get('/', userMiddlewares.checkUserByQueries, userController.getUsersWithCars);
userRouter.post('/', userMiddlewares.checkIsUserValidToCreate, userMiddlewares.checkIfUserAlreadyExists,
    userController.createUser);

userRouter.put('/:userId', userMiddlewares.checkIsUserValidToEdit, userMiddlewares.checkUserByParams,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.editUserById);

userRouter.use('/:userId', userMiddlewares.checkUserByParams);
userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.deleteUserById);

module.exports = userRouter;
