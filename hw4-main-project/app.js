const express = require('express');
require('dotenv').config();

const { apiRouter, notFoundRouter } = require('./routes');
const db = require('./dataBase').getInstance();
const { statusCodesEnum: { INTERNAL_SERVER_ERROR } } = require('./constants');

const app = express();

db.setModels();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code || INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
});

app.listen(process.env.PORT, (err) => (!err && console.log(`app ${process.env.PORT} in process`)));
