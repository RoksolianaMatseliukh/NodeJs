const { Sequelize: { literal } } = require('sequelize');

const {
    dataBaseEnum: { USER_ID }, modelNamesEnum: { CAR, USER },
    tableAttributesEnum: { AGE, EMAIL, PASSWORD }
} = require('../../constants');
const db = require('../../dataBase').getInstance();

module.exports = {
    getUsers: (queries, offset, limit, ...fieldsToExclude) => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findAll({
            where: queries,
            attributes: { exclude: fieldsToExclude },
            include: {
                model: CarModel,
                attributes: { exclude: USER_ID }
            },
            order: literal(AGE),
            offset,
            limit
        });
    },

    getUserById: (id) => {
        const UserModel = db.getModel(USER);
        const CarModel = db.getModel(CAR);

        return UserModel.findByPk(id, {
            attributes: {
                exclude: [
                    EMAIL,
                    PASSWORD
                ]
            },
            include: CarModel
        });
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
