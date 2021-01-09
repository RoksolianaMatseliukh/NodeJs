const { Router } = require('express');

const { userController } = require('../../controllers');
const { authMiddlewares, userMiddlewares } = require('../../middlewares');

const userRouter = Router();

userRouter.get('/',
    userMiddlewares.checkUserByQueries,
    userController.getUsersWithCars);
userRouter.post('/',
    userMiddlewares.checkIsUserValidToCreate,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.createUser);

userRouter.use('/:userId', userMiddlewares.checkIsIdValid);
userRouter.get('/:userId',
    userMiddlewares.checkUserByParams,
    userController.getUserById);
userRouter.put('/:userId',
    authMiddlewares.checkAccessToken,
    userMiddlewares.checkIsUserValidToEdit,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.editUserById);
userRouter.delete('/:userId',
    authMiddlewares.checkAccessToken,
    userController.deleteUserById);

module.exports = userRouter;
