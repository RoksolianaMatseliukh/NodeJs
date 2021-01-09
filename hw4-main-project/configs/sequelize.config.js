require('dotenv').config();

const { appConfigs: { DATABASE_PASSWORD, DATABASE_USER } } = require('./index');
const { dataBaseEnum: { DATABASE_NAME, LOCALHOST, MYSQL } } = require('../constants');

module.exports = {
    development: {
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: LOCALHOST,
        dialect: MYSQL
    }
};
