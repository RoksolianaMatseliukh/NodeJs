const { Router } = require('express');

const { carController } = require('../../controllers');
const { authMiddlewares, carMiddlewares, userMiddlewares } = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getCars);
                                                            // to check if the user is logged in to add a car
carRouter.post('/', carMiddlewares.checkIsCarOwnerIdValid, authMiddlewares.checkAccessToken,
    carMiddlewares.checkIsCarValidToCreate, carController.createCar);

carRouter.use('/:carId', userMiddlewares.checkIsIdValid);
carRouter.get('/:carId', carMiddlewares.checkCarByParams, carController.getCarById);
carRouter.put('/:carId', authMiddlewares.checkAccessToken, carMiddlewares.checkIsCarValidToEdit,
    carController.editCarById);
carRouter.delete('/:carId', authMiddlewares.checkAccessToken, carController.deleteCarById);

module.exports = carRouter;
