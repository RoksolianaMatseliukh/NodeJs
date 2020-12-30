const { Router } = require('express');

const carRouter = require('../car');
const userRouter = require('../user');

const apiRouter = Router();

apiRouter.use('/cars', carRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
