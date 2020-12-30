const { tableNamesEnum: { CARS }, modelNamesEnum: { CAR } } = require('../../constants');

module.exports = (client, DataTypes) => {
    const Car = client.define(
        CAR,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            model: {
                type: DataTypes.STRING,
                allowNull: false
            },

            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            year: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            user_id: {
                type: DataTypes.INTEGER,
                foreignKey: true,
                allowNull: false
            }
        },
        {
            tableName: CARS,
            timestamps: false
        }
    );

    return Car;
};
