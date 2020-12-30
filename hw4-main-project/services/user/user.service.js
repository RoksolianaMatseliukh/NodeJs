const { Sequelize: { Op, literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR, USER } } = require('../../constants');

module.exports = {
    getUsersWithCars: () => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findAll({ include: CarModel });
    },

    getFilteredUsersByName: (query) => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findAll({
            attributes: [
                'name',
                'age',
                'email'
            ],
            where: {
                name: {
                    [Op.substring]: query
                }
            },
            include: CarModel,
            order: literal('age DESC')
        });
    },

    getUserById: (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.findByPk(id);
    },

    getUserByEmail: (email) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({ where: { email } });
    },

    createUser: (user) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user);
    },

    deleteUserById: async (id) => {
        const CarModel = db.getModel(CAR);
        const UserModel = db.getModel(USER);

        await CarModel.destroy({
            where: { user_id: id }
        });

        await UserModel.destroy({
            where: { id }
        });
    },

    editUserById: async (id, editedUser) => {
        const UserModel = db.getModel(USER);

        await UserModel.update(
            { ...editedUser },
            { where: { id } }
        );
    }
};
