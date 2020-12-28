const { Router } = require('express');

const notFoundRouter = Router();

notFoundRouter.all('*', (req, res) => res.end('ROUTE NOT FOUND'));

module.exports = notFoundRouter;
