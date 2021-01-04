const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const {
    dataBaseEnum: {
        DATABASE_NAME, LOCALHOST, MYSQL, PASSWORD, USER
    }
} = require('../constants');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize(DATABASE_NAME, USER, PASSWORD, {
            host: LOCALHOST,
            dialect: MYSQL
        });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [modelName] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, modelName));
                    models[modelName] = modelFile(client, DataTypes);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
