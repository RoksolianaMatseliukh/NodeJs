const { dataBaseEnum: { ID }, dateEnum: { NOW }, tableNamesEnum: { USERS, O_AUTH } } = require('../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(O_AUTH, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },

            access_token: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },

            refresh_token: {
                type: Sequelize.DataTypes.STRING,
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
            },

            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn(NOW)
            }
        });
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(O_AUTH);
    }
};
