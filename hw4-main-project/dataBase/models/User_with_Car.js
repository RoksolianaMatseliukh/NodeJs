const { modelNamesEnum: { USER_WITH_CAR }, tableNamesEnum: { USERS_WITH_CARS } } = require('../../constants');

module.exports = (client, DataTypes) => {
    const User_with_Car = client.define(
        USER_WITH_CAR,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            }
        },
        {
            tableName: USERS_WITH_CARS,
            timestamps: false
        }
    );

    return User_with_Car;
};
