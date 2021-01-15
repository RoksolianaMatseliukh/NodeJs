const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const { apiRouter, notFoundRouter } = require('./routes');
const { appConfigs: { PORT } } = require('./configs');
const {
    appSettingsEnum: { APP_IN_PROCESS, DEV, ERROR },
    dataBaseEnum: { DATABASE_NAME, MONGOOSE_LOCALHOST },
    folderFileNamesEnum: { APP, PUBLIC },
    statusCodesEnum: { INTERNAL_SERVER_ERROR }
} = require('./constants');
const cronRun = require('./cron-jobs');
const db = require('./dataBase').getInstance();
const { sentry } = require('./errors');
const winston = require('./logger');

const app = express();
const logger = winston(APP);

db.setModels();
_mongoConnection();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), PUBLIC)));
app.use(sentry.Handlers.requestHandler());

app.use(morgan(DEV));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);

app.use(sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    logger.error(err);
    sentry.captureException(err);

    res
        .status(err.code || INTERNAL_SERVER_ERROR)
        .json({
            customCode: err.customCode,
            message: err.message
        });
});

app.listen(PORT, () => {
    console.log(APP_IN_PROCESS);
    cronRun();
});

function _mongoConnection() {
    mongoose.connect(`${MONGOOSE_LOCALHOST}${DATABASE_NAME}`, { useNewUrlParser: true });
    const connect = mongoose.connection;

    connect.on(ERROR, (error) => {
        console.log(error);
    });
}
