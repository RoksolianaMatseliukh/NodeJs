const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const { apiRouter, notFoundRouter } = require('./routes');
const { appConfigs: { PORT } } = require('./configs');
const cronRun = require('./cron-jobs');
const db = require('./dataBase').getInstance();
const {
    appSettingsEnum: { DEV },
    folderNamesEnum: { PUBLIC },
    statusCodesEnum: { INTERNAL_SERVER_ERROR }
} = require('./constants');

const app = express();

db.setModels();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), PUBLIC)));

app.use(morgan(DEV));

app.use('/api', apiRouter);
app.use('*', notFoundRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.code || INTERNAL_SERVER_ERROR)
        .json({
            customCode: err.customCode,
            message: err.message
        });
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`app ${PORT} in process`);
        cronRun();
    }
});
