const { Router } = require('express');

const { carController } = require('../../controllers');
const { carMiddlewares, userMiddlewares } = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getCars);
carRouter.post('/', carMiddlewares.checkIsCarValidToCreate, carController.createCar);

carRouter.put('/:carId', userMiddlewares.checkIsIdValid, carMiddlewares.checkIsCarValidToEdit, carMiddlewares.checkCarByParams,
    carController.editCarById);

carRouter.use('/:carId', userMiddlewares.checkIsIdValid, carMiddlewares.checkCarByParams);
carRouter.get('/:carId', carController.getCarById);
carRouter.delete('/:carId', carController.deleteCarById);

module.exports = carRouter;
