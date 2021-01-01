const { Sequelize: { literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR, USER } } = require('../../constants');

module.exports = {
    getUsers: (queries, offset, limit) => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findAll({
            attributes: [
                'name',
                'age',
                'email'
            ],
            where: queries,
            include: {
                model: CarModel,
                attributes: [
                    'model',
                    'price',
                    'year'
                ]
            },
            order: literal('age DESC'),
            offset,
            limit
        });
    },

    getUserById: (id) => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findByPk(id, { include: CarModel });
    },

    createUser: async (user) => {
        const UserModel = db.getModel(USER);

        await UserModel.create(user);
    },

    deleteUserById: async (id) => {
        const UserModel = db.getModel(USER);

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
    },

    getNumberOfUsers: () => {
        const UserModel = db.getModel(USER);

        return UserModel.count();
    }
};
