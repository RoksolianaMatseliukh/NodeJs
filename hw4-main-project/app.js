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

app.listen(port, (err) => (!err && console.log(`app ${port} in process`)));
