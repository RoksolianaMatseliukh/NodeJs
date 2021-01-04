const {
    dataBaseEnum: {
        DATABASE_NAME, LOCALHOST, MYSQL, PASSWORD, USER
    }
} = require('../constants');

module.exports = {
    development: {
        username: USER,
        password: PASSWORD,
        database: DATABASE_NAME,
        host: LOCALHOST,
        dialect: MYSQL
    }
};
