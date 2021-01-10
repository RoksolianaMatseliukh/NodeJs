const { dataBaseEnum: { USER_ASSOCIATION }, modelNamesEnum: { USER }, tableNamesEnum: { USERS } } = require('../../constants');

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

            avatar: {
                type: DataTypes.STRING
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

    User.hasOne(OAuth, USER_ASSOCIATION);

    return User;
};
