const { dataBaseEnum: { USER_ID }, modelNamesEnum: { USER }, tableNamesEnum: { USERS } } = require('../../constants');

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

    const Car = require('./Car')(client, DataTypes);

    User.hasMany(Car, {
        foreignKey: USER_ID,
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });

    return User;
};
