const { Router } = require('express');

const { carController } = require('../../controllers');
const { carMiddlewares } = require('../../middlewares');

const carRouter = Router();

carRouter.get('/', carController.getCars);
carRouter.post('/', carMiddlewares.checkIsCarValidToCreate, carMiddlewares.checkIfCarOwnerExists, carController.createCar);

module.exports = carRouter;
