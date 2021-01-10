const { dataBaseEnum: { ID }, dateEnum: { NOW }, tableNamesEnum: { CARS, CARS_FILES } } = require('../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(CARS_FILES, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            file: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            type: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            car_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: CARS,
                    key: ID
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },

            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(CARS_FILES);
    }
};
