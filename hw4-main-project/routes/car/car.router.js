const { Router } = require('express');

const { carController } = require('../../controllers');
const { carMiddlewares, commonMiddlewares, fileMiddlewares } = require('../../middlewares');
const { carValidators: { editCarValidator, newCarValidator } } = require('../../validators');

const carRouter = Router();

carRouter.get('/',
    carMiddlewares.checkCarByQueries,
    carController.getCars);
carRouter.post('/',
    commonMiddlewares.checkIsEntityValid(newCarValidator),
    fileMiddlewares.checkFileExtensions,
    fileMiddlewares.checkNumberOfCarFiles,
    carController.createCar);

carRouter.put('/:carId',
    commonMiddlewares.checkIsIdValid,
    commonMiddlewares.checkIsEntityValid(editCarValidator),
    fileMiddlewares.checkFileExtensions,
    fileMiddlewares.checkNumberOfCarFiles,
    carMiddlewares.checkCarByParams,
    carController.editCarById);

carRouter.use('/:carId',
    commonMiddlewares.checkIsIdValid,
    carMiddlewares.checkCarByParams);
carRouter.get('/:carId', carController.getCarById);
carRouter.delete('/:carId', carController.deleteCarById);

module.exports = carRouter;
