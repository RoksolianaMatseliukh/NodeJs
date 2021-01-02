const { Router } = require('express');

const authRouter = require('../auth');
const carRouter = require('../car');
const userRouter = require('../user');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/cars', carRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
