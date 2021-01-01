const express = require('express');

const { apiRouter, notFoundRouter } = require('./routes');
const db = require('./dataBase').getInstance();

const port = 5000;
const app = express();

db.setModels();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({ message: err.message });
});

app.listen(port, (err) => (!err && console.log(`app ${port} in process`)));
