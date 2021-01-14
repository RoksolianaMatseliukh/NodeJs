const { dateEnum: { NOW }, dataBaseEnum: { ID }, tableNamesEnum: { CARS, USERS, USERS_WITH_CARS } } = require('../../constants');

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

            avatar: {
                type: Sequelize.DataTypes.STRING
            },

            email: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            registered_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
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
            }
        });

        await queryInterface.createTable(USERS_WITH_CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
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
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(USERS);
        await queryInterface.dropTable(CARS);
        await queryInterface.dropTable(USERS_WITH_CARS);
    }
};
