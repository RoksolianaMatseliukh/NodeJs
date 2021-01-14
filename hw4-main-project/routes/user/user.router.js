const { Router } = require('express');

const { userController } = require('../../controllers');
const {
    authMiddlewares, commonMiddlewares, carMiddlewares, fileMiddlewares, userMiddlewares
} = require('../../middlewares');
const {
    carValidators: { addCarToUserValidator },
    userValidators: { editUserValidator, newUserValidator }
} = require('../../validators');

const { appConfigs: { ACCESS_TOKEN_SECRET } } = require('../../configs');
const { JWTEnum: { ACCESS_TOKEN } } = require('../../constants');

const userRouter = Router();

userRouter.get('/',
    userMiddlewares.checkUserByQueries,
    userController.getUsers);
userRouter.post('/',
    commonMiddlewares.checkIsEntityValid(newUserValidator),
    fileMiddlewares.checkFileExtensions,
    fileMiddlewares.checkNumberOfUserAvatar,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.createUser);

userRouter.get('/:userId',
    commonMiddlewares.checkIsIdValid,
    userMiddlewares.checkUserByParams,
    userController.getUserById);

userRouter.use('/:userId',
    commonMiddlewares.checkIsIdValid,
    authMiddlewares.checkToken(ACCESS_TOKEN, ACCESS_TOKEN_SECRET));
userRouter.put('/:userId',
    commonMiddlewares.checkIsEntityValid(editUserValidator),
    fileMiddlewares.checkFileExtensions,
    fileMiddlewares.checkNumberOfUserAvatar,
    userMiddlewares.checkIfUserAlreadyExists,
    userController.editUserById);
userRouter.delete('/:userId', userController.deleteUserById);

// add car to user
userRouter.post('/:userId',
    commonMiddlewares.checkIsEntityValid(addCarToUserValidator),
    carMiddlewares.checkIfCarExists,
    userMiddlewares.checkIfUserHaveSameCarToAdd,
    userController.addCarToUser);
// delete car from user
userRouter.delete('/:userId/:carId',
    commonMiddlewares.checkIsIdValid,
    authMiddlewares.checkToken(ACCESS_TOKEN, ACCESS_TOKEN_SECRET),
    userMiddlewares.checkIfUserHaveSameCarToDelete,
    userController.deleteCarFromUser);

module.exports = userRouter;
