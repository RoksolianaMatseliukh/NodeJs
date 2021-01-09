require('dotenv').config();

const { appConfigs: { DATABASE_USER, DATABASE_PASSWORD } } = require('./index');
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
