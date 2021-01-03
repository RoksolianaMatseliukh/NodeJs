const { dataBaseEnum: { NOW }, modelNamesEnum: { OAUTH }, tableNamesEnum: { O_AUTH } } = require('../../constants');

module.exports = (client, DataTypes) => {
    const O_Auth = client.define(
        OAUTH,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },

            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },

            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            },

            created_at: {
                type: DataTypes.DATE,
                defaultValue: client.fn(NOW)
            }
        },
        {
            tableName: O_AUTH,
            timestamps: false
        }
    );

    return O_Auth;
};
