const { dataBaseEnum: { ASSOCIATION }, modelNamesEnum: { USER }, tableNamesEnum: { USERS } } = require('../../constants');

module.exports = (client, DataTypes) => {
    const User = client.define(
        USER,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: USERS,
            timestamps: false
        }
    );

    const OAuth = require('./OAuth')(client, DataTypes);

    User.hasOne(OAuth, ASSOCIATION);

    return User;
};
