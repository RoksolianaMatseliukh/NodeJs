const { dateEnum: { NOW }, modelNamesEnum: { CAR_FILE }, tableNamesEnum: { CARS_FILES } } = require('../../constants');

module.exports = (client, DataTypes) => {
    const Car = client.define(
        CAR_FILE,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            file: {
                type: DataTypes.STRING,
                allowNull: false
            },

            type: {
                type: DataTypes.STRING,
                allowNull: false
            },

            car_id: {
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
            tableName: CARS_FILES,
            timestamps: false
        }
    );

    return Car;
};
