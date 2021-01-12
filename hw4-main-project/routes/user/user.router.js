const { Router } = require('express');

const { userController } = require('../../controllers');
const {
    authMiddlewares, carMiddlewares, fileMiddlewares, userMiddlewares
} = require('../../middlewares');

const userRouter = Router();

userRouter.get('/',
    userMiddlewares.checkUserByQueries,
    userController.getUsers);
userRouter.post('/',
    userMiddlewares.checkIsUserValidToCreate,
    fileMiddlewares.checkUserFiles,
    fileMiddlewares.checkNumberOfUserAvatar,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.createUser);

userRouter.get('/:userId',
    userMiddlewares.checkIsIdValid,
    userMiddlewares.checkUserByParams,
    userController.getUserById);

userRouter.use('/:userId',
    userMiddlewares.checkIsIdValid,
    authMiddlewares.checkAccessToken);
userRouter.put('/:userId',
    userMiddlewares.checkIsUserValidToEdit,
    fileMiddlewares.checkUserFiles,
    fileMiddlewares.checkNumberOfUserAvatar,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.editUserById);
userRouter.delete('/:userId', userController.deleteUserById);

// add car to user
userRouter.post('/:userId',
    carMiddlewares.checkIsCarValidToBeAddedToUser,
    carMiddlewares.checkIfCarExists,
    userMiddlewares.checkIfUserHaveSameCarToAdd,
    userController.addCarToUser);
// delete car from user
userRouter.delete('/:userId/:carId',
    userMiddlewares.checkIsIdValid,
    authMiddlewares.checkAccessToken,
    userMiddlewares.checkIfUserHaveSameCarToDelete,
    userController.deleteCarFromUser);

module.exports = userRouter;
