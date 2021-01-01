const {
    dataBaseEnum: {
        AUTO_SHOP, LOCALHOST, MYSQL, PASSWORD, USER
    }
} = require('../constants');

module.exports = {
    development: {
        username: USER,
        password: PASSWORD,
        database: AUTO_SHOP,
        host: LOCALHOST,
        dialect: MYSQL
    }
};
