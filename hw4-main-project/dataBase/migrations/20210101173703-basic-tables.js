const { dataBaseEnum: { ID }, tableNamesEnum: { CARS, USERS } } = require('../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(USERS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },

            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            }
        });

        await queryInterface.createTable(CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            model: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            price: {
                type: Sequelize.DataTypes.DECIMAL,
                allowNull: false
            },

            year: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false
            },

            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: USERS,
                    key: ID
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(USERS);
        await queryInterface.dropTable(CARS);
    }
};
