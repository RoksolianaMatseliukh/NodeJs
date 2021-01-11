const { Sequelize: { Op, literal } } = require('sequelize');

const db = require('../../dataBase').getInstance();
const {
    modelNamesEnum: {
        CAR, CAR_FILE, USER_WITH_CAR, USER
    },
    tableAttributesEnum: { AGE, EMAIL, PASSWORD }
} = require('../../constants');

module.exports = {
    getUsers: async (queries, offset, limit, ...fieldsToExclude) => {
        const UserModel = db.getModel(USER);
        const UserWithCarModel = db.getModel(USER_WITH_CAR);
        const CarModel = db.getModel(CAR);
        const CarFileModel = db.getModel(CAR_FILE);

        let users = await UserModel.findAll({
            where: queries,
            attributes: { exclude: fieldsToExclude },
            order: literal(AGE),
            offset,
            limit
        });

        users = await Promise.all(users.map(async (user) => {
            const relations = await UserWithCarModel.findAll({
                where: {
                    user_id: user.id
                }
            });

            const car_ids = relations.map((relation) => relation && relation.car_id);

            const cars = await CarModel.findAll({
                where: {
                    id: {
                        [Op.in]: car_ids
                    }
                },
                include: CarFileModel
            });

            return Object.assign(user.dataValues, { cars });
        }));

        return users;
    },

    getUserById: async (id) => {
        const UserModel = db.getModel(USER);
        const UserWithCarModel = db.getModel(USER_WITH_CAR);
        const CarModel = db.getModel(CAR);
        const CarFileModel = db.getModel(CAR_FILE);

        const user = (await UserModel.findByPk(id, {
            attributes: {
                exclude: [
                    EMAIL,
                    PASSWORD
                ]
            }
        })).dataValues;

        const relations = await UserWithCarModel.findAll({
            where: {
                user_id: id
            }
        });

        const car_ids = relations.map((relation) => relation && relation.car_id);

        const cars = await CarModel.findAll({
            where: {
                id: {
                    [Op.in]: car_ids
                }
            },
            include: CarFileModel
        });

        Object.assign(user, { cars });

        return user;
    },

    getRelationUserToCar: (user_id, car_id) => {
        const UserWithCarModel = db.getModel(USER_WITH_CAR);

        return UserWithCarModel.findOne({
            where: {
                [Op.and]: [
                    { user_id },
                    { car_id }
                ]
            }
        });
    },

    createUser: (user, transaction) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user, { transaction });
    },

    addCarToUser: async (car_user_ids) => {
        const UserWithCarModel = db.getModel(USER_WITH_CAR);

        await UserWithCarModel.create(car_user_ids);
    },

    editUserById: async (id, editedUser, transaction) => {
        const UserModel = db.getModel(USER);

        await UserModel.update(editedUser, {
            where: { id },
            transaction
        });
    },

    deleteUserById: async (id, transaction) => {
        const UserModel = db.getModel(USER);

        await UserModel.destroy({
            where: { id },
            transaction
        });
    },

    deleteCarFromUser: async (user_id, car_id) => {
        const UserWithCarModel = db.getModel(USER_WITH_CAR);

        await UserWithCarModel.destroy({
            where: {
                [Op.and]: [
                    { user_id },
                    { car_id }
                ]
            }
        });
    },

    getNumberOfUsers: () => {
        const UserModel = db.getModel(USER);

        return UserModel.count();
    }
};
