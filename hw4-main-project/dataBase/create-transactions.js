const { client } = require('./index').getInstance();

module.exports = () => client.transaction();
