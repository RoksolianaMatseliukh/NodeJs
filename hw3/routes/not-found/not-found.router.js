const { Router } = require('express');

const notFoundRouter = Router();

notFoundRouter.all('*', (req, res) => res.status(404).json('ROUTE NOT FOUND'));

module.exports = notFoundRouter;
