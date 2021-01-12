const { Router } = require('express');

const { carController } = require('../../controllers');
const { carMiddlewares, fileMiddlewares, userMiddlewares } = require('../../middlewares');

const carRouter = Router();

carRouter.get('/',
    carMiddlewares.checkCarByQueries,
    carController.getCars);
carRouter.post('/',
    carMiddlewares.checkIsCarValidToCreate,
    fileMiddlewares.checkCarFiles,
    fileMiddlewares.checkNumberOfCarFiles,
    carController.createCar);

carRouter.put('/:carId',
    userMiddlewares.checkIsIdValid,
    carMiddlewares.checkIsCarValidToEdit,
    fileMiddlewares.checkCarFiles,
    fileMiddlewares.checkNumberOfCarFiles,
    carMiddlewares.checkCarByParams,
    carController.editCarById);

carRouter.use('/:carId',
    userMiddlewares.checkIsIdValid,
    carMiddlewares.checkCarByParams);
carRouter.get('/:carId', carController.getCarById);
carRouter.delete('/:carId', carController.deleteCarById);

module.exports = carRouter;
