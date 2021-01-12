const { LogModel } = require('../../dataBase/mongo-models');

module.exports = {
    createLog: (log) => new LogModel(log).save()
};
